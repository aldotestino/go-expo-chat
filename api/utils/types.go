package utils

import (
	"api/stores"
	"time"
)

type ChatPreviewWithUser struct {
	ID          int             `json:"id"`
	LastMessage *stores.Message `json:"lastMessage"`
	User        *stores.User    `json:"user"`
}

type ChatWithUser struct {
	ID       int                    `json:"id"`
	User     *stores.User           `json:"user"`
	Messages []*MessageWithShowTime `json:"messages"`
}

type MessageWithShowTime struct {
	Id        int       `json:"id"`
	UserId    string    `json:"userId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	ShowTime  bool      `json:"showTime"`
}
