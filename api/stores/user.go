package stores

import (
	"strings"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

type UserStore interface {
	GetUserById(userId string) (*clerk.User, error)
	SearchUsers(query string) ([]clerk.User, error)
}

type ClerkUserStore struct {
	clerkClient clerk.Client
}

func NewClerkUserStore(clerkClient clerk.Client) *ClerkUserStore {
	return &ClerkUserStore{
		clerkClient: clerkClient,
	}
}

func (s *ClerkUserStore) GetUserById(userId string) (*clerk.User, error) {

	user, err := s.clerkClient.Users().Read(userId)

	if err != nil {
		return nil, err
	}

	return user, nil
}

func (s *ClerkUserStore) SearchUsers(query string) ([]clerk.User, error) {

	users, err := s.clerkClient.Users().ListAll(clerk.ListAllUsersParams{})

	if err != nil {
		return nil, err
	}

	foundUsers := make([]clerk.User, 0)

	for _, u := range users {
		if strings.Contains(*u.Username, query) {
			foundUsers = append(foundUsers, u)
		}
	}

	return foundUsers, nil
}
