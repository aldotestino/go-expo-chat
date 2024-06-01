package models

type GroupParticipant struct {
	ID      uint   `json:"id" gorm:"primaryKey"`
	UserID  string `json:"userId" gorm:"uniqueIndex:idx_u_c"`
	GroupID uint   `json:"groupId" gorm:"uniqueIndex:idx_u_c"`
}
