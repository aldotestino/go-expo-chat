package models

type Group struct {
	ID        uint   `json:"id" gorm:"primaryKey"`
	CreatedAt string `json:"createdAt"`
	Name      string `json:"name"`
	OwnerID   string `json:"ownerId"`

	Messages     []Message          `json:"messages"`
	Participants []GroupParticipant `json:"participants"`
}
