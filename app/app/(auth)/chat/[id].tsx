import { useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import ChatHeaderTitle, {
  LoadingChatHeaderTitle,
} from "@/components/ChatHeaderTitle";
import MessageInput from "@/components/MessageInput";
import MessageItem from "@/components/MessageItem";
import { queryClient, useApi } from "@/lib/hooks/useApi";
import { Chat, Message } from "@/lib/types";
import { optimisticallyUpdateChat } from "@/lib/utils";

function keyExtractor(item: Message) {
  return item.id.toString();
}

function ChatPage() {
  const navigation = useNavigation();
  const local = useLocalSearchParams<{ id: string }>();
  const { user } = useUser();

  const listRef = useRef<FlashList<Message>>(null);

  const queryKey = ["chat", { chatId: local.id }];

  const { getChatById, sendMessage } = useApi();
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () => getChatById({ chatId: parseInt(local.id!, 10) }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle:
        !isLoading && data
          ? () => (
              <ChatHeaderTitle
                username={data.user.username}
                imageUrl={data.user.imageUrl}
              />
            )
          : () => <LoadingChatHeaderTitle />,
    });
  }, [data, isLoading, navigation]);

  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: async ({ content }) => {
      await queryClient.cancelQueries({
        queryKey,
      });

      const prevChat = queryClient.getQueryData<Chat>(queryKey);

      queryClient.setQueryData<Chat>(queryKey, (oldChat) =>
        optimisticallyUpdateChat(oldChat!, content, user!.id),
      );

      return { prevChat };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData(queryKey, context?.prevChat);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey,
      });

      queryClient.invalidateQueries({
        queryKey: ["chats"],
      });

      listRef.current?.scrollToItem({
        animated: true,
        item: data?.messages[data.messages.length - 1],
      });
    },
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
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
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
