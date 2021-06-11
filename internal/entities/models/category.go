package models

import "github.com/laurentbh/whiterabbit"

// Category ...
type Category struct {
	whiterabbit.Model
	Name string `json:"name"`
}

func (c Category) Id() int64 {
	return c.ID
}

// EntityName ...
func (c Category) EntityName() string {
	return c.Name
}

// Domain ...
func (c Category) Domain() string {
	return "Category"
}
