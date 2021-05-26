package storage

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"github.com/elastic/go-elasticsearch/v7"
	"github.com/laurentbh/recipe/config"
	logging "github.com/laurentbh/recipe/internal"
	"github.com/laurentbh/recipe/internal/api"
	"log"
	"net/http"
	"strings"
)

type Elastic struct {
	client *elasticsearch.Client
	conf   config.ElasticConf
}

func ConnectElastic(conf config.ElasticConf, logger *logging.Logger) (*Elastic, error) {
	cfg := elasticsearch.Config{
		Addresses: []string{conf.Host},
	}
	if len(conf.User) != 0 || len(conf.Password) != 0 {
		cfg.Username = conf.User
		cfg.Password = conf.Password
	}
	client, err := elasticsearch.NewClient(cfg)
	if err != nil {
		logger.Warn().Err(err)
		return nil, err
	}
	return &Elastic{
		client: client,
		conf:   conf,
	}, nil
}

type updatePayload struct {
	Doc api.Recipe `json:"doc"`
}

func (es *Elastic) UpdateRecipe(ctx context.Context, recipe api.Recipe, id string) error {

	payload := updatePayload{Doc: recipe}
	byteData, err := json.Marshal(payload)
	if err != nil {
		return err
	}
	reader := bytes.NewReader(byteData)
	res, err := es.client.Update(es.conf.Index, id, reader)
	if err != nil {
		return err
	}
	defer res.Body.Close()
	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		return fmt.Errorf("error parsing the response body: %s", err)
	} else {
		if res.IsError() {
			return fmt.Errorf("error updating: %v", res.Status())
		}
		// Print the response status and indexed document version.
		log.Printf("[%s] %s; version=%d", res.Status(), r["result"], int(r["_version"].(float64)))
	}

	return nil
}

// AddRecipe in elasticsearch
// return id of new document
func (es *Elastic) AddRecipe(ctx context.Context, recipe api.Recipe) (string, error) {
	payload, err := json.Marshal(recipe)
	if err != nil {
		return "", err
	}
	//req := esapi.IndexRequest{
	//	Index:      es.conf.Index,
	//	DocumentID: "1",
	//	Body:       strings.NewReader(string(payload)),
	//	Refresh:    "true",
	//}
	//res, err := req.Do(ctx, es.client)
	res, err := es.client.Index(es.conf.Index, strings.NewReader(string(payload)))
	if err != nil {
		return "", fmt.Errorf("IndexRequest ERROR: %s", err)
	}
	if res.IsError() {
		return "", fmt.Errorf("%s", res.String())
	}

	//body := make([]byte, 0, 5000)
	//_, err = res.Body.Read(body)
	//if err != nil {
	//	return err
	//}
	//rs := map[string]interface{}{}
	//
	//err = json.Unmarshal(body, &rs)
	//if err != nil {
	//	return err
	//}
	//fmt.Printf("%v", res)

	defer res.Body.Close()
	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Printf("Error parsing the response body: %s", err)
	} else {
		// Print the response status and indexed document version.
		log.Printf("[%s] %s; version=%d", res.Status(), r["result"], int(r["_version"].(float64)))
	}
	id, ok := r["_id"].(string)
	if !ok {
		return "", fmt.Errorf("can't convert to string %v", r["_id"])
	}
	return id, nil
}
func buildMatchBody(value []string, withSource bool) interface{} {
	query := map[string]interface{}{
		"query":   map[string]interface{}{},
		"fields":  []string{"title"},
		"_source": withSource,
	}
	q := (query["query"]).(map[string]interface{})

	if len(value) == 1 {
		subQuery := map[string]interface{}{
			"ingredient": value[0]}
		q["match"] = subQuery
	} else {
		subQuery := map[string][]string{
			"ingredient": value}
		q["terms"] = subQuery
	}
	return query
}

func buildAndSearchQuery(values []string) interface{} {
	must := make([]interface{}, 0, len(values))
	for _, v := range values {
		must = append(must, map[string]interface{}{
			"term": map[string]interface{}{
				"ingredients": map[string]string{
					"value": v,
				},
			},
		})
	}
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"bool": map[string]interface{}{
				"must": must,
			},
		},
	}
	return query
}
func (es *Elastic) DeleteRecipe(id string) error {
	res, err := es.client.Delete(es.conf.Index, id,
		es.client.Delete.WithContext(context.Background()))
	if err != nil {
		return err
	}
	defer res.Body.Close()
	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			return fmt.Errorf("error parsing the response body: %s", err)
		} else {
			return nil
		}
	}
	return nil
}

