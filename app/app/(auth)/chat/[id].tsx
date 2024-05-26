import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import ChatHeaderTitle, {
  LoadingChatHeaderTitle,
} from "@/components/ChatHeaderTitle";
import MessageInput from "@/components/MessageInput";
import MessageItem from "@/components/MessageItem";
import { useApi } from "@/lib/api";
import { Message } from "@/lib/types";

function keyExtractor(item: Message) {
  return item.id.toString();
}

function ChatPage() {
  const navigation = useNavigation();
  const local = useLocalSearchParams<{ id: string }>();

  const { getChatById, sendMessage } = useApi();
  const { data, isLoading } = useQuery({
    queryKey: ["chat", { chatId: local.id }],
    queryFn: async () => getChatById({ chatId: parseInt(local.id!, 10) }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: !isLoading
        ? () => (
            <ChatHeaderTitle
              username={data!.user.username}
              imageUrl={data!.user.imageUrl}
            />
          )
        : () => <LoadingChatHeaderTitle />,
    });
  });

  const insets = useSafeAreaInsets();
  const listRef = useRef<FlashList<Message>>(null);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
  });

  async function onSubmit({ content }: { content: string }) {
    await sendMessageMutation.mutateAsync({
      chatId: parseInt(local.id!, 10),
      content,
    });
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
