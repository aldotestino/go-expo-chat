package models

import "time"

type Message struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time `json:"createdAt"`
	UserID    string    `json:"userId"`
	Content   string    `json:"content"`
	ChatID    uint      `json:"chatId"`
	GroupID   uint      `json:"groupId"`
}
