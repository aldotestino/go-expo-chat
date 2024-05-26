package handlers

import (
	"api/stores"
	"encoding/json"
	"net/http"
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
	w.Write([]byte("GetMessagesFromChat"))
}

func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	w.Write([]byte("SendMessageToChat"))
}
