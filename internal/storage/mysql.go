package storage

import (
	"database/sql"
	"time"

	_ "github.com/go-sql-driver/mysql"
)

// ConnectDB opens a connection to the database
func ConnectDB() *sql.DB {
	db, err := sql.Open("mysql", "root:root@tcp(cube:3306)/recipe")
	if err != nil {
		panic(err.Error())
	}
	db.SetConnMaxLifetime(time.Minute * 3)
	db.SetMaxOpenConns(10)
	db.SetMaxIdleConns(10)
	return db
}
