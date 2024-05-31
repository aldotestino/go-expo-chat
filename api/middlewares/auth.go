package middlewares

import (
	"api/lib"
	"context"
	"net/http"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

type ContextKey string

const (
	UserIdKey ContextKey = "userId"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sessionClaims, ok := clerk.SessionFromContext(r.Context())
		if !ok {
			lib.SendErrorJson(w, http.StatusUnauthorized, "unauthorized")
			return
		}

		authCtx := context.WithValue(r.Context(), UserIdKey, sessionClaims.Subject)

		next.ServeHTTP(w, r.WithContext(authCtx))
	})
}
