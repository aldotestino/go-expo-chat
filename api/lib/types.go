package lib

import (
	"api/models"
	"time"
)

type User struct {
	ID        string `json:"id"`
	Username  string `json:"username"`
	ImageUrl  string `json:"imageUrl"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
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
	UserID    string    `json:"userId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	ShowTime  bool      `json:"showTime"`
}

type ChatPreview struct {
	ID          uint            `json:"id"`
	User1ID     string          `json:"user1Id"`
	User2ID     string          `json:"user2Id"`
	LastMessage *models.Message `json:"lastMessage"`
}
