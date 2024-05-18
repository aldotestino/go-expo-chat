package handlers

import "net/http"

type ChatHandler struct {
}

func NewChatHandler() *ChatHandler {
	return &ChatHandler{}
}

func (h *ChatHandler) CreateChat(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("CreateChat"))
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
