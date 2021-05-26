package handler

import (
	"context"
	"github.com/laurentbh/recipe/internal/service/parsing"
	"log"
	"net"
	"testing"

	"google.golang.org/grpc"
	"google.golang.org/grpc/test/bufconn"
)

func dialer() func(context.Context, string) (net.Conn, error) {
	listener := bufconn.Listen(1024 * 1024)

	server := grpc.NewServer()

	// RegisterService(server)

	go func() {
		if err := server.Serve(listener); err != nil {
			log.Fatal(err)
		}
	}()

	return func(context.Context, string) (net.Conn, error) {
		return listener.Dial()
	}
}

func TestService(t *testing.T) {
	ctx := context.Background()

	conn, err := grpc.DialContext(ctx, "", grpc.WithInsecure(), grpc.WithContextDialer(dialer()))
	if err != nil {
		log.Fatal(err)
	}
	defer conn.Close()

	client := parsing.NewParserClient(conn)

	request := parsing.ParsingRequest{Input: "one, two"}
	response, _ := client.Parse(ctx, &request)

	var expecting = []*parsing.ParsingResult{
		{Word: "one", Position: 0},
		{Word: "two", Position: 5},
	}

	// TODO: check why can't compare structs
	for i, exp := range expecting {
		if exp.Word != response.GetResults()[i].GetWord() || exp.Position != response.GetResults()[i].GetPosition() {
			t.Errorf("error : expected {%v,%d}, got {%v,%d}", exp.Word, exp.Position, response.GetResults()[i].GetWord(), response.GetResults()[i].GetPosition())
		}
	}
}
