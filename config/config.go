package config

import (
	"fmt"
	"github.com/laurentbh/recipe/internal/entities/repositories"
	"github.com/laurentbh/recipe/internal/entities/repositories/neo4j"
	"github.com/laurentbh/whiterabbit"
	"path/filepath"
	"strings"

	"github.com/spf13/viper"
)

// AppConfig top config structure
type AppConfig struct {
	Storage string
	Mysql   MysqlConfig
	Neo4j   Neo4j
	Server  ServerConfig
	Logging LoggingConfig
	Elastic ElasticConf
}

type LoggingConfig struct {
	ConsoleEnabled bool
	FileEnabled    bool
	JsonEnabled    bool
	Directory      string
	Filename       string
	MaxSize        int
}

type MysqlConfig struct {
	Host     string
	User     string
	Password string
	Database string
	Port     int
}

type Neo4j struct {
	Host      string
	User      string
	Password  string
	Port      int
	Encrypted bool
}

func (n Neo4j) GetHost() string {
	return n.Host
}

func (n Neo4j) GetPort() int {
	return n.Port
}

func (n Neo4j) GetUser() string {
	return n.User
}

func (n Neo4j) GetPassword() string {
	return n.Password
}

func (n Neo4j) GetEncrypted() bool {
	return n.Encrypted
}

type ElasticConf struct {
	Host       string
	User       string
	Password   string
	Index      string
	RecipeType string
}

type ServerConfig struct {
	Port int
}

func (c AppConfig) GetStorageConfig() (interface{}, error) {
	switch c.Storage {
	case "neo4j":
		return c.Neo4j, nil
	case "mysql":
		return c.Mysql, nil
	default:
		return nil, fmt.Errorf("%s storage is not inplemented", c.Storage)
	}
}
// LoadConfig ...
func LoadConfig(filename string) (*AppConfig, error) {

	viper.AddConfigPath(filepath.Dir(filename))

	name := strings.TrimSuffix(filename, filepath.Ext(filename))
	viper.SetConfigName(filepath.Base(name))

	if err := viper.ReadInConfig(); err != nil {
		return nil, err
	}

	var cfg AppConfig
	setMySQLDefault()
	setNeo4jDefault()
	setElasticDefault()

	if err := viper.Unmarshal(&cfg); err != nil {
		return nil, err
	}
	return &cfg, nil
}

func setMySQLDefault() {
	viper.SetDefault("mysql.port", "3306")
}

func setNeo4jDefault() {
	viper.SetDefault("neo4j.port", "7687")
	viper.SetDefault("neo4j.encrypted", "false")
}

func setElasticDefault() {
	viper.SetDefault("elastic.host", "http://localhost:9200")
}

func (c AppConfig) GetHost() string {
	return c.Neo4j.Host
}

func (c AppConfig) GetPort() int {
	return c.Neo4j.Port
}
func (c AppConfig) GetUser() string {
	return c.Neo4j.User
}
func (c AppConfig) GetPassword() string {
	return c.Neo4j.Password
}
func (c AppConfig) GetEncrypted() bool {
	return c.Neo4j.Encrypted
}
// GetRepository get instance of repository
func (c AppConfig) GetRepository() (repositories.Repository, error) {
	if c.Storage == "neo4j" {
		db, err := whiterabbit.Open(c.Neo4j)
		if err != nil {
			return nil, err
		}
		// TODO: test the connection
		//defer func() {
		//	db.Close()
		//}()

		return neo4j.New(*db), nil
	}
	return nil, fmt.Errorf("storage %s not implemeted", c.Storage)
}
