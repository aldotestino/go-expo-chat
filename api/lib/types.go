package lib

import (
	"api/models"
	"time"
)

type ChatType string

const (
	PersonalChatType ChatType = "personal"
	GroupChatType    ChatType = "group"
)

type User struct {
	ID        string `json:"id"`
	Username  string `json:"username"`
	ImageUrl  string `json:"imageUrl"`
	Email     string `json:"email"`
	FirstName string `json:"firstName"`
	LastName  string `json:"lastName"`
}

type MessageWithShowTime struct {
	ID        uint      `json:"id"`
	UserID    string    `json:"userId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
	ShowTime  bool      `json:"showTime"`
}

type Chat struct {
	ID           uint                   `json:"id"`
	Type         string                 `json:"type"`
	GroupName    *string                `json:"groupName"`
	User         *User                  `json:"user"`
	Participants map[string]*User       `json:"participants"`
	Messages     []*MessageWithShowTime `json:"messages"`
}

type RawChatPreview struct {
	ID          uint            `json:"id"`
	Type        string          `json:"type"`
	GroupName   *string         `json:"groupName"`
	User1ID     *string         `json:"user1Id"`
	User2ID     *string         `json:"user2Id"`
	LastMessage *models.Message `json:"lastMessage"`
}

type ChatPreview struct {
	ID          uint            `json:"id"`
	Type        string          `json:"type"`
	GroupName   *string         `json:"groupName"`
	User        *User           `json:"user"`
	LastMessage *models.Message `json:"lastMessage"`
}
