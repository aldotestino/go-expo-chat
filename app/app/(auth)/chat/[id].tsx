import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { FAKE_CHATS } from "@/lib/constants";

function Chat() {
  const navigation = useNavigation();
  const local = useLocalSearchParams<{ id: string }>();

  const chat = FAKE_CHATS.find((chat) => chat.username === local.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: ({}) => (
        <View className="flex flex-row gap-4 items-center w-full">
          <Avatar alt={`${chat!.username} profile image`} className="w-8 h-8">
            <AvatarImage source={{ uri: chat!.imageUrl }} />
            <AvatarFallback>
              <Text>{chat!.username[0]}</Text>
            </AvatarFallback>
          </Avatar>
          <Text variant="title3" numberOfLines={1} className="font-semibold">
            {chat!.username}
          </Text>
        </View>
      ),
    });
  });

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        {Array.from({ length: 100 }).map((_, i) => (
          <Text key={i} className="p-4">
            message nr {i} wowo so many
          </Text>
        ))}
      </SafeAreaView>
    </ScrollView>
  );
}

export default Chat;
