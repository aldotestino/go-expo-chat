package handlers

import (
	"api/stores"
	"encoding/json"
	"net/http"
	"strconv"

	"github.com/go-chi/chi/v5"
)

type ChatHandler struct {
	cs stores.ChatStore
	us stores.UserStore
}

func NewChatHandler(cs stores.ChatStore, us stores.UserStore) *ChatHandler {
	return &ChatHandler{
		cs,
		us,
	}
}

type CreateChatBody struct {
	UserId string `json:"userId"`
}

func (h *ChatHandler) CreateChat(w http.ResponseWriter, r *http.Request) {

	var createChatBody CreateChatBody

	err := json.NewDecoder(r.Body).Decode(&createChatBody)
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	_, err = h.us.GetUserById(createChatBody.UserId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	me := r.Context().Value("userId").(string)
	newChatId, err := h.cs.CreateChat(me, createChatBody.UserId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]int{"chatId": newChatId})
}

func (h *ChatHandler) GetChats(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value("userId").(string)

	chatsRaw, err := h.cs.GetChats(me)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	type ChatPreviewWithUser struct {
		ID          int             `json:"id"`
		LastMessage *stores.Message `json:"lastMessage"`
		User        *stores.User    `json:"user"`
	}

	chats := make([]*ChatPreviewWithUser, 0)

	for _, c := range chatsRaw {

		// If there are no messages in the chat, we don't want to show it
		if c.LastMessage == nil {
			continue
		}

		var otherUserId string
		if c.User1Id == me {
			otherUserId = c.User2Id
		} else {
			otherUserId = c.User1Id
		}

		otherUser, err := h.us.GetUserById(otherUserId)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		chats = append(chats, &ChatPreviewWithUser{
			ID:          c.Id,
			User:        otherUser,
			LastMessage: c.LastMessage,
		})
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chats)
}

func (h *ChatHandler) GetChatById(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value("userId").(string)

	chatId := chi.URLParam(r, "chatId")

	chatIdInt, err := strconv.Atoi(chatId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	chatRaw, err := h.cs.GetChatById(chatIdInt)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	type ChatWithUser struct {
		ID       int               `json:"id"`
		User     *stores.User      `json:"user"`
		Messages []*stores.Message `json:"messages"`
	}

	var otherUserId string
	if chatRaw.User1Id == me {
		otherUserId = chatRaw.User2Id
	} else {
		otherUserId = chatRaw.User1Id
	}

	otherUser, err := h.us.GetUserById(otherUserId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	chat := &ChatWithUser{
		ID:       chatRaw.Id,
		User:     otherUser,
		Messages: chatRaw.Messages,
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(chat)
}

type SendMessageBody struct {
	Content string `json:"content"`
}

func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value("userId").(string)

	chatId := chi.URLParam(r, "chatId")

	chatIdInt, err := strconv.Atoi(chatId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var sendMessageBody SendMessageBody

	err = json.NewDecoder(r.Body).Decode(&sendMessageBody)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	sentMessage, err := h.cs.CreateMessage(me, sendMessageBody.Content, chatIdInt)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sentMessage)
}
