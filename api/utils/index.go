package utils

import (
	"api/stores"
	"time"
)

func isSameTime(date1, date2 time.Time) bool {

	return date1.Year() == date2.Year() &&
		date1.Month() == date2.Month() &&
		date1.Day() == date2.Day() &&
		date1.Hour() == date2.Hour() &&
		date1.Minute() == date2.Minute()
}

func ComputeShowTime(messages []*stores.Message) []*MessageWithShowTime {

	messagesWithShowTime := make([]*MessageWithShowTime, 0)

	for i, m := range messages {

		var messageWithShowTime *MessageWithShowTime

		if i == len(messages)-1 {
			messageWithShowTime = &MessageWithShowTime{
				Id:        m.Id,
				UserId:    m.UserId,
				Content:   m.Content,
				CreatedAt: m.CreatedAt,
				ShowTime:  true,
			}
		} else {
			nextMessage := messages[i+1]

			showTime := !isSameTime(m.CreatedAt, nextMessage.CreatedAt) || m.UserId != nextMessage.UserId

			messageWithShowTime = &MessageWithShowTime{
				Id:        m.Id,
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
