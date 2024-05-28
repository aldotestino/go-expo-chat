package stores

import (
	"api/lib"
	"api/models"

	"gorm.io/gorm"
)

type ChatStore interface {
	CreateChat(user1Id, user2Id string) (uint, error)
	GetChats(userId string) ([]*lib.ChatPreview, error)
	GetChatById(chatId uint) (*models.Chat, error)
	CreateMessage(userId, content string, chatId uint) (*models.Message, error)
}

type PostgresChatStore struct {
	db *gorm.DB
}

func NewPostgresChatStore(db *gorm.DB) *PostgresChatStore {
	return &PostgresChatStore{
		db,
	}
}

func (s *PostgresChatStore) CreateChat(user1Id, user2Id string) (uint, error) {

	var chatId uint
	query := s.db.Select("id").Find(&models.Chat{}).Where("user1_id = ? AND user2_id = ?", user1Id, user2Id).Scan(&chatId)

	if query.Error != nil {
		return 0, query.Error
	}

	if chatId != 0 {
		return chatId, nil
	}

	chat := models.Chat{
		User1Id: user1Id,
		User2Id: user2Id,
	}

	result := s.db.Create(&chat)

	if result.Error != nil {
		return 0, result.Error
	}

	return chat.ID, nil
}

func (s *PostgresChatStore) GetChats(userId string) ([]*lib.ChatPreview, error) {
	// userChats := make([]*ChatPreview, 0)

	// for _, c := range s.chats {
	// 	if c.User1Id == userId || c.User2Id == userId {

	// 		var lastMessage *Message = nil

	// 		if len(c.Messages) > 0 {
	// 			lastMessage = c.Messages[len(c.Messages)-1]
	// 		}

	// 		userChats = append(userChats, &ChatPreview{
	// 			Id:          c.Id,
	// 			User1Id:     c.User1Id,
	// 			User2Id:     c.User2Id,
	// 			LastMessage: lastMessage,
	// 		})
	// 	}
	// }

	// slices.SortFunc(userChats, func(a, b *ChatPreview) int {
	// 	return int(b.LastMessage.CreatedAt.UnixMilli() - a.LastMessage.CreatedAt.UnixMilli())
	// })

	return nil, nil
}

func (s *PostgresChatStore) GetChatById(chatId uint) (*models.Chat, error) {
	// for _, c := range s.chats {
	// 	if c.Id == chatId {
	// 		return c, nil
	// 	}
	// }

	// return nil, errors.New("chat not found")

	return nil, nil
}

func (s *PostgresChatStore) CreateMessage(userId, content string, chatId uint) (*models.Message, error) {
	// chat, err := s.GetChatById(chatId)

	// if err != nil {
	// 	return nil, err
	// }

	// if chat.User1Id != userId && chat.User2Id != userId {
	// 	return nil, errors.New("chat not found")
	// }

	// message := NewMessage(userId, content)
	// chat.Messages = append(chat.Messages, message)

	return nil, nil
}
