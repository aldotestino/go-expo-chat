package handlers

import (
	"api/lib"
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
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid request body")
		return
	}

	_, err = h.us.GetUserById(createChatBody.UserId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
		return
	}

	me := r.Context().Value("userId").(string)
	newChatId, err := h.cs.CreateChat(me, createChatBody.UserId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	lib.SendJson(w, http.StatusCreated, map[string]uint{"chatId": newChatId})
}

func (h *ChatHandler) GetChats(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value("userId").(string)

	chatsRaw, err := h.cs.GetChats(me)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	chats := make([]*lib.ChatPreviewWithUser, 0)

	for _, c := range chatsRaw {

		var otherUserId string
		if c.User1ID == me {
			otherUserId = c.User2ID
		} else {
			otherUserId = c.User1ID
		}

		otherUser, err := h.us.GetUserById(otherUserId)

		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		chats = append(chats, &lib.ChatPreviewWithUser{
			ID:          c.ID,
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

	chatRaw, err := h.cs.GetChatById(uint(chatIdInt))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	var otherUserId string
	if chatRaw.User1ID == me {
		otherUserId = chatRaw.User2ID
	} else {
		otherUserId = chatRaw.User1ID
	}

	otherUser, err := h.us.GetUserById(otherUserId)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	messagesWithShowTime := lib.ComputeShowTime(chatRaw.Messages)

	chat := &lib.ChatWithUser{
		ID:       chatRaw.ID,
		User:     otherUser,
		Messages: messagesWithShowTime,
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

	sentMessage, err := h.cs.CreateMessage(me, sendMessageBody.Content, uint(chatIdInt))

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sentMessage)
}
