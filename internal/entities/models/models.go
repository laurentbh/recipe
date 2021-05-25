package models

// DBEntity ...
type DBEntity interface {
	// Id id in Database
	Id() int64
	// EntityName name in database
	EntityName() string
	// Domain domain of the entity
	Domain() string
}

// Bypass for digits ...
const Bypass string = "ByPass"

var All = map[string]interface{}{
	"Ingredient": Ingredient{},
	"Category":   Category{},
	"Ustensil":   Ustensil{},
	"Ignore":     Ignore{},
}

func GetNodeTypeAndID(val interface{}) (string, int64) {

	i, ok := val.(Ingredient)
	if ok {
		return "Ingredient", i.ID
	}
	c, ok := val.(Category)
	if ok {
		return "Category", c.ID
	}
	u, ok := val.(Ustensil)
	if ok {
		return "Ustensil", u.ID
	}
	ig, ok := val.(Ignore)
	if ok {
		return "Ignore", ig.ID
	}
	return "", 0
}
