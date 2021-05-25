package server

import (
	"github.com/laurentbh/recipe/internal/api"
	"strconv"

	"github.com/gin-gonic/gin"
)

//const utensil = "utensil"

// DeleteUtensil ...
func (s *Server) DeleteUtensil(ctx *gin.Context) {
	id, _ := strconv.ParseInt(ctx.Param("id"), 10, 64)

	err := s.Database.DeleteByID(id)
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	// TODO
	//s.PushDelete(utensil, id)

}

// NewUtensil ...
func (s *Server) NewUtensil(ctx *gin.Context) {
	var e api.Entity

	err := ctx.BindJSON(&e)
	if err != nil {
		ctx.JSON(400, gin.H{"message": err.Error()})
		return
	}
	_, err = s.Database.UtensilCreate(e.Name, e.Attributes)
	if err != nil {
		ctx.JSON(500, gin.H{"message": err.Error()})
		return
	}
	// TODO
	//s.PushNewEntity(utensil, newIngr)
	return
}

// AllUtensils return all known utensils
func (s *Server) AllUtensils(ctx *gin.Context) {
	dbRet, err := s.Database.UtensilAll()
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
