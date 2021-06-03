package api

import (
	"fmt"
	"reflect"
	"strings"
)

type Reference struct {
	Name string `json:"name"`
	Link string `json:"link"`
}

// Recipe usual fields are
//	Id          string      `json:"id,omitempty"`
//	Title       string      `json:"title,omitempty"`
//	Ingredients []string    `json:"ingredients,omitempty"`
//	Instructions []string      `json:"instruction,omitempty"`
//	TotalTime   string      `json:"total_time,omitempty"`
//	PrepTime    string      `json:"prep_time,omitempty"`
//	CookTime    string		`json:"cook_time,omitempty"`
//	Yield       string      `json:"yield,omitempty"`
//	Tips        []string    `json:"tips,omitempty"`
//	References  []Reference `json:"references,omitempty"`
//	Rating     string		`json:"rating,omitempty"`
type Recipe map[string]interface {}

// Validate validate main fields are here and valid
func (r *Recipe) Validate() error {
	fields := []string{"title", "ingredients", "instructions"}
	for _, f := range fields {
		err := r.validateField(f)
		if err != nil {
			return err
		}
	}
	return nil

}

// validateField make sure the field is a non empty string or non
// empty array
func (r *Recipe) validateField( field string) error {
	if value, ok := (*r)[field]; ok {
		varType := reflect.TypeOf(value)

		if varType.Kind() == reflect.String {
			casted := value.(string)
			if len(strings.TrimSpace(casted)) == 0 {
				return fmt.Errorf("empty %s field", field)
			}
			return nil
		} else if varType.Kind() == reflect.Slice {
			subValues := value.([]interface{})
			if len(subValues) == 0 {
				return fmt.Errorf("empty %s array field", field)
			}
			for i := 0; i < len(subValues); i++ {
				if len(strings.TrimSpace(subValues[i].(string))) == 0 {
					return fmt.Errorf("%s array eith empty field", field)
				}
			}
			return nil
		} else {
			// shouldn't ever reach here thru UI
			return fmt.Errorf("can't handle type %s for %s", varType.Kind().String(), field)
		}
	}
	return fmt.Errorf("%s is missing", field)
}

