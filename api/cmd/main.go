package main

import (
	"api/handlers"
	"api/lib"
	"api/middlewares"
	"api/stores"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/clerkinc/clerk-sdk-go/clerk"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

var clerkClient clerk.Client
var db *gorm.DB

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	clerkClient, err = clerk.NewClient(os.Getenv("CLERK_SECRET_KEY"))

	if err != nil {
		log.Fatal("Error initializing Clerk client")
	}

	db, err = lib.ConnectDatabase()

	if err != nil {
		log.Fatal("Error connecting to the database")
	}

	lib.MigrateDatabase(db)
}

func main() {

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	injectActiveSession := clerk.WithSessionV2(clerkClient)
	r.Use(injectActiveSession, middlewares.AuthMiddleware)

	clerkUserStore := stores.NewClerkUserStore(clerkClient)
	postgresChatStore := stores.NewPostgresChatStore(db)

	userHandler := handlers.NewUserHandler(clerkUserStore)
	chatHandler := handlers.NewChatHandler(postgresChatStore, clerkUserStore)

	r.Get("/api/v1/user", userHandler.SearchUsers)

	r.Post("/api/v1/chat", chatHandler.CreateChat)
	r.Get("/api/v1/chat", chatHandler.GetChats)

	r.Post("/api/v1/chat/{chatId}", chatHandler.SendMessage)
	r.Get("/api/v1/chat/{chatId}", chatHandler.GetChatById)

	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", r)
}
