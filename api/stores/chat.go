package stores

import (
	"errors"
	"time"
)

type Message struct {
	Id        int       `json:"id"`
	UserId    string    `json:"userId"`
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

type ChatPreview struct {
	Id          int      `json:"id"`
	User1Id     string   `json:"user1Id"`
	User2Id     string   `json:"user2Id"`
	LastMessage *Message `json:"lastMessage"`
}

type ChatStore interface {
	CreateChat(user1Id, user2Id string) (int, error)
	GetChats(userId string) ([]*ChatPreview, error)
	GetChatById(chatId int) (*Chat, error)
	SendMessage(userId, content string, chatId int) (*Message, error)
}

type InMemoryChatStore struct {
	chats []*Chat
}

func NewInMemoryChatStore() *InMemoryChatStore {
	return &InMemoryChatStore{
		chats: make([]*Chat, 0),
	}
}

func (s *InMemoryChatStore) CreateChat(user1Id, user2Id string) (int, error) {
	for _, c := range s.chats {
		if (c.User1Id == user1Id && c.User2Id == user2Id) || (c.User2Id == user1Id && c.User1Id == user2Id) {
			return -1, errors.New("chat already exists")
		}
	}

	newChat := NewChat(user1Id, user2Id)
	s.chats = append(s.chats, newChat)
	return newChat.Id, nil
}

func (s *InMemoryChatStore) GetChats(userId string) ([]*ChatPreview, error) {
	userChats := make([]*ChatPreview, 0)

	for _, c := range s.chats {
		if c.User1Id == userId || c.User2Id == userId {

			var lastMessage *Message = nil

			if len(c.Messages) > 0 {
				lastMessage = c.Messages[len(c.Messages)-1]
			}

			userChats = append(userChats, &ChatPreview{
				Id:          c.Id,
				User1Id:     c.User1Id,
				User2Id:     c.User2Id,
				LastMessage: lastMessage,
			})
		}
	}

	return userChats, nil
}

func (s *InMemoryChatStore) GetChatById(chatId int) (*Chat, error) {
	for _, c := range s.chats {
		if c.Id == chatId {
			return c, nil
		}
	}

	return nil, errors.New("chat not found")
}

func (s *InMemoryChatStore) SendMessage(userId, content string, chatId int) (*Message, error) {
	chat, err := s.GetChatById(chatId)
	if err != nil {
		return nil, err
	}

	if chat.User1Id != userId && chat.User2Id != userId {
		return nil, errors.New("chat not found")
	}

	message := NewMessage(userId, content)
	chat.Messages = append(chat.Messages, message)

	return message, nil
}
