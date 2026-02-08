package main

import "time"

type Todo struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	Title     string `json:"title"`
	Completed bool   `json:"completed"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
