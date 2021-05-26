package server

import (
	"github.com/laurentbh/recipe/internal/api"
	"github.com/stretchr/testify/assert"
	"testing"
)

func TestValidateRecipe(t *testing.T) {
	recipe := api.Recipe{}

	//assert.NotNil(t, validateRecipe(recipe))
	assert.Errorf(t, validateRecipe(recipe), "recipe title is empty")

	recipe.Title = "dummy title"
	assert.Errorf(t, validateRecipe(recipe), "recipe instruction is empty")

	recipe.Instruction = "dummy instruction"
	assert.Errorf(t, validateRecipe(recipe), "recipe requires at least one ingredient")

	recipe.Ingredients = []string{" ", "\t"}
	assert.Errorf(t, validateRecipe(recipe), "recipe requires at least one ingredient")

	recipe.Ingredients = []string{" ", "\t", "salt"}
	assert.Nil(t, validateRecipe(recipe))
}
