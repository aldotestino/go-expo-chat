package models

import "gorm.io/gorm"

type Chat struct {
	gorm.Model
	User1Id string `json:"user1Id" gorm:"uniqueIndex:idx_u1_u2"`
	User2Id string `json:"user2Id" gorm:"uniqueIndex:idx_u1_u2"`

	Messages []Message `json:"messages"`
}
