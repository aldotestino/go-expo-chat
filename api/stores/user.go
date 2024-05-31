package stores

import (
	"api/lib"
	"errors"
	"slices"
	"strings"

	"github.com/clerkinc/clerk-sdk-go/clerk"
)

type UserStore interface {
	GetUserById(userId string) (*lib.User, error)
	SearchUsers(query string, ignoreList []string) ([]*lib.User, error)
}

type ClerkUserStore struct {
	clerkClient clerk.Client
}

func NewClerkUserStore(clerkClient clerk.Client) *ClerkUserStore {
	return &ClerkUserStore{
		clerkClient: clerkClient,
	}
}

func (s *ClerkUserStore) GetUserById(userId string) (*lib.User, error) {

	user, err := s.clerkClient.Users().Read(userId)

	if err != nil {
		return nil, errors.New("user not found")
	}

	return &lib.User{
		ID:        user.ID,
		Username:  *user.Username,
		ImageUrl:  user.ProfileImageURL,
		Email:     user.EmailAddresses[0].EmailAddress,
		FirstName: *user.FirstName,
		LastName:  *user.LastName,
	}, nil
}

func (s *ClerkUserStore) SearchUsers(query string, ignoreList []string) ([]*lib.User, error) {

	users, err := s.clerkClient.Users().ListAll(clerk.ListAllUsersParams{})

	if err != nil {
		return nil, err
	}

	foundUsers := make([]*lib.User, 0)

	for _, u := range users {
		if strings.Contains(*u.Username, query) && !slices.Contains(ignoreList, u.ID) {
			foundUsers = append(foundUsers, &lib.User{
				ID:        u.ID,
				Username:  *u.Username,
				ImageUrl:  u.ProfileImageURL,
				Email:     u.EmailAddresses[0].EmailAddress,
				FirstName: *u.FirstName,
				LastName:  *u.LastName,
			})
		}
	}

	return foundUsers, nil
}
