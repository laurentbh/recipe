package server

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/laurentbh/recipe/config"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"github.com/laurentbh/recipe/internal/entities/repositories/neo4j"
	"github.com/laurentbh/sse"
	"github.com/laurentbh/whiterabbit"
	"net/http"
	"time"
)

//import "net/http"

// Server holds everything need for REST server
type Server struct {
	Database repositories.Repository
	Router     *gin.Engine
	httpClient *http.Client
	Sse        *sse.Server
}

func New(config *config.AppConfig) (*Server, error) {
	// instantiate HTTP client
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConnsPerHost = 100
	t.MaxIdleConns = 100
	t.IdleConnTimeout = 10 * time.Second
	myClient := &http.Client{Transport: t}
	myClient.Timeout = 5 * time.Second

	storage, err := connectStorage(config)
	if err != nil {
		return nil, err
	}

	// Start SSE server
	sseServer := sse.NewServer()

	return &Server{
		httpClient: createHttpClient(),
		Database:   storage,
		Sse: sseServer,
	}, nil
}
func connectStorage(config *config.AppConfig) (repositories.Repository, error) {
	if config.Storage == "neo4j" {

		db, err := whiterabbit.Open(config.Neo4j)
		if err != nil {
			// TODO : test if the connection is really made
			//mainLogger.Panic().Str("error", err.Error()).Msg("error")
		}
		defer func() {
			db.Close()
		}()

		return neo4j.New(*db), nil
	}
	return nil, fmt.Errorf("storage %s not implemeted", config.Storage)
}
func createHttpClient() *http.Client {
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConnsPerHost = 100
	t.MaxIdleConns = 100
	t.IdleConnTimeout = 10 * time.Second
	myClient := &http.Client{Transport: t}
	myClient.Timeout = 5 * time.Second
	return  myClient
}