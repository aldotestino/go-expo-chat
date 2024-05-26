package stores

import (
	"slices"
	"strings"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

type User struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	ImageUrl string `json:"imageUrl"`
}

type UserStore interface {
	GetUserById(userId string) (*User, error)
	SearchUsers(query string, ignoreList []string) ([]*User, error)
}

type ClerkUserStore struct {
	clerkClient clerk.Client
}

func NewClerkUserStore(clerkClient clerk.Client) *ClerkUserStore {
	return &ClerkUserStore{
		clerkClient: clerkClient,
	}
}

func (s *ClerkUserStore) GetUserById(userId string) (*User, error) {

	user, err := s.clerkClient.Users().Read(userId)

	if err != nil {
		return nil, err
	}

	return &User{
		Id:       user.ID,
		Username: *user.Username,
		ImageUrl: user.ProfileImageURL,
	}, nil
}

func (s *ClerkUserStore) SearchUsers(query string, ignoreList []string) ([]*User, error) {

	users, err := s.clerkClient.Users().ListAll(clerk.ListAllUsersParams{})

	if err != nil {
		return nil, err
	}

	foundUsers := make([]*User, 0)

	for _, u := range users {
		if strings.Contains(*u.Username, query) && !slices.Contains(ignoreList, u.ID) {
			foundUsers = append(foundUsers, &User{
				Id:       u.ID,
				Username: *u.Username,
				ImageUrl: u.ProfileImageURL,
			})
		}
	}

	return foundUsers, nil
}
