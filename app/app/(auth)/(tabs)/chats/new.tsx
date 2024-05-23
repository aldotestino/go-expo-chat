import { FlashList } from "@shopify/flash-list";
import { cssInterop } from "nativewind";

import Separator from "@/components/Separator";
import UserItemList from "@/components/UserItemList";
import { Text } from "@/components/nativewindui/Text";
import { FAKE_CHATS } from "@/lib/constants";
import { ChatPreview } from "@/lib/types";
import { useDebounce } from "@/lib/useDebounce";
import { useHeaderSearchBar } from "@/lib/useHeaderSearchBar";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

function keyExtractor(item: ChatPreview) {
  return item.username;
}

const USE_FAKE_DATA = true;
const CHATS: ChatPreview[] = USE_FAKE_DATA ? FAKE_CHATS : [];

function NoUsersFound() {
  return (
    <Text className="text-center" color="tertiary">
      No users found
    </Text>
  );
}

function NewChatModal() {
  const searchValue = useHeaderSearchBar({
    autoFocus: true,
    placeholder: "Search by username",
    autoCapitalize: "none",
  });

  const debouncedSearchValue = useDebounce(searchValue, 500);

  const data = debouncedSearchValue
    ? CHATS.filter((c) =>
        c.username.toLowerCase().includes(debouncedSearchValue.toLowerCase()),
      )
    : [];

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={data}
      estimatedItemSize={20}
      contentContainerClassName="py-4 android:pb-12"
      extraData={searchValue}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={() => <Separator className="ml-[72px]" />}
      renderItem={(props) => <UserItemList {...props} />}
      ListEmptyComponent={debouncedSearchValue ? NoUsersFound : undefined}
    />
  );
}

export default NewChatModal;
