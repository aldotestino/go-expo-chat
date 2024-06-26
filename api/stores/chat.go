package stores

import (
	"api/lib"
	"api/models"

	"gorm.io/gorm"
)

type ChatStore interface {
	CreateChat(user1Id, user2Id string) (uint, error)
	CreateGroup(ownerId, name string, participants []string) (uint, error)

	GetPersonalChats(userId string) ([]*lib.RawChatPreview, error)
	GetGroupChats(userId string) ([]*lib.RawChatPreview, error)

	GetPersonalChatById(chatId uint) (*models.Chat, error)
	GetGroupChatById(groupId uint) (*models.Group, error)

	CreatePersonalMessage(userId, content string, chatId uint) (*models.Message, error)
	CreateGroupMessage(userId, content string, groupId uint) (*models.Message, error)
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

func (s *PostgresChatStore) GetPersonalChats(userId string) ([]*lib.RawChatPreview, error) {
	personalChats := make([]*lib.RawChatPreview, 0)

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

		personalChats = append(personalChats, &lib.RawChatPreview{
			ID:          c.ID,
			Type:        string(lib.PersonalChatType),
			User1ID:     &c.User1ID,
			User2ID:     &c.User2ID,
			LastMessage: &lastMessage,
		})
	}

	return personalChats, nil
}

func (s *PostgresChatStore) GetGroupChats(UserId string) ([]*lib.RawChatPreview, error) {
	groupChats := make([]*lib.RawChatPreview, 0)

	var groupParticipants []models.GroupParticipant
	groupParticipantQuery := s.db.Model(&models.GroupParticipant{}).Where("user_id = ?", UserId).Find(&groupParticipants)

	if groupParticipantQuery.Error != nil {
		return nil, groupParticipantQuery.Error
	}

	for _, gp := range groupParticipants {

		var group models.Group
		groupQuery := s.db.Model(&models.Group{}).Where("id = ?", gp.GroupID).First(&group)

		if groupQuery.Error != nil {
			return nil, groupQuery.Error
		}

		var lastMessage models.Message
		lastMessageQuery := s.db.Model(&models.Message{}).Where("group_id = ?", group.ID).Last(&lastMessage)

		if lastMessageQuery.Error != nil {
			if lastMessageQuery.Error != gorm.ErrRecordNotFound {
				return nil, lastMessageQuery.Error
			} else {
				groupChats = append(groupChats, &lib.RawChatPreview{
					ID:          group.ID,
					Type:        string(lib.GroupChatType),
					GroupName:   &group.Name,
					LastMessage: nil,
				})
			}
		} else {
			groupChats = append(groupChats, &lib.RawChatPreview{
				ID:          group.ID,
				Type:        string(lib.GroupChatType),
				GroupName:   &group.Name,
				LastMessage: &lastMessage,
			})
		}
	}

	return groupChats, nil
}

func (s *PostgresChatStore) GetPersonalChatById(chatId uint) (*models.Chat, error) {
	var personalChat models.Chat

	query := s.db.Model(&models.Chat{}).Preload("Messages").Where("id = ?", chatId).First(&personalChat)

	if query.Error != nil {
		return nil, query.Error
	}

	return &personalChat, nil
}

func (s *PostgresChatStore) GetGroupChatById(chatId uint) (*models.Group, error) {
	var groupChat models.Group

	query := s.db.Model(&models.Group{}).
		Preload("Messages").
		Preload("Participants").
		Where("id = ?", chatId).First(&groupChat)

	if query.Error != nil {
		return nil, query.Error
	}

	return &groupChat, nil
}

func (s *PostgresChatStore) CreatePersonalMessage(userId, content string, chatId uint) (*models.Message, error) {

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

func (s *PostgresChatStore) CreateGroupMessage(userId, content string, group_id uint) (*models.Message, error) {

	groupQuery := s.db.Model(&models.GroupParticipant{}).
		Where("group_id = ? AND user_id = ?", group_id, userId).
		First(&models.GroupParticipant{})

	if groupQuery.Error != nil {
		return nil, groupQuery.Error
	}

	message := models.Message{
		Content: content,
		GroupID: group_id,
		UserID:  userId,
	}

	result := s.db.Create(&message)

	if result.Error != nil {
		return nil, result.Error
	}

	return &message, nil
}
