package handlers

import (
	"api/stores"
	"encoding/json"
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

type SearchUsersBody struct {
	Query string `json:"query"`
}

func (h *UserHandler) SearchUsers(w http.ResponseWriter, r *http.Request) {

	var body SearchUsersBody

	err := json.NewDecoder(r.Body).Decode(&body)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	users, err := h.us.SearchUsers(body.Query)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}
