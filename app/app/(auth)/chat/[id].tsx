import { FlashList } from "@shopify/flash-list";
import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect, useRef, useState } from "react";
import { NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";

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

  const listRef = useRef<FlashList<Message>>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  function handleContentSizeChange() {
    if (autoScroll) {
      listRef.current?.scrollToEnd({ animated: false });
    }
  }

  function handleScrollBeginDrag() {
    setAutoScroll(false);
  }

  function handleScrollEndDrag(event: NativeSyntheticEvent<NativeScrollEvent>) {
    const { contentOffset, contentSize, layoutMeasurement } = event.nativeEvent;
    const isAtBottom =
      contentOffset.y + layoutMeasurement.height >= contentSize.height - 20; // Adjust threshold as needed

    if (isAtBottom) {
      setAutoScroll(true);
    }
  }

  return (
    <FlashList
      ref={listRef}
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={FAKE_MESSAGES}
      estimatedItemSize={20}
      contentContainerClassName="py-4 android:pb-12 px-4"
      ItemSeparatorComponent={() => <View className="h-4" />}
      keyExtractor={keyExtractor}
      renderItem={(props) => <MessageItem {...props} />}
      onContentSizeChange={handleContentSizeChange}
      onScrollBeginDrag={handleScrollBeginDrag}
      onScrollEndDrag={handleScrollEndDrag}
    />
  );
}

export default Chat;
