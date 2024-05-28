package lib

import (
	"api/models"
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() (*gorm.DB, error) {

	conn_str := fmt.Sprintf("host=%s user=%s password=%s dbname=%s port=%s sslmode=disable",
		os.Getenv("DB_HOST"),
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_NAME"),
		os.Getenv("DB_PORT"),
	)
	return gorm.Open(postgres.Open(conn_str), &gorm.Config{})
}

func MigrateDatabase(db *gorm.DB) {
	db.AutoMigrate(&models.Chat{}, &models.Message{})
}
