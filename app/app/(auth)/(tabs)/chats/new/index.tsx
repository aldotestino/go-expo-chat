import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { Link } from "expo-router";
import { cssInterop } from "nativewind";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

import Button from "@/components/Button";
import Separator from "@/components/Separator";
import UserItemList from "@/components/UserItemList";
import UserItemListWithLink from "@/components/UserItemListWithLink";
import { Text } from "@/components/nativewindui/Text";
import { useApi } from "@/lib/hooks/useApi";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { useHeaderSearchBar } from "@/lib/hooks/useHeaderSearchBar";
import { User } from "@/lib/types";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

function keyExtractor(item: User) {
  return item.id;
}

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

  const { searchUser } = useApi();
  const { data, isLoading } = useQuery({
    queryKey: ["users", { query: debouncedSearchValue }],
    queryFn: async () => searchUser({ query: debouncedSearchValue }),
  });

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView className="flex-1">
        {!searchValue && (
          <View className="p-4">
            <Link href="/chats/new/group" asChild>
              <Button variant="flat" iconLeft="people">
                New Group
              </Button>
            </Link>
          </View>
        )}
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          data={data}
          estimatedItemSize={20}
          contentContainerClassName="py-4 android:pb-12"
          extraData={searchValue}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => <Separator className="ml-[80px]" />}
          renderItem={(props) => <UserItemListWithLink {...props} />}
          ListEmptyComponent={
            debouncedSearchValue ? (
              isLoading ? (
                <ActivityIndicator />
              ) : (
                NoUsersFound
              )
            ) : undefined
          }
        />
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default NewChatModal;
