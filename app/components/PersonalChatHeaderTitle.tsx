import { Link } from "expo-router";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Avatar, AvatarImage } from "./nativewindui/Avatar";
import { Text } from "./nativewindui/Text";

import { Chat } from "@/lib/types";

function PersonalChatHeaderTitle({ chat }: { chat: Chat }) {
  return (
    <Link
      href={{
        pathname: "/chat/info",
        params: {
          chatId: chat.id,
          username: chat.user?.username,
          imageUrl: chat.user?.imageUrl,
          email: chat.user?.email,
          firstName: chat.user?.firstName,
          lastName: chat.user?.lastName,
        },
      }}
      asChild
    >
      <TouchableOpacity className="w-full">
        <View className="flex flex-row gap-4 items-center w-full">
          <Avatar
            alt={`${chat.user?.username} profile image`}
            className="w-8 h-8"
          >
            <AvatarImage source={{ uri: chat.user?.imageUrl }} />
          </Avatar>
          <Text variant="title3" numberOfLines={1} className="font-semibold">
            {chat.user?.username}
          </Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default PersonalChatHeaderTitle;
