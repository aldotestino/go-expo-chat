import { FlashList } from "@shopify/flash-list";
import { cssInterop } from "nativewind";
import { View } from "react-native";

import ChatPreviewItem from "@/components/ChatPreviewItem";
import EmptyChat from "@/components/EmptyChat";
import { FAKE_CHATS } from "@/lib/constants";
import { ChatPreview } from "@/lib/types";
import { useHeaderSearchBar } from "@/lib/useHeaderSearchBar";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

function keyExtractor(item: ChatPreview) {
  return item.username;
}

function Separator() {
  return <View className="border-b border-muted/40 ml-[72px]" />;
}

const USE_FAKE_DATA = true;
const CHATS: ChatPreview[] = USE_FAKE_DATA ? FAKE_CHATS : [];

function Chat() {
  const searchValue = useHeaderSearchBar({
    hideWhenScrolling: true,
    placeholder: "Search",
  });

  const data = searchValue
    ? CHATS.filter((c) =>
        c.username.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : CHATS;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={data}
      estimatedItemSize={20}
      contentContainerClassName="py-4 android:pb-12"
      extraData={searchValue}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      renderItem={ChatPreviewItem}
      ListEmptyComponent={CHATS.length === 0 ? EmptyChat : undefined}
    />
  );
}

export default Chat;
