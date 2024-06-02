import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { cssInterop } from "nativewind";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";

import ChatItemList from "@/components/ChatItemList";
import Chip from "@/components/Chip";
import EmptyChat from "@/components/EmptyChat";
import Separator from "@/components/Separator";
import { useApi } from "@/lib/hooks/useApi";
import { useHeaderSearchBar } from "@/lib/hooks/useHeaderSearchBar";
import { ChatPreview } from "@/lib/types";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

function keyExtractor(item: ChatPreview) {
  return item.id.toString();
}

function ChatList() {
  const searchValue = useHeaderSearchBar({
    hideWhenScrolling: true,
    placeholder: "Search",
  });

  const { getChats } = useApi();
  const { data, isLoading } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  const [filter, setFilter] = useState<"all" | "groups">("all");

  const filteredData = useMemo(
    () =>
      data?.filter(
        (c) =>
          (filter === "groups" ? c.type === "group" : true) &&
          (c.user?.username.toLowerCase().includes(searchValue.toLowerCase()) ||
            c.groupName?.toLowerCase().includes(searchValue.toLowerCase())),
      ),
    [data, searchValue, filter],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <FlashList
        ListHeaderComponent={() => (
          <View className="px-4 flex-row gap-2 pb-2">
            <Chip selected={filter === "all"} onPress={() => setFilter("all")}>
              All
            </Chip>
            <Chip
              selected={filter === "groups"}
              onPress={() => setFilter("groups")}
            >
              Groups
            </Chip>
          </View>
        )}
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={filteredData}
        estimatedItemSize={20}
        contentContainerClassName="py-4 android:pb-12"
        extraData={searchValue}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <Separator className="ml-[80px]" />}
        renderItem={(props) => <ChatItemList {...props} />}
        ListEmptyComponent={
          isLoading ? (
            <ActivityIndicator />
          ) : data?.length === 0 ? (
            EmptyChat
          ) : undefined
        }
      />
    </KeyboardAvoidingView>
  );
}

export default ChatList;
