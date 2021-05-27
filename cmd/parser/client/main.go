package main

import (
	"context"
	"github.com/laurentbh/recipe/internal/grpc/parsing"
	"google.golang.org/grpc"
	"io"
	"log"
)

func main() {

	var conn *grpc.ClientConn
	// TODO: get port from cmd line or config
	conn, err := grpc.Dial(":50052", grpc.WithInsecure())
	if err != nil {
		log.Fatalf("did not connect: %s", err)
	}
	defer conn.Close()

	c := parsing.NewParserClient(conn)

	// response, err := c.Parse(context.Background(),
	// 	&parsing.ParsingRequest{Input: "Hello From Client!"})
	// if err != nil {
	// 	log.Fatalf("Error when calling SayHello: %s", err)
	// }
	// log.Printf("Response from server: %s", response)

	str := `Hello From Client!
	 What do u
	want for dinner? Pasta, pizza, or salad. Maybe    some wine
	can have a red or a white
	I link to sing in the shower!!! Shower is wet
	`
	waitc := make(chan struct{})
	stream, err := c.StreamParse(context.Background(),
		&parsing.ParsingRequest{Input: str})
	if err != nil {
		log.Fatalf("error while calling StreamParse: %s", err)
	}
	go func() {
		for {
			info, err := stream.Recv()
			if err == io.EOF {
				close(waitc)
				return
			}
			if err != nil {
				log.Fatalf("error in Recv %s", err)
			}
			log.Printf("got %s", info)
		}

	}()

	<-waitc
}
