package handlers

import (
	"api/stores"
	"encoding/json"
	"net/http"
)

type ChatHandler struct {
	db stores.ChatStore
}

func NewChatHandler(db stores.ChatStore) *ChatHandler {
	return &ChatHandler{
		db: db,
	}
}

type CreateChatBody struct {
	User1Id string `json:"user1Id"`
	User2Id string `json:"user2Id"`
}

func (h *ChatHandler) CreateChat(w http.ResponseWriter, r *http.Request) {

	var createChatBody CreateChatBody

	err := json.NewDecoder(r.Body).Decode(&createChatBody)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte("Invalid request body"))
		return
	}

	newChat, error := h.db.CreateChat(createChatBody.User1Id, createChatBody.User2Id)

	if error != nil {
		w.WriteHeader(http.StatusBadRequest)
		w.Write([]byte(error.Error()))
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(newChat)
}

func (h *ChatHandler) GetChats(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetChats"))
}

func (h *ChatHandler) GetChatById(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("GetMessagesFromChat"))
}

func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("SendMessageToChat"))
}
