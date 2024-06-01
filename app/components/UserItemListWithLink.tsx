import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity } from "react-native";

import UserItemList from "./UserItemList";

import { useApi } from "@/lib/hooks/useApi";
import { User } from "@/lib/types";

const UserItemListWithLink = ({ item }: { item: User }) => {
  const router = useRouter();

  const { createChat } = useApi();
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: ({ chatId }) => {
      router.back();
      router.push(`/chat/${chatId}`);
    },
  });

  async function onPress() {
    await createChatMutation.mutateAsync({ userId: item.id });
  }

  return (
    <TouchableOpacity onPress={onPress}>
      <UserItemList item={item} />
    </TouchableOpacity>
  );
};

export default UserItemListWithLink;
