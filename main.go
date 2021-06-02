package main

import (
	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/logger"
	"github.com/gin-gonic/gin"
	"github.com/laurentbh/recipe/config"
	"github.com/laurentbh/recipe/internal"
	recipegrpc "github.com/laurentbh/recipe/internal/grpc"
	"github.com/laurentbh/recipe/internal/http"
	"github.com/rs/zerolog/log"
	"strconv"
)

func main() {
	// UNIX Time is faster and smaller than most timestamps
	//zerolog.TimeFieldFormat = zerolog.TimeFormatUnix
	//mainLogger.Logger = mainLogger.Output(zerolog.ConsoleWriter{Out: os.Stderr})

	cfg, err := config.LoadConfig("config.yaml")
	if err != nil {
		log.Panic().
			Err(err).
			Msg("config error")
	}
	mainLogger := internal.ConfigureLogger(cfg.Logging)

	mainLogger.Info().Msg("starting")

	// start gRPC server
	grpcS, err := recipegrpc.New(*cfg, mainLogger)
	if err != nil {
		log.Panic().Err(err).Msg("while gRPC instantiation")
	}
	grpcS.Start()

	// start REST server
	ginLogCfg := logger.Config{
		Logger:         mainLogger.Logger,
		UTC:            false,
		SkipPath:       nil,
		SkipPathRegexp: nil,
	}
	router := gin.Default()
	router.Use(logger.SetLogger(ginLogCfg))
	//p.Use(router)
	router.Use(cors.Default())
	s, err := http.New(cfg, mainLogger)
	if err != nil {
		//log.Panic().Err(err).Msg("Can't start")
		mainLogger.Fatal().Err(err).Msg("Can't start")
	}
	//s.Elastic = es
	//s.Sse = sseServer
	s.Router = router
	s.InitRoutes()
	var restPort = ":" + strconv.Itoa(cfg.Server.Port)
	router.Run(restPort)
}
