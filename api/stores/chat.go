package stores

import (
	"api/lib"
	"api/models"
	"slices"

	"gorm.io/gorm"
)

type ChatStore interface {
	CreateChat(user1Id, user2Id string) (uint, error)
	GetChats(userId string) ([]*lib.ChatPreview, error)
	GetChatById(chatId uint) (*models.Chat, error)
	CreateMessage(userId, content string, chatId uint) (*models.Message, error)
	CreateGroup(ownerId, name string, participants []string) (uint, error)
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
	query := s.db.Model(&models.Chat{}).
		Select("id").
		Where("(user1_id = ? AND user2_id = ?) OR (user1_id = ? AND user2_id = ?)", user1Id, user2Id, user2Id, user1Id).
		First(&chatId)

	if query.Error != nil && query.Error != gorm.ErrRecordNotFound {
		return 0, query.Error
	}

	if chatId != 0 {
		return chatId, nil
	}

	chat := models.Chat{
		User1ID: user1Id,
		User2ID: user2Id,
	}

	result := s.db.Create(&chat)

	if result.Error != nil {
		return 0, result.Error
	}

	return chat.ID, nil
}

func (s *PostgresChatStore) GetChats(userId string) ([]*lib.ChatPreview, error) {
	userChats := make([]*lib.ChatPreview, 0)

	var chats []models.Chat
	chatQuery := s.db.Model(&models.Chat{}).Where("user1_id = ? OR user2_id = ?", userId, userId).Find(&chats)

	if chatQuery.Error != nil {
		return nil, chatQuery.Error
	}

	for _, c := range chats {

		var lastMessage models.Message
		lastMessageQuery := s.db.Model(&models.Message{}).Where("chat_id = ?", c.ID).Last(&lastMessage)

		if lastMessageQuery.Error != nil {
			if lastMessageQuery.Error != gorm.ErrRecordNotFound {
				return nil, lastMessageQuery.Error
			} else { // if record not found, continue to next chat
				continue
			}
		}

		userChats = append(userChats, &lib.ChatPreview{
			ID:          c.ID,
			User1ID:     c.User1ID,
			User2ID:     c.User2ID,
			LastMessage: &lastMessage,
		})
	}

	slices.SortFunc(userChats, func(a, b *lib.ChatPreview) int {
		return int(b.LastMessage.CreatedAt.UnixMilli() - a.LastMessage.CreatedAt.UnixMilli())
	})

	return userChats, nil
}

func (s *PostgresChatStore) GetChatById(chatId uint) (*models.Chat, error) {
	var chat models.Chat

	query := s.db.Model(&models.Chat{}).Preload("Messages").Where("id = ?", chatId).First(&chat)

	if query.Error != nil {
		return nil, query.Error
	}

	return &chat, nil
}

func (s *PostgresChatStore) CreateMessage(userId, content string, chatId uint) (*models.Message, error) {

	chatQuery := s.db.Model(&models.Chat{}).
		Where("id = ? AND (user1_id = ? OR user2_id = ?)", chatId, userId, userId).
		First(&models.Chat{})

	if chatQuery.Error != nil {
		return nil, chatQuery.Error
	}

	message := models.Message{
		Content: content,
		ChatID:  chatId,
		UserID:  userId,
	}

	result := s.db.Create(&message)

	if result.Error != nil {
		return nil, result.Error
	}

	return &message, nil
}

func (s *PostgresChatStore) CreateGroup(ownerId, name string, participants []string) (uint, error) {

	newGroup := &models.Group{
		Name:    name,
		OwnerID: ownerId,
	}

	tx := s.db.Begin()

	result := tx.Create(&newGroup)

	if result.Error != nil {
		tx.Rollback()
		return 0, result.Error
	}

	participants = append(participants, ownerId)

	for _, p := range participants {
		participant := &models.GroupParticipant{
			GroupID: newGroup.ID,
			UserID:  p,
		}

		result := tx.Create(&participant)

		if result.Error != nil {
			tx.Rollback()
			return 0, result.Error
		}
	}

	tx.Commit()

	return newGroup.ID, nil
}
