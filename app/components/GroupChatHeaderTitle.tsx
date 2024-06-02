import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import React from "react";
import { SafeAreaView, TouchableOpacity, View } from "react-native";

import { Text } from "./nativewindui/Text";

import { Chat } from "@/lib/types";

function GroupChatHeaderTitle({ chat }: { chat: Chat }) {
  return (
    // <Link
    //   href={{
    //     pathname: "/chat/info",
    //     params: {
    //       chatId: chat.id,
    //       username: chat.user?.username,
    //       imageUrl: chat.user?.imageUrl,
    //       email: chat.user?.email,
    //       firstName: chat.user?.firstName,
    //       lastName: chat.user?.lastName,
    //     },
    //   }}
    //   asChild
    // >
    <TouchableOpacity className="w-full">
      <View className="flex flex-row gap-4 items-center w-full max-w-[60%]">
        <View className="h-8 w-8 rounded-full items-center justify-center bg-muted">
          <Ionicons name="people" size={16} color="#fff" />
        </View>
        <View>
          <Text variant="title3" numberOfLines={1} className="font-semibold">
            {chat.groupName}
          </Text>
          <Text
            variant="footnote"
            color="tertiary"
            numberOfLines={1}
            className="-mt-1"
          >
            You,{" "}
            {Object.values(chat.participants)
              .map((participant) => participant.username)
              .join(", ")}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
    // </Link>
  );
}

export default GroupChatHeaderTitle;
