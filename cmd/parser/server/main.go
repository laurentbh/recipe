package main

import (
	"fmt"
	"github.com/laurentbh/recipe/config"
	"github.com/laurentbh/recipe/internal/grpc/parsing"
	handler "github.com/laurentbh/recipe/internal/grpc/service"
	"google.golang.org/grpc"
	"log"
	"net"
)

func main() {

	// TODO: pass config as arguments
	log.Println("reading config")
	cfg, err := config.LoadConfig("config.yaml")
	if err != nil {
		log.Panicf("problem reading config: %v", err)
	}

	repo, err := cfg.GetRepository()
	if err != nil {
		log.Panicf("error connecting to storage: %v", err)
	}
	defer func() {
		repo.Disconnect()
	}()

	ps := handler.ParsingService{}
	ps.Database = repo

	port := fmt.Sprintf(":%d",  cfg.Grpc.GetPort())
	lis, err := net.Listen("tcp", port)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}
	log.Printf("server listening on %v\n", port)

	server := grpc.NewServer()

	parsing.RegisterParserServer(server, &ps)

	err = server.Serve(lis)
	if err != nil {
		log.Fatalf("Error starting server: %v", err)
	}
}
