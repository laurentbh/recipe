package http

import (
	"github.com/gin-gonic/gin"
	"github.com/rs/zerolog/log"
)

// Live connects to Sse server
func (s *Server) Live(ctx *gin.Context) {
	s.Sse.Subscribe(ctx.Writer, ctx.Request)
}

type msg struct {
	Action string `json:"action"`
	Data   data   `json:"data"`
}
type data struct {
	Domain  string      `json:"domain"`
	Payload interface{} `json:"payload"`
}

// PushNewEntity ...
func (s *Server) PushNewEntity(entity string, payload interface{}) error {
	m := msg{
		Action: "new",
		Data:   data{Domain: entity, Payload: payload},
	}
	log.Info().Msgf(">>> PushNewEntity  %v", m)
	s.Sse.Publish(m)
	return nil
}

// PushDelete ...
func (s *Server) PushDelete(entity string, id int64) error {
	type del struct {
		ID int64 `json:"id"`
	}
	m := msg{
		Action: "delete",
		Data:   data{Domain: entity, Payload: del{ID:id,}},
	}
	log.Info().Msgf(">>> PushDelete [%s] %v", entity, m)
	s.Sse.Publish(m)
	return nil
}
