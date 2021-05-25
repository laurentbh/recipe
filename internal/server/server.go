package server

import (
	"github.com/gin-gonic/gin"
	"github.com/laurentbh/recipe/internal/entities/repositories"
)

//import "net/http"

// Server holds everything need for REST server
type Server struct {
	Database repositories.Repository
	Router     *gin.Engine
}