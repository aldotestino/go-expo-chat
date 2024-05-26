import { useAuth } from "@clerk/clerk-expo";
import { QueryClient, useQuery } from "@tanstack/react-query";
import axios from "axios";

import { User } from "./types";

export const queryClient = new QueryClient();

const apiClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
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

  return {
    searchUser,
  };
}
