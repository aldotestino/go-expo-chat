package handlers

import (
	"api/lib"
	"api/middlewares"
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

	me := r.Context().Value(middlewares.UserIdKey).(string)

	if me == createChatBody.UserId {
		lib.SendErrorJson(w, http.StatusBadRequest, "cannot create chat with yourself")
		return
	}

	_, err = h.us.GetUserById(createChatBody.UserId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
		return
	}

	newChatId, err := h.cs.CreateChat(me, createChatBody.UserId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	lib.SendJson(w, http.StatusCreated, map[string]uint{"chatId": newChatId})
}

func (h *ChatHandler) GetChats(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value(middlewares.UserIdKey).(string)

	chatsRaw, err := h.cs.GetChats(me)

	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
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
			lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
			return
		}

		chats = append(chats, &lib.ChatPreviewWithUser{
			ID:          c.ID,
			User:        otherUser,
			LastMessage: c.LastMessage,
		})
	}

	lib.SendJson(w, http.StatusOK, chats)
}

func (h *ChatHandler) GetChatById(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value(middlewares.UserIdKey).(string)

	chatId := chi.URLParam(r, "chatId")

	chatIdInt, err := strconv.Atoi(chatId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid chat id")
		return
	}

	chatRaw, err := h.cs.GetChatById(uint(chatIdInt))

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
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
		lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
		return
	}

	messagesWithShowTime := lib.ComputeShowTime(chatRaw.Messages)

	chat := &lib.ChatWithUser{
		ID:       chatRaw.ID,
		User:     otherUser,
		Messages: messagesWithShowTime,
	}

	lib.SendJson(w, http.StatusOK, chat)
}

type SendMessageBody struct {
	Content string `json:"content"`
}

func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value(middlewares.UserIdKey).(string)

	chatId := chi.URLParam(r, "chatId")

	chatIdInt, err := strconv.Atoi(chatId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid chat id")
		return
	}

	var sendMessageBody SendMessageBody

	err = json.NewDecoder(r.Body).Decode(&sendMessageBody)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid request body")
		return
	}

	sentMessage, err := h.cs.CreateMessage(me, sendMessageBody.Content, uint(chatIdInt))

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
		return
	}

	lib.SendJson(w, http.StatusCreated, sentMessage)
}

type CreateGroupBody struct {
	GroupName string   `json:"groupName"`
	UserIds   []string `json:"userIds"`
}

func (h *ChatHandler) CreateGroup(w http.ResponseWriter, r *http.Request) {
	var createGroupBody CreateGroupBody

	err := json.NewDecoder(r.Body).Decode(&createGroupBody)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid request body")
		return
	}

	_, err = h.us.GetUsersByIds(createGroupBody.UserIds)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
		return
	}

	me := r.Context().Value(middlewares.UserIdKey).(string)

	groupId, err := h.cs.CreateGroup(me, createGroupBody.GroupName, createGroupBody.UserIds)

	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	lib.SendJson(w, http.StatusCreated, map[string]uint{"groupId": groupId})
}
