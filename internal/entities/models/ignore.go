package models

import (
	"github.com/laurentbh/whiterabbit"
)

// Ignore ...
type Ignore struct {
	whiterabbit.Model
	Name string
}

func (i Ignore) Id() int64 {
	return i.ID
}

// EntityName ...
func (i Ignore) EntityName() string {
	return i.Name
}

// Domain ...
func (i Ignore) Domain() string {
	return "Ignore"
}
