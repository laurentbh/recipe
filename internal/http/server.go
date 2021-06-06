package http

import (
	"github.com/gin-gonic/gin"
	"github.com/laurentbh/recipe/config"
	logging "github.com/laurentbh/recipe/internal"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"github.com/laurentbh/recipe/internal/storage"
	"github.com/laurentbh/sse"
	"net/http"
	"time"
)

// Server holds everything need for REST server
type Server struct {
	Database repositories.Repository
	Router     *gin.Engine
	httpClient *http.Client
	Sse        *sse.Server
	Elastic    *storage.Elastic
	config     config.AppConfig
}

func New(config *config.AppConfig, logger *logging.Logger) (*Server, error) {
	// instantiate HTTP client
	t := http.DefaultTransport.(*http.Transport).Clone()
	t.MaxIdleConnsPerHost = 100
	t.MaxIdleConns = 100
	t.IdleConnTimeout = 10 * time.Second
	myClient := &http.Client{Transport: t}
	myClient.Timeout = 5 * time.Second

	// connect to storages
	repository, err := config.GetRepository()
	if err != nil {
		return nil, err
	}

	logger.Info().Msg("Connecting to elastic : "  + config.Elastic.Host)
	es, err := storage.ConnectElastic(config.Elastic, logger)
	if err != nil {
		return nil, err
	}
	logger.Warn().Msg("Connected to elastic : "  + config.Elastic.Host)

	// Start SSE server
	sseServer := sse.NewServer()

	return &Server{
		httpClient: createHttpClient(),
		Database:   repository,
		Sse:        sseServer,
		Elastic: 	es,
		config: 	*config,
	}, nil
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