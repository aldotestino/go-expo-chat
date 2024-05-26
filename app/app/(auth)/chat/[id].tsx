import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MessageInput from "@/components/MessageInput";
import MessageItem from "@/components/MessageItem";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { useApi } from "@/lib/api";
import { Message } from "@/lib/types";

function keyExtractor(item: Message) {
  return item.id.toString();
}

function ChatPage() {
  const navigation = useNavigation();
  const local = useLocalSearchParams<{ id: string }>();

  const { getChatById } = useApi();
  const { data, isLoading } = useQuery({
    queryKey: ["chat", { chatId: local.id }],
    queryFn: async () => getChatById({ chatId: parseInt(local.id!, 10) }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View className="flex flex-row gap-4 items-center w-full">
          {!isLoading ? (
            <>
              <Avatar
                alt={`${data?.user.username} profile image`}
                className="w-8 h-8"
              >
                <AvatarImage source={{ uri: data?.user.imageUrl }} />
                <AvatarFallback>
                  <Text>{data?.user.username[0]}</Text>
                </AvatarFallback>
              </Avatar>
              <Text
                variant="title3"
                numberOfLines={1}
                className="font-semibold"
              >
                {data?.user.username}
              </Text>
            </>
          ) : (
            <>
              <ActivityIndicator />
              <Text>Loading...</Text>
            </>
          )}
        </View>
      ),
    });
  });

  const insets = useSafeAreaInsets();
  const listRef = useRef<FlashList<Message>>(null);

  async function onSubmit({ content }: { content: string }) {
    await new Promise((resolve) => setTimeout(resolve, 10000));
    console.log(content);
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? -insets.bottom : 0}
    >
      <FlashList
        ref={listRef}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={data?.messages}
        estimatedItemSize={20}
        contentContainerClassName="py-4 android:pb-12 px-4"
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyExtractor={keyExtractor}
        renderItem={(props) => <MessageItem {...props} />}
      />
      <MessageInput username={data?.user.username} onSubmit={onSubmit} />
    </KeyboardAvoidingView>
  );
}

export default ChatPage;
