package config

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestNoConfig(t *testing.T) {
	_, err := LoadConfig(".")
	assert.NotNil(t, err)
}
func TestLoadConfig1(t *testing.T) {

	cfg, err := LoadConfig("./config_test1.yaml")

	assert.Nil(t, err)
	s, _ := cfg.GetStorageConfig()
	_, ok := s.(MysqlConfig)
	assert.Equal(t, true, ok)
	assert.Equal(t, "mysql", cfg.Storage)
	assert.Equal(t, "testHost", cfg.Mysql.Host)
	assert.Equal(t, 3306, cfg.Mysql.Port)
	assert.Equal(t, 4, cfg.Logging.MaxSize)
}
func TestLoadConfig2(t *testing.T) {

	cfg, err := LoadConfig("./config_test2.yaml")

	assert.Nil(t, err)
	s, _ := cfg.GetStorageConfig()
	_, ok := s.(Neo4j)
	assert.Equal(t, true, ok)
	assert.Equal(t, "neo4j", cfg.Storage)
	assert.Equal(t, "localhost", cfg.Neo4j.Host)
	assert.Equal(t, 7687, cfg.Neo4j.Port)
	assert.Equal(t, "neo4j", cfg.Neo4j.User)
	assert.Equal(t, "root", cfg.Neo4j.Password)
}
