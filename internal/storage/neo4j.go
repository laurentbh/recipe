package storage

import (
	"strconv"

	"github.com/laurentbh/recipe/config"
	"github.com/neo4j/neo4j-go-driver/v4/neo4j"
)

// ConnectNeo opens a connection to the database
func ConnectNeo(cfg config.AppConfig) (neo4j.Driver, error) {
	var (
		driver neo4j.Driver
		err    error
	)

	uri := "bolt://" + cfg.Neo4j.Host + ":" + strconv.Itoa(cfg.Neo4j.Port)

	driver, err = neo4j.NewDriver(uri, neo4j.BasicAuth(cfg.Neo4j.User, cfg.Neo4j.Password, ""))
	// , func(c *neo4j.Config) {
	// 		c.Encrypted = cfg.Neo4j.Encrypted
	// 	})
	if err != nil {
		return nil, err
	}

	return driver, nil
}
