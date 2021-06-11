package models

import "github.com/laurentbh/whiterabbit"

type Measure struct {
	whiterabbit.Model
	Name   string `json:"name"`
	Abbrev []string `json:"abbrev"`
	Oz     float64 `json:"oz"`
	Ml     float64 `json:"ml"`
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
