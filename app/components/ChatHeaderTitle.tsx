import React from "react";
import { ActivityIndicator, View } from "react-native";

import { Avatar, AvatarImage } from "./nativewindui/Avatar";
import { Text } from "./nativewindui/Text";

function ChatHeaderTitle({
  username,
  imageUrl,
}: {
  username: string;
  imageUrl: string;
}) {
  return (
    <View className="flex flex-row gap-4 items-center w-full">
      <Avatar alt={`${username} profile image`} className="w-8 h-8">
        <AvatarImage source={{ uri: imageUrl }} />
      </Avatar>
      <Text variant="title3" numberOfLines={1} className="font-semibold">
        {username}
      </Text>
    </View>
  );
}

export function LoadingChatHeaderTitle() {
  return (
    <View className="flex flex-row gap-4 items-center">
      <ActivityIndicator />
      <Text>Loading...</Text>
    </View>
  );
}

export default ChatHeaderTitle;
