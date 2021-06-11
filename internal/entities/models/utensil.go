package models

import "github.com/laurentbh/whiterabbit"

// Utensil ...
type Utensil struct {
	whiterabbit.Model
	Name string `json:"name"`
}

func (u Utensil) Id() int64 {
	return u.ID
}
// EntityName ...
func (u Utensil) EntityName() string {
	return u.Name
}

// Domain ...
func (u Utensil) Domain() string {
	return "Utensil"
}
