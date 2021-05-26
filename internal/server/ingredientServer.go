package server

import (
	"github.com/laurentbh/recipe/internal/api"
	"github.com/laurentbh/recipe/internal/entities/models"
	"net/http"
	"strconv"


	"github.com/gin-gonic/gin"
)

const ingredient = "ingredient"

// DeleteIngredient ...
func (s *Server) DeleteIngredient(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)

	err := s.Database.DeleteByID(id)
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	//s.PushDelete(ingredient, id)

}

// NewIngredient ...
func (s *Server) NewIngredient(ctx *gin.Context) {
	var e api.Entity

	err := ctx.BindJSON(&e)
	if err != nil {
		ctx.JSON(400, gin.H{"message": err.Error()})
		return
	}
	newIngredient, err := s.Database.IngredientCreate(e.Name, e.Attributes)
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	s.PushNewEntity(ingredient, newIngredient)
	return
}

func (s *Server) GetIngredient(ctx *gin.Context) {
	id, err := strconv.ParseInt(ctx.Param("id"), 10, 64)
	if err != nil {
		ctx.JSON(400, gin.H{"message": err.Error()})
		return
	}
	ret, err := s.Database.IngredientById(id)
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	if ret == nil {
		ctx.Status(http.StatusNotFound)
		return
	}
	ctx.JSON(200, ret)
	return
}

// GetIngredientRelations ...
func (s *Server) GetIngredientRelations(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)
	ret, err := s.Database.IngredientByIdRelations(id, []interface{}{models.Category{}, models.Ingredient{}})
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	ctx.JSON(200, ret)
	return
}

// AllIngredients return all known ingredients
func (s *Server) AllIngredients(ctx *gin.Context) {
	dbRet, err := s.Database.IngredientAll()
	if err != nil {
		ctx.JSON(500, gin.H{
			"message": err,
		})
		return
	}
	entities := make([]api.Entity, len(dbRet))
	for i, v := range dbRet {
		entities[i] = api.ModelToEntity(v)
	}
	ctx.JSON(200, entities)
	return
}
