package main

import (
	"api/handlers"
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
)

var clerkClient clerk.Client

func init() {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	client, err := clerk.NewClient(os.Getenv("CLERK_SECRET_KEY"))

	if err != nil {
		log.Fatal("Error initializing Clerk client")
	}

	clerkClient = client
}

func main() {

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	injectActiveSession := clerk.WithSessionV2(clerkClient)
	r.Use(injectActiveSession, middlewares.AuthMiddleware)

	clerkUserStore := stores.NewClerkUserStore(&clerkClient)
	inMemoryChatStore := stores.NewInMemoryChatStore()
	chatHandler := handlers.NewChatHandler(inMemoryChatStore, clerkUserStore)

	r.Post("/api/v1/chat", chatHandler.CreateChat)
	r.Get("/api/v1/chat", chatHandler.GetChats)

	r.Post("/api/v1/chat/{chatId}", chatHandler.SendMessage)
	r.Get("/api/v1/chat/{chatId}", chatHandler.GetChatById)

	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", r)
}
