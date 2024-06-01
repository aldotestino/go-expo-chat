import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { cssInterop } from "nativewind";
import { useMemo, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from "react-native";

import SelectUserItemList from "@/components/SelectableUserItemList";
import Separator from "@/components/Separator";
import UserItemList from "@/components/UserItemList";
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

  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);

  const dataWithSelected = useMemo(() => {
    return data?.map((user) => ({
      ...user,
      selected: selectedUsers.some(
        (selectedUser) => selectedUser.id === user.id,
      ),
    }));
  }, [data, selectedUsers]);

  function onSelectUser(userId: string) {
    console.log("select", userId);
    setSelectedUsers((prev) => {
      const user = data?.find((user) => user.id === userId);
      if (!user) {
        return prev;
      }
      return [...prev, user];
    });
  }

  function onRemoveUser(userId: string) {
    console.log("remove", userId);
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView className="flex-1">
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          keyboardShouldPersistTaps="handled"
          data={dataWithSelected}
          estimatedItemSize={20}
          contentContainerClassName="py-4 android:pb-12"
          extraData={searchValue}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={() => <Separator className="ml-[72px]" />}
          renderItem={(props) => (
            <SelectUserItemList
              {...props}
              onSelectUser={onSelectUser}
              onRemoveUser={onRemoveUser}
            />
          )}
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
