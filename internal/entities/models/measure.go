package models

import "github.com/laurentbh/whiterabbit"

type Measure struct {
	whiterabbit.Model
	Name   string
	Abbrev []string
	Oz     float64
	Ml     float64
}
// Id
func (m Measure) Id() int64 {
	return m.ID
}

// EntityName ...
func (m Measure) EntityName() string {
	return m.Name
}

// Domain ...
func (m Measure) Domain() string {
	return "Measure"
}
