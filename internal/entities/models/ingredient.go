package models

import "github.com/laurentbh/whiterabbit"

// Ingredient ...
type Ingredient struct {
	whiterabbit.Model
	Name string `json:"name"`
}

func (i Ingredient) Id() int64 {
	return i.ID
}
// EntityName ...
func (i Ingredient) EntityName() string {
	return i.Name
}

// Domain ...
func (i Ingredient) Domain() string {
	return "Ingredient"
}
