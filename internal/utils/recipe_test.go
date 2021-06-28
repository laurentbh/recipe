package utils

import (
	"github.com/stretchr/testify/assert"
	"sort"
	"testing"
)

func TestRecipeSort(t *testing.T) {
	recipes := []map[string]interface{}{
		{"title": "a long title"},
		{"title": "A long Title"},
		{"title": "A Title"},
	}

	sort.Sort(ByTitle(recipes))

	assert.Equal(t, "A Title", recipes[0]["title"] )
}
func TestRecipeSort2(t *testing.T) {
	recipes := []map[string]interface{}{
		{"title": "third line after sort"},
		{"title": "second"},
		{"title": "first"},
	}

	sort.Sort(ByTitle(recipes))

	assert.Equal(t, "first", recipes[0]["title"] )
	assert.Equal(t, "second", recipes[1]["title"] )
	assert.Equal(t, "third line after sort", recipes[2]["title"] )
}

func TestRecipeSortIgnoreCase(t *testing.T) {
	recipes := []map[string]interface{}{
		{"title": "a long title"},
		{"title": "A long Title"},
	}

	sort.Sort(ByTitle(recipes))

	assert.Equal(t, "a long title", recipes[0]["title"] )
	assert.Equal(t, "A long Title", recipes[1]["title"] )
}
func TestRecipeSortLastCharacter(t *testing.T) {
	recipes := []map[string]interface{}{
		{"title": "012"},
		{"title": "011"},
	}

	sort.Sort(ByTitle(recipes))

	assert.Equal(t, "011", recipes[0]["title"])
	assert.Equal(t, "012", recipes[1]["title"])

}
