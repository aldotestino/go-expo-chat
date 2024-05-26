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

func (h *UserHandler) SearchUsers(w http.ResponseWriter, r *http.Request) {

	query := r.URL.Query().Get("query")

	if query == "" {
		http.Error(w, "Query is empty", http.StatusBadRequest)
		return
	}

	users, err := h.us.SearchUsers(query)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}
