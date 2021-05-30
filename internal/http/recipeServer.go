package http

import (
	"context"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	"github.com/laurentbh/recipe/internal/api"
	"net/http"
	"path/filepath"
	"strings"
)

func (s *Server) UploadImages(ctx *gin.Context) {
	// Multipart form
	// single file will use file, err := ctx.FormFile("file")
	form, err := ctx.MultipartForm()
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{ "message": "No file is received" })
		return
	}
	files := form.File["upload[]"]

	for _, file := range files {
		// Retrieve file information
		extension := filepath.Ext(file.Filename)
		// Generate random file name for the new uploaded file so it doesn't override the old file with same name
		newFileName := uuid.New().String() + extension

		// The file is received, so let's save it
		if err := ctx.SaveUploadedFile(file, s.config.Images.Location + newFileName); err != nil {
			ctx.JSON(http.StatusInternalServerError, gin.H{ "message": "Unable to save the file" })
			return
		}
	}
	ctx.JSON(http.StatusOK, gin.H{ "message": "Your file has been successfully uploaded."})
}
func (s *Server) DeleteRecipe(ctx *gin.Context) {
	id := ctx.Param("id")
	err := s.Elastic.DeleteRecipe(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	ctx.Status(http.StatusNoContent)
}
func (s *Server) RecipeById(ctx *gin.Context) {
	id := ctx.Param("id")

	recipe, err := s.Elastic.GetRecipeById(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	if recipe == nil {
		ctx.Status(http.StatusNotFound)
		return
	}
	ctx.JSON(http.StatusOK, recipe)
	return
}
func (s *Server) SearchRecipe(ctx *gin.Context) {
	var recipes []map[string]interface{}
	var err error
	if ctx.Query("ingredient") != "" {
		ing := ctx.QueryArray("ingredient")
		if len(ing) == 0 {
			ctx.JSON(http.StatusBadRequest, gin.H{"message": "missing ingredient param"})
			return
		}
		recipes, err = s.Elastic.RecipeWithIngredient(ing)
	} else {
		recipes, err = s.Elastic.RecipeAll()
	}
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	if len(recipes) == 0 {
		ctx.Status(http.StatusNoContent)
		return
	}
	ctx.JSON(http.StatusOK, recipes)
	return
}
func (s *Server) UpdateRecipe(ctx *gin.Context) {
	id := ctx.Param("id")
	var recipe api.Recipe

	err := ctx.BindJSON(&recipe)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err = validateRecipe(recipe)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	err = s.Elastic.UpdateRecipe(context.TODO(), recipe, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"message": err.Error()})
		return
	}
	ctx.Status(http.StatusOK)
	return
}

// NewRecipe ...
func (s *Server) NewRecipe(ctx *gin.Context) {
	var recipe api.Recipe

	err := ctx.BindJSON(&recipe)
	if err != nil {
		ctx.JSON(400, gin.H{"message": err.Error()})
		return
	}
	err = validateRecipe(recipe)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"message": err.Error()})
		return
	}
	//log.Info().Msgf("NewRecipe with [%v]", recette)
	id, err := s.Elastic.AddRecipe(context.TODO(), recipe)
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"id": id})

	return
}

func validateRecipe(recipe api.Recipe) error {
	if len(strings.TrimSpace(recipe.Title)) == 0 {
		return fmt.Errorf("recipe title is empty")
	}
	if len(strings.TrimSpace(recipe.Instruction)) == 0 {
		return fmt.Errorf("recipe instruction is empty")
	}
	if len(recipe.Ingredients) == 0 {
		return fmt.Errorf("recipe requires at least one ingredient")
	}
	var validIngredient = 0
	for _, i := range recipe.Ingredients {
		if len(strings.TrimSpace(i)) != 0 {
			validIngredient++
		}
	}
	if validIngredient == 0 {
		return fmt.Errorf("recipe requires at least one ingredient")
	}
	return nil
}
