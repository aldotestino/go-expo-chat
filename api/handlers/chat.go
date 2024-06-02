package handlers

import (
	"api/lib"
	"api/middlewares"
	"api/models"
	"api/stores"
	"encoding/json"
	"net/http"
	"slices"
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

	personalChatsRaw, err := h.cs.GetPersonalChats(me)
	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	groupChatsRaw, err := h.cs.GetGroupChats(me)
	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	chats := make([]*lib.ChatPreview, 0)

	for _, c := range personalChatsRaw {

		var otherUserId string
		if *c.User1ID == me {
			otherUserId = *c.User2ID
		} else {
			otherUserId = *c.User1ID
		}

		otherUser, err := h.us.GetUserById(otherUserId)

		if err != nil {
			lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
			return
		}

		chats = append(chats, &lib.ChatPreview{
			ID:          c.ID,
			Type:        c.Type,
			User:        otherUser,
			LastMessage: c.LastMessage,
		})
	}

	for _, c := range groupChatsRaw {

		chatPreview := &lib.ChatPreview{
			ID:          c.ID,
			Type:        c.Type,
			GroupName:   c.GroupName,
			LastMessage: c.LastMessage,
		}

		if c.LastMessage != nil {
			lastMessageSender, err := h.us.GetUserById(c.LastMessage.UserID)
			if err != nil {
				lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
				return
			}
			chatPreview.LastMessageSender = &lastMessageSender.Username
		}

		chats = append(chats, chatPreview)
	}

	slices.SortFunc(chats, func(a, b *lib.ChatPreview) int {
		if a.LastMessage == nil && b.LastMessage == nil {
			return 0
		}
		if a.LastMessage == nil {
			return 1
		}
		if b.LastMessage == nil {
			return -1
		}
		return int(b.LastMessage.CreatedAt.UnixMilli() - a.LastMessage.CreatedAt.UnixMilli())
	})

	lib.SendJson(w, http.StatusOK, chats)
}

func (h *ChatHandler) GetChatById(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value(middlewares.UserIdKey).(string)

	chatType := chi.URLParam(r, "chatType")
	chatId := chi.URLParam(r, "chatId")

	chatIdInt, err := strconv.Atoi(chatId)

	if err != nil {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid chat id")
		return
	}

	if chatType == string(lib.PersonalChatType) {
		chatRaw, err := h.cs.GetPersonalChatById(uint(chatIdInt))

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

		chat := &lib.Chat{
			ID:       chatRaw.ID,
			Type:     string(lib.PersonalChatType),
			User:     otherUser,
			Messages: messagesWithShowTime,
		}

		lib.SendJson(w, http.StatusOK, chat)
	} else if chatType == string(lib.GroupChatType) {
		groupRaw, err := h.cs.GetGroupChatById(uint(chatIdInt))

		if err != nil {
			lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
			return
		}

		participants := make([]string, 0)
		for _, gp := range groupRaw.Participants {
			if gp.UserID != me {
				participants = append(participants, gp.UserID)
			}
		}

		groupParticipants, err := h.us.GetUsersByIds(participants)

		if err != nil {
			lib.SendErrorJson(w, http.StatusBadRequest, err.Error())
			return
		}

		messagesWithShowTime := lib.ComputeShowTime(groupRaw.Messages)

		chat := &lib.Chat{
			ID:           groupRaw.ID,
			Type:         string(lib.GroupChatType),
			GroupName:    &groupRaw.Name,
			Participants: groupParticipants,
			Messages:     messagesWithShowTime,
		}

		lib.SendJson(w, http.StatusOK, chat)
	} else {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid chat type")
	}
}

type SendMessageBody struct {
	Content string `json:"content"`
}

func (h *ChatHandler) SendMessage(w http.ResponseWriter, r *http.Request) {
	me := r.Context().Value(middlewares.UserIdKey).(string)

	chatType := chi.URLParam(r, "chatType")
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

	var sentMessage *models.Message

	if chatType == string(lib.PersonalChatType) {
		sentMessage, err = h.cs.CreatePersonalMessage(me, sendMessageBody.Content, uint(chatIdInt))
	} else if chatType == string(lib.GroupChatType) {
		sentMessage, err = h.cs.CreateGroupMessage(me, sendMessageBody.Content, uint(chatIdInt))
	} else {
		lib.SendErrorJson(w, http.StatusBadRequest, "invalid chat type")
		return
	}

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
