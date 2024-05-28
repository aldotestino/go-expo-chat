package lib

import (
	"api/models"
	"encoding/json"
	"net/http"
	"time"
)

func isSameTime(date1, date2 time.Time) bool {

	return date1.Year() == date2.Year() &&
		date1.Month() == date2.Month() &&
		date1.Day() == date2.Day() &&
		date1.Hour() == date2.Hour() &&
		date1.Minute() == date2.Minute()
}

func ComputeShowTime(messages []models.Message) []*MessageWithShowTime {

	messagesWithShowTime := make([]*MessageWithShowTime, 0)

	for i, m := range messages {

		var messageWithShowTime *MessageWithShowTime

		if i == len(messages)-1 {
			messageWithShowTime = &MessageWithShowTime{
				ID:        m.ID,
				UserId:    m.UserId,
				Content:   m.Content,
				CreatedAt: m.CreatedAt,
				ShowTime:  true,
			}
		} else {
			nextMessage := messages[i+1]

			showTime := !isSameTime(m.CreatedAt, nextMessage.CreatedAt) || m.UserId != nextMessage.UserId

			messageWithShowTime = &MessageWithShowTime{
				ID:        m.ID,
				UserId:    m.UserId,
				Content:   m.Content,
				CreatedAt: m.CreatedAt,
				ShowTime:  showTime,
			}
		}

		messagesWithShowTime = append(messagesWithShowTime, messageWithShowTime)

	}

	return messagesWithShowTime
}

func SendErrorJson(w http.ResponseWriter, statusCode int, message string) {
	SendJson(w, statusCode, map[string]string{"error": message})
}

func SendJson(w http.ResponseWriter, statusCode int, data interface{}) {
	w.WriteHeader(statusCode)
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(data)
}
