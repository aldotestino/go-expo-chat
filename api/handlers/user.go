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

	me := r.Context().Value("userId").(string)

	users, err := h.us.SearchUsers(query, []string{me})

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(users)
}
