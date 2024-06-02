import { useUser } from "@clerk/clerk-expo";
import { FlashList } from "@shopify/flash-list";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
  View,
} from "react-native";

import GroupChatHeaderTitle from "@/components/GroupChatHeaderTitle";
import LoadingChatHeaderTitle from "@/components/LoadingChatHeaderTitile";
import MessageInput from "@/components/MessageInput";
import MessageItem from "@/components/MessageItem";
import PersonalChatHeaderTitle from "@/components/PersonalChatHeaderTitle";
import { queryClient, useApi } from "@/lib/hooks/useApi";
import { Chat, ChatType, Message } from "@/lib/types";
import { optimisticallyUpdateChat } from "@/lib/utils";

function keyExtractor(item: Message) {
  return item.id.toString();
}

function ChatPage() {
  const navigation = useNavigation();
  const { id, type } = useLocalSearchParams<{ id: string; type: ChatType }>();
  const { user } = useUser();

  const listRef = useRef<FlashList<Message>>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  const queryKey = ["chat", { chatId: id }];

  const { getChatById, sendMessage } = useApi();
  const { data, isLoading } = useQuery({
    queryKey,
    queryFn: async () =>
      getChatById({ type: type as ChatType, chatId: parseInt(id!, 10) }),
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      title: data?.user?.username || data?.groupName,
      headerTitle: isLoading ? (
        <LoadingChatHeaderTitle />
      ) : data ? (
        data.type === "personal" ? (
          () => <PersonalChatHeaderTitle chat={data} />
        ) : (
          () => <GroupChatHeaderTitle chat={data} />
        )
      ) : undefined,
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

      setAutoScroll(true);
    },
  });

  async function onSubmit({ content }: { content: string }) {
    await sendMessageMutation.mutateAsync({
      chatId: parseInt(id!, 10),
      type: type as ChatType,
      content,
    });
  }

  function scrollToEnd() {
    if (autoScroll && listRef.current) {
      listRef.current.scrollToItem({
        animated: false,
        item: data?.messages[data.messages.length - 1],
      });
    }
  }

  function handleOnScroll(e: NativeSyntheticEvent<NativeScrollEvent>) {
    const { layoutMeasurement, contentOffset, contentSize } = e.nativeEvent;

    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >= contentSize.height - 20;

    if (isCloseToBottom) {
      setAutoScroll(true);
    } else {
      setAutoScroll(false);
    }
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
        estimatedItemSize={100}
        contentContainerClassName="py-4 android:pb-12 px-4"
        ItemSeparatorComponent={() => <View className="h-4" />}
        keyExtractor={keyExtractor}
        renderItem={(props) => (
          <MessageItem
            {...props}
            chatType={data?.type}
            participants={data?.participants}
          />
        )}
        onContentSizeChange={scrollToEnd}
        onScroll={handleOnScroll}
      />
      <MessageInput
        username={data?.user?.username || data?.groupName}
        onSubmit={onSubmit}
      />
    </KeyboardAvoidingView>
  );
}

export default ChatPage;
