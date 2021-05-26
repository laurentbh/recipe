package server

import (
	"github.com/gin-gonic/gin"
	"github.com/laurentbh/recipe/internal/api"
	"strconv"
)

const category = "category"

//AllCategories ...
func (s *Server) AllCategories(context *gin.Context) {

	all, err := s.Database.CategoryAll()
	if err != nil {
		context.JSON(500, gin.H{"message": err.Error()})
		return
	}
	entities := make([]api.Entity, len(all))
	for i, v := range all {
		entities[i] = api.ModelToEntity(v)
	}
	context.JSON(200, entities)
	return
}

func (s *Server) NewCategory(context *gin.Context) {
	var e api.Entity

	err := context.BindJSON(&e)
	if err != nil {
		context.JSON(400, gin.H{"message": err.Error()})
		return
	}
	newCategory, err := s.Database.CategoryCreate(e.Name, e.Attributes)
	if err != nil {
		context.JSON(500, gin.H{"message": err.Error()})
		return
	}
	s.PushNewEntity("category", newCategory)
	return
}

func (s *Server) DeleteCategory(context *gin.Context) {
	id, _ := strconv.ParseInt(context.Param("id"), 10, 64)

	err := s.Database.DeleteByID(id)
	if err != nil {
		context.JSON(500, gin.H{"message": err.Error()})
		return
	}
	s.PushDelete("category", id)
}

