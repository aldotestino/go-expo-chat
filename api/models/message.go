package models

import "gorm.io/gorm"

type Message struct {
	gorm.Model
	UserId  string `json:"userId"`
	Content string `json:"content"`
	ChatId  uint   `json:"chatId"`
}
