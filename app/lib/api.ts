import { useAuth } from "@clerk/clerk-expo";
import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Chat, ChatPreview, Message, User } from "./types";

export const queryClient = new QueryClient();

const apiClient = axios.create({
  baseURL: "http://192.168.1.52:8080/api/v1",
});

export function useApi() {
  const { getToken } = useAuth();

  async function searchUser({ query }: { query: string }) {
    if (query.trim() === "") return [];
    const { data } = await apiClient.get<User[]>(`/user?query=${query}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return data;
  }

  async function getChats() {
    const { data } = await apiClient.get<ChatPreview[]>("/chat", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });
    return data;
  }

  async function createChat({ userId }: { userId: string }) {
    const { data } = await apiClient.post<{ chatId: number }>(
      "/chat",
      {
        userId,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );

    return data;
  }

  async function getChatById({ chatId }: { chatId: number }) {
    const { data } = await apiClient.get<Chat>(`/chat/${chatId}`, {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    return data;
  }

  async function sendMessage({
    content,
    chatId,
  }: {
    content: string;
    chatId: number;
  }) {
    const { data } = await apiClient.post<Message>(
      `/chat/${chatId}`,
      {
        content,
      },
      {
        headers: {
          Authorization: `Bearer ${await getToken()}`,
        },
      },
    );

    return data;
  }

  return {
    searchUser,
    getChats,
    createChat,
    getChatById,
    sendMessage,
  };
}
