package grpc

import (
	"fmt"
	"github.com/laurentbh/recipe/config"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"github.com/laurentbh/recipe/internal/grpc/parsing"
	handler "github.com/laurentbh/recipe/internal/grpc/service"
	"github.com/rs/zerolog/log"
	"google.golang.org/grpc"
	"net"
)
type RecipeGrpc struct {
	repo repositories.Repository
	server  *grpc.Server
	listener net.Listener
}

func New(config config.AppConfig) (RecipeGrpc, error) {
	// start gRPC server
	repo, err := config.GetRepository()
	if err != nil {
		log.Panic().Err(err).Msg("while gRPC instantiation")
	}
	ps := handler.ParsingService{}
	ps.Database = repo

	port := fmt.Sprintf(":%d",  config.Grpc.GetPort())
	lis, err := net.Listen("tcp", port)
	if err != nil {
		return RecipeGrpc{}, err
	}
	log.Printf("gRPC server listening on %v\n", port)

	server := grpc.NewServer()
	parsing.RegisterParserServer(server, &ps)

	ret := RecipeGrpc{
		repo: repo,
		server: server,
		listener: lis,
	}
	return ret, nil

}

func (s RecipeGrpc) Start() {
	go s.server.Serve(s.listener)
	//if err != nil {
	//	log.Panic().Err(err).Msg("Error starting server")
	//}

}
