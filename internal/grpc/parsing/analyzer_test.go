package parsing

import (
	"github.com/laurentbh/recipe/config"
	"github.com/laurentbh/recipe/internal/entities/models"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"github.com/laurentbh/recipe/internal/entities/repositories/neo4j"
	"log"
	"strings"
	"testing"

	"github.com/laurentbh/whiterabbit"
)

var testTable = []struct {
	name     string
	input    []Info
	expected []Analyzed
}{
	{
		"basic test",
		[]Info{
			Info{Word: "the", Pos: 0, Index: 0},
			Info{Word: "Chicken", Pos: 4, Index: 1},
		},
		[]Analyzed{
			{Identified: true,
				Entity: "Ignore",
				Info:   Info{Word: "the", Pos: 0, Index: 0}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "Chicken", Pos: 4, Index: 1}},
		},
	},
	{
		"merge word test",
		[]Info{
			Info{Word: "the", Pos: 0, Index: 0},
			Info{Word: "green", Pos: 4, Index: 1},
			Info{Word: "Bean", Pos: 9, Index: 2},
			Info{Word: "Chicken", Pos: 13, Index: 3},
		},
		[]Analyzed{
			{Identified: true,
				Entity: "Ignore",
				Info:   Info{Word: "the", Pos: 0, Index: 0}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "green Bean", Pos: 4, Index: 1}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "Chicken", Pos: 13, Index: 3}},
		},
	},
	{
		"test3",
		[]Info{
			Info{Word: "nocolor", Pos: 0, Index: 0},
			Info{Word: "Bean", Pos: 6, Index: 1},
		},
		[]Analyzed{
			{Identified: false,
				Entity: "",
				Info:   Info{Word: "nocolor", Pos: 0, Index: 0}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "Bean", Pos: 6, Index: 1}},
		},
	},
	{
		"test4",
		[]Info{
			Info{Word: "unknown", Pos: 0, Index: 0},
			Info{Word: "Bean", Pos: 6, Index: 1},
			Info{Word: "unknown", Pos: 10, Index: 2},
		},
		[]Analyzed{
			{Identified: false,
				Entity: "",
				Info:   Info{Word: "unknown", Pos: 0, Index: 0}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "Bean", Pos: 6, Index: 1}},
			{Identified: false,
				Entity: "",
				Info:   Info{Word: "unknown", Pos: 10, Index: 2}},
		},
	},
	{
		"plurals test",
		[]Info{
			Info{Word: "2", Pos: 0, Index: 0},
			Info{Word: "Chickens", Pos: 1, Index: 1},
			Info{Word: "green beans", Pos: 0, Index: 2},
			Info{Word: "#$", Pos: 0, Index: 3},
		},
		[]Analyzed{
			{Identified: true,
				Entity: models.Bypass,
				Info:   Info{Word: "2", Pos: 0, Index: 0}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "Chicken", Pos: 1, Index: 1}},
			{Identified: true,
				Entity: "Ingredient",
				Info:   Info{Word: "green bean", Pos: 0, Index: 2}},
			{Identified: true,
				Entity: models.Bypass,
				Info:   Info{Word: "#$", Pos: 0, Index: 3}},
		},
	},
}

func Test(t *testing.T) {
	log.Println("reading config")
	cfgPtr, err := config.LoadConfig("../../config/config.yaml")
	if err != nil {
		log.Panicf("problem reading config: %v", err)
	}
	cfg := *cfgPtr
	db, err := whiterabbit.Open(cfg)
	if err != nil {
		log.Panicf("error connecting to neo4j: %v", err)
	}
	defer func() {
		db.Close()
	}()

	repo := neo4j.New(*db)

	for _, test := range testTable {
		expected := findExpectedID(repo, test.expected)

		var in = make(chan Info, 10)
		var out = make(chan Analyzed, 10)

		go AnalyzeWords(repo, in, out)
		go pushInput(in, test.input)

		for i := 0; i < len(expected); i++ {
			a := <-out
			if a != expected[i] {
				t.Errorf("[%s #%d] => got %v, expecting %v", test.name, i, a, expected[i])
			}
		}
	}
}
func pushInput(in chan<- Info, data []Info) {
	for _, i := range data {
		in <- i
	}
	close(in)
}

func findExpectedID(repo repositories.Repository, expected []Analyzed) []Analyzed {
	ret := make([]Analyzed, len(expected))
	var id int64
	for i, a := range expected {
		id = 0
		if strings.Compare(a.Entity, "Ingredient") == 0 {
			node, _ := repo.IngredientByName(a.Info.Word)
			id = node.Id()
		} else if strings.Compare(a.Entity, "Ignore") == 0 {
			node, _ := repo.IgnoreByName(a.Info.Word)
			id = node.Id()
		}
		ret[i] = expected[i]
		ret[i].ID = id
	}
	return ret
}
