package stores

import (
	"errors"
	"time"
)

type Message struct {
	Id        int       `json:"id"`
	UserId    string    `json:"userId"`
	ChatId    string    `json:"chatId"`
	Content   string    `json:"content"`
	CreatedAt time.Time `json:"createdAt"`
}

var currentMessageId = 0

func NewMessage(userId, content string) *Message {
	currentMessageId++
	return &Message{
		Id:        currentMessageId,
		UserId:    userId,
		Content:   content,
		CreatedAt: time.Now(),
	}
}

type Chat struct {
	Id       int        `json:"id"`
	User1Id  string     `json:"user1Id"`
	User2Id  string     `json:"user2Id"`
	Messages []*Message `json:"messages"`
}

var currentChatId = 0

func NewChat(user1Id, user2Id string) *Chat {
	currentChatId++
	return &Chat{
		Id:       currentChatId,
		User1Id:  user1Id,
		User2Id:  user2Id,
		Messages: make([]*Message, 0),
	}
}

type ChatStore interface {
	CreateChat(user1Id, user2Id string) (*Chat, error)
	GetChats(userId string) ([]*Chat, error)
	GetChatById(userId, chatId string) (*Chat, error)
	SendMessage(userId, chatId, content string) (*Message, error)
}

type InMemoryChatStore struct {
	chats []*Chat
}

func NewInMemoryChatStore() *InMemoryChatStore {
	return &InMemoryChatStore{
		chats: make([]*Chat, 0),
	}
}

func (s *InMemoryChatStore) CreateChat(user1Id, user2Id string) (*Chat, error) {
	for _, c := range s.chats {
		if (c.User1Id == user1Id && c.User2Id == user2Id) || (c.User2Id == user1Id && c.User1Id == user2Id) {
			return nil, errors.New("chat already exists")
		}
	}

	newChat := NewChat(user1Id, user2Id)
	s.chats = append(s.chats, newChat)
	return newChat, nil
}

func (s *InMemoryChatStore) GetChats(userId string) ([]*Chat, error) {
	return nil, nil
}

func (s *InMemoryChatStore) GetChatById(userId, chatId string) (*Chat, error) {
	return nil, nil
}

func (s *InMemoryChatStore) SendMessage(userId, chatId, content string) (*Message, error) {
	return nil, nil
}