func (es *Elastic) GetRecipeById(id string) (map[string]interface{}, error) {
	res, err := es.client.Get(es.conf.Index, id,
		es.client.Get.WithContext(context.Background()))

	if err != nil {
		return nil, err
	}
	defer res.Body.Close()
	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			return nil, fmt.Errorf("error parsing the response body: %s", err)
		} else {
			if res.StatusCode == http.StatusNotFound {
				return nil, nil

			}
			// Print the response status and error information.
			return nil, fmt.Errorf(
				"[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}
	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}
	var recipe = map[string]interface{}{}
	if r["found"] == false {
		return nil, nil
	}
	bytes, err := json.Marshal(r["_source"])
	if err != nil {
		return nil, err
	}
	err = json.Unmarshal(bytes, &recipe)
	if err != nil {
		return nil, err
	}
	return recipe, nil
}

func (es *Elastic) RecipeAll() ([]map[string]interface{}, error) {
	query := map[string]interface{}{
		"query": map[string]interface{}{
			"match_all": map[string]interface{}{},
		},
	}
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		return nil, err
	}
	// Perform the search request.
	res, err := es.client.Search(
		es.client.Search.WithContext(context.Background()),
		es.client.Search.WithIndex(es.conf.Index),
		es.client.Search.WithBody(&buf),
		es.client.Search.WithTrackTotalHits(true),
		//es.client.Search.WithPretty(),
	)
	if err != nil {
		return nil, err
		//log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()
	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}
	// Print the response status, number of results, and request duration.
	log.Printf(
		"[%s] %d hits; took: %dms",
		res.Status(),
		int(r["hits"].(map[string]interface{})["total"].(map[string]interface{})["value"].(float64)),
		int(r["took"].(float64)),
	)
	// Print the ID and document source for each hit.
	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		log.Printf(" * ID=%s, %s", hit.(map[string]interface{})["_id"], hit.(map[string]interface{})["title"])
	}
	recipes := make([]map[string]interface{}, 0)
	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		bytes, err := json.Marshal(hit.(map[string]interface{})["_source"])
		if err != nil {
			return nil, err
		}
		var m map[string]interface{}
		err = json.Unmarshal(bytes, &m)
		if err != nil {
			return nil, err
		}
		m["id"] = hit.(map[string]interface{})["_id"].(string)
		recipes = append(recipes, m)
	}
	//fmt.Printf("%v", res.Status())

	return recipes, nil

}

// RecipeWithIngredient return the title
func (es *Elastic) RecipeWithIngredient(value []string) ([]map[string]interface{}, error) {
	//query := buildMatchBody(value, true)
	query := buildAndSearchQuery(value)
	var buf bytes.Buffer
	if err := json.NewEncoder(&buf).Encode(query); err != nil {
		return nil, err
	}

	// Perform the search request.
	res, err := es.client.Search(
		es.client.Search.WithContext(context.Background()),
		es.client.Search.WithIndex(es.conf.Index),
		es.client.Search.WithBody(&buf),
		es.client.Search.WithTrackTotalHits(true),
		//es.client.Search.WithPretty(),
	)
	if err != nil {
		return nil, err
		//log.Fatalf("Error getting response: %s", err)
	}
	defer res.Body.Close()
	if res.IsError() {
		var e map[string]interface{}
		if err := json.NewDecoder(res.Body).Decode(&e); err != nil {
			log.Fatalf("Error parsing the response body: %s", err)
		} else {
			// Print the response status and error information.
			log.Fatalf("[%s] %s: %s",
				res.Status(),
				e["error"].(map[string]interface{})["type"],
				e["error"].(map[string]interface{})["reason"],
			)
		}
	}

	var r map[string]interface{}
	if err := json.NewDecoder(res.Body).Decode(&r); err != nil {
		log.Fatalf("Error parsing the response body: %s", err)
	}
	// Print the response status, number of results, and request duration.
	log.Printf(
		"[%s] %d hits; took: %dms",
		res.Status(),
		int(r["hits"].(map[string]interface{})["total"].(map[string]interface{})["value"].(float64)),
		int(r["took"].(float64)),
	)
	// Print the ID and document source for each hit.
	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		log.Printf(" * ID=%s, %s", hit.(map[string]interface{})["_id"], hit.(map[string]interface{})["title"])
	}
	recipes := make([]map[string]interface{}, 0)
	for _, hit := range r["hits"].(map[string]interface{})["hits"].([]interface{}) {
		bytes, err := json.Marshal(hit.(map[string]interface{})["_source"])
		if err != nil {
			return nil, err
		}
		var m map[string]interface{}
		err = json.Unmarshal(bytes, &m)
		if err != nil {
			return nil, err
		}
		m["id"] = hit.(map[string]interface{})["_id"].(string)
		recipes = append(recipes, m)
	}
	//fmt.Printf("%v", res.Status())

	return recipes, nil
}
