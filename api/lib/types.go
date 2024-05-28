package lib

import (
	"api/models"
	"time"
)

type User struct {
	ID       string `json:"id"`
	Username string `json:"username"`
	ImageUrl string `json:"imageUrl"`
}

type ChatPreviewWithUser struct {
	ID          uint            `json:"id"`
	LastMessage *models.Message `json:"lastMessage"`
	User        *User           `json:"user"`
}

type ChatWithUser struct {
	ID       uint                   `json:"id"`
	User     *User                  `json:"user"`
	Messages []*MessageWithShowTime `json:"messages"`
}

type MessageWithShowTime struct {
	ID        uint      `json:"id"`
	UserId    string    `json:"userId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	ShowTime  bool      `json:"showTime"`
}

type ChatPreview struct {
	ID          uint            `json:"id"`
	User1Id     string          `json:"user1Id"`
	User2Id     string          `json:"user2Id"`
	LastMessage *models.Message `json:"lastMessage"`
}
