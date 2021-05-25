package server

import (
	"github.com/gin-gonic/gin"
	"github.com/laurentbh/recipe/internal/api"
)

const measure = "measure"


// AllMeasuress
func (s *Server) AllMeasures(ctx *gin.Context) {
	dbRet, err := s.Database.MeasureAll()
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
