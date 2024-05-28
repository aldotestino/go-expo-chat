import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { cssInterop } from "nativewind";
import { useMemo } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import ChatItemList from "@/components/ChatItemList";
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
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["chats"],
    queryFn: getChats,
  });

  const filteredData = useMemo(
    () =>
      data?.filter((c) =>
        c.user.username.toLowerCase().includes(searchValue.toLowerCase()),
      ),
    [data, searchValue],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        keyboardShouldPersistTaps="handled"
        data={filteredData}
        estimatedItemSize={20}
        contentContainerClassName="py-4 android:pb-12"
        extraData={searchValue}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={() => <Separator className="ml-[72px]" />}
        renderItem={(props) => <ChatItemList {...props} />}
        onRefresh={refetch}
        refreshing={isLoading}
        ListEmptyComponent={data?.length === 0 ? EmptyChat : undefined}
      />
    </KeyboardAvoidingView>
  );
}

export default ChatList;
