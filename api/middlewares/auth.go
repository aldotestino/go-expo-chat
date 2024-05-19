package middlewares

import (
	"context"
	"net/http"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		sessionClaims, ok := clerk.SessionFromContext(r.Context())
		if !ok {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Unauthorized"))
			return
		}

		authCtx := context.WithValue(r.Context(), "userId", sessionClaims.Subject)

		next.ServeHTTP(w, r.WithContext(authCtx))
	})
}
