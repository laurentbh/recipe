package handler

import (
	"context"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"github.com/laurentbh/recipe/internal/service/parsing"
	"strings"

	"github.com/rs/zerolog/log"
)

type ParsingService struct {
	Database repositories.Repository
	parsing.UnimplementedParserServer
}

func (s *ParsingService) StreamParse(in *parsing.ParsingRequest, stream parsing.Parser_StreamParseServer) error {
	log.Info().Msg("streaming starts ...")
	infoCha := make(chan parsing.Info, 10)
	analyzeCha := make(chan parsing.Analyzed, 10)

	reader := strings.NewReader(in.GetInput())

	go parsing.AnalyzeWords(s.Database, infoCha, analyzeCha)
	go parsing.FindWords(reader, infoCha)

	for {
		a, ok := <-analyzeCha
		if ok {
			if err := stream.Send(
				&parsing.ParsingResult{
					Word:       a.Info.Word,
					Position:   (int32)(a.Info.Pos),
					Index:      (int32)(a.Info.Index),
					Identified: a.Identified,
					Entity:     a.Entity,
					Id:         a.ID}); err != nil {
				return err
			}
		} else {
			break
		}
	}
	log.Info().Msg("streaming ends.")
	return nil
}

func (s *ParsingService) Parse(ctx context.Context, in *parsing.ParsingRequest) (*parsing.ParsingResponse, error) {
	infoCha := make(chan parsing.Info, 10)
	analyzeCha := make(chan parsing.Analyzed, 10)

	log.Info().Msgf("Parse: %s", in.GetInput())
	reader := strings.NewReader(in.GetInput())

	go parsing.AnalyzeWords(s.Database, infoCha, analyzeCha)
	go parsing.FindWords(reader, infoCha)

	var results []*parsing.ParsingResult

	for {
		a, ok := <-analyzeCha
		if ok {
			results = append(results,
				&parsing.ParsingResult{
					Word:       a.Info.Word,
					Position:   (int32)(a.Info.Pos),
					Index:      (int32)(a.Info.Index),
					Identified: a.Identified,
					Entity:     a.Entity,
					Id:         a.ID});
		} else {
			break
		}
	}

	ret := &parsing.ParsingResponse{Results: results}
	return ret, nil
}
