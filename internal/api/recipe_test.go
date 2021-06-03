package api

import (
	"github.com/stretchr/testify/assert"
	"testing"
)
func TestRecipe(t *testing.T) {
	recipe := Recipe {
		"title": "chocolate cake",
		"instructions" : []interface{}{"prepare", "cook"},
		"ingredients" : "chocolate",
	}
	assert.Nil(t, recipe.Validate())
}

func TestValidateMissingField(t *testing.T) {
	recipe := Recipe{
		"notitle": "dummy",
	}
	assert.NotNilf(t, recipe.validateField("title"), "missing title field")
}
func TestValidateEmptyString(t *testing.T) {
	recipe := Recipe{
		"title": " ",
	}
	assert.NotNilf(t, recipe.validateField("title"), "empty title field")
}

func TestValidateString(t *testing.T) {
	recipe := Recipe{
		"title" : "A recipe",
	}
	assert.Nil(t, recipe.validateField("title"))
}
func TestValidateEmptyArray(t *testing.T) {
	recipe := Recipe{
		"title" : []interface{}{},
	}
	assert.NotNil(t, recipe.validateField("title"))
}
func TestValidateArray1(t *testing.T) {
	recipe := Recipe{
		"title" : []interface{}{"  "},
	}
	assert.NotNil(t, recipe.validateField("title"))
}
func TestValidateArray2(t *testing.T) {
	recipe := Recipe{
		"title" : []interface{}{"ok",""},
	}
	assert.NotNil(t, recipe.validateField("title"))
}
func TestValidateArray(t *testing.T) {
	recipe := Recipe{
		"title" : []interface{}{"A recipe"},
	}
	assert.Nil(t, recipe.validateField("title"))
}
