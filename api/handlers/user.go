package handlers

import (
	"api/lib"
	"api/middlewares"
	"api/stores"
	"net/http"
)

type UserHandler struct {
	us stores.UserStore
}

func NewUserHandler(us stores.UserStore) *UserHandler {
	return &UserHandler{
		us,
	}
}

func (h *UserHandler) SearchUsers(w http.ResponseWriter, r *http.Request) {

	query := r.URL.Query().Get("query")

	if query == "" {
		lib.SendErrorJson(w, http.StatusBadRequest, "query is empty")
		return
	}

	me := r.Context().Value(middlewares.UserIdKey).(string)

	users, err := h.us.SearchUsers(query, []string{me})

	if err != nil {
		lib.SendErrorJson(w, http.StatusInternalServerError, err.Error())
		return
	}

	lib.SendJson(w, http.StatusOK, users)
}
