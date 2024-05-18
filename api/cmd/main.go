package main

import (
	"api/handlers"
	"fmt"
	"net/http"

	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
)

func main() {
	r := chi.NewRouter()
	r.Use(middleware.Logger)

	chatHandler := handlers.NewChatHandler()

	r.Post("/api/v1/chat", chatHandler.CreateChat)
	r.Get("/api/v1/chat", chatHandler.GetChats)

	r.Post("/api/v1/chat/{chatId}", chatHandler.SendMessage)
	r.Get("/api/v1/chat/{chatId}", chatHandler.GetChatById)

	fmt.Println("Server is running on port 8080")
	http.ListenAndServe(":8080", r)
}
