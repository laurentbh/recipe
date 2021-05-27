package api

import (
	"fmt"
	"testing"

	"github.com/laurentbh/whiterabbit"
)

func TestModelToEntity(t *testing.T) {

	type test struct {
		Name string
		whiterabbit.Model
	}

	m := test{Name: "test_name"}
	m.Model.ID = 12
	m.Model.Labels = map[string]string{"att1": "value1", "att2": "value2"}

	fmt.Printf("%v", m)
	e := ModelToEntity(m)
	if e.ID != 12 {
		t.Error("ID not set")
	}
}
