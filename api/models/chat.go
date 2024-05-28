package models

type Chat struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	User1ID string `json:"user1Id" gorm:"uniqueIndex:idx_u1_u2"`
	User2ID string `json:"user2Id" gorm:"uniqueIndex:idx_u1_u2"`

	Messages []Message `json:"messages"`
}
