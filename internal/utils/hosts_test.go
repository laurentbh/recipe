package utils

import (
	"github.com/stretchr/testify/assert"
	"os"
	"testing"
)

func TestHostSub(t *testing.T) {
	orig := os.Getenv("ES_NET")
	os.Setenv("ES_NET", "elastic")
	t.Cleanup(func() { os.Setenv("ES_NET", orig) })


	assert.Equal(t, "http://elastic:8080", SubHostname("http://localhost:8080", "ES_NET") )
	assert.Equal(t, "https://elastic:8080", SubHostname("https://localhost:8080", "ES_NET") )
	assert.Equal(t, "elastic:8080", SubHostname("localhost:8080", "ES_NET") )
	assert.Equal(t, "elastic", SubHostname("localhost", "ES_NET") )
	assert.Equal(t, "http://elastic", SubHostname("http://localhost", "ES_NET") )
}
