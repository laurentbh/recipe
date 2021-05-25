package api

import (
	"reflect"

	"github.com/laurentbh/whiterabbit"
)

// Entity generic struct for all models
type Entity struct {
	ID         int64             `json:"id"`
	Name       string            `json:"name"`
	Type       string            `json:"type"`
	Attributes map[string]string `json:"attributes,omitempty"`
}

func ModelToEntity(model interface{}) Entity {

	var ret Entity
	val := reflect.ValueOf(model)

	ret.Type = val.Type().Name()

	for i := 0; i < val.NumField(); i++ {
		field := val.Type().Field(i)
		if field.Name == "Name" {
			ret.Name, _ = (val.Field(i).Interface()).(string)
		} else if field.Name == "Model" {
			m, _ := (val.Field(i).Interface()).(whiterabbit.Model)
			ret.ID = m.ID
			// deep copy of attributes
			if len(m.Labels) > 0 {
				a := make(map[string]string)
				for k, v := range m.Labels {
					a[k] = v
				}
				ret.Attributes = a
			}
		}
	}
	return ret
}
