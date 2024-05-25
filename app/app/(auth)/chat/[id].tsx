import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import MessageInput from "@/components/MessageInput";
import MessageItem from "@/components/MessageItem";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { FAKE_CHATS, FAKE_MESSAGES } from "@/lib/constants";
import { Message } from "@/lib/types";

function keyExtractor(item: Message) {
  return item.id.toString();
}

function Chat() {
  const navigation = useNavigation();
  const local = useLocalSearchParams<{ id: string }>();

  const chat = FAKE_CHATS.find((chat) => chat.username === local.id);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
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

  const insets = useSafeAreaInsets();
  const listRef = useRef<FlashList<Message>>(null);

  function handleContentSizeChange() {
    listRef.current?.scrollToEnd({ animated: false });
  }

  const [sentMessages, setSentMessages] = useState<Message[]>([]);

  const messages = useMemo(
    () => [...FAKE_MESSAGES, ...sentMessages],
    [sentMessages],
  );

  function onNewMessageSent(content: string) {
    const newMessage: Message = {
      id: messages.length,
      content,
      createdAt: new Date(),
      userId: "user1",
    };

    setSentMessages((prev) => [...prev, newMessage]);
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
        data={messages}
        estimatedItemSize={20}
        contentContainerClassName="py-4 android:pb-12 px-4"
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyExtractor={keyExtractor}
        renderItem={(props) => <MessageItem {...props} />}
        onContentSizeChange={handleContentSizeChange}
      />
      <MessageInput
        chatId={chat?.username}
        onNewMessageSent={onNewMessageSent}
      />
    </KeyboardAvoidingView>
  );
}

export default Chat;
