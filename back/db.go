package main

import (
	"github.com/glebarez/sqlite"
	"gorm.io/gorm"
)

var db *gorm.DB

func initDB() {
	var err error

	// gormでSQLiteに接続
	db, err = gorm.Open(sqlite.Open("todo.db"), &gorm.Config{})

	if err != nil {
		panic("failed to connect database: " + err.Error())
	}

	// テーブルがなければ自動で作成
	db.AutoMigrate(&Todo{})
}
