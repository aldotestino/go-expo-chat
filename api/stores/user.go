package stores

import "github.com/clerkinc/clerk-sdk-go/clerk"

type UserStore interface {
	GetUserById(userId string) (*clerk.User, error)
	SearchUsers(query string) ([]*clerk.User, error)
}

type ClerkUserStore struct {
	clerkClient *clerk.Client
}

func NewClerkUserStore(clerkClient *clerk.Client) *ClerkUserStore {
	return &ClerkUserStore{
		clerkClient: clerkClient,
	}
}

func (s *ClerkUserStore) GetUserById(userId string) (*clerk.User, error) {
	return nil, nil
}

func (s *ClerkUserStore) SearchUsers(query string) ([]*clerk.User, error) {
	return nil, nil
}
