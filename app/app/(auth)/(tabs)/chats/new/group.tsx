import { FlashList } from "@shopify/flash-list";
import { useQuery } from "@tanstack/react-query";
import { useNavigation } from "expo-router";
import { cssInterop } from "nativewind";
import { useLayoutEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Button,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";

import GroupUserList from "@/components/GroupUserList";
import Input from "@/components/Input";
import SelectUserItemList from "@/components/SelectableUserItemList";
import Separator from "@/components/Separator";
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
  const navigation = useNavigation();

  const searchValue = useHeaderSearchBar({
    hideNavigationBar: false,
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
  const [groupName, setGroupName] = useState("");

  function onPress() {
    console.log({
      groupName,
      selectedUsers: selectedUsers.map((user) => user.id),
    });
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button
          title="Create"
          onPress={onPress}
          disabled={selectedUsers.length === 0 || !groupName.trim()}
        />
      ),
    });
  }, [selectedUsers, groupName, navigation]);

  const dataWithSelected = useMemo(() => {
    return data?.map((user) => ({
      ...user,
      selected: selectedUsers.some(
        (selectedUser) => selectedUser.id === user.id,
      ),
    }));
  }, [data, selectedUsers]);

  function onSelectUser(userId: string) {
    setSelectedUsers((prev) => {
      const user = data?.find((user) => user.id === userId);
      if (!user) {
        return prev;
      }
      return [...prev, user];
    });
  }

  function onRemoveUser(userId: string) {
    setSelectedUsers((prev) => prev.filter((user) => user.id !== userId));
  }

  return (
    <KeyboardAvoidingView
      className="flex-1"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 64 : 0}
    >
      <SafeAreaView className="flex-1">
        {selectedUsers.length > 0 && (
          <View className="gap-4 pb-4">
            <GroupUserList
              selectedUsers={selectedUsers}
              onRemoveUser={onRemoveUser}
            />
            <Input
              value={groupName}
              onChangeText={setGroupName}
              placeholder="Group name"
              className="mx-4"
            />
          </View>
        )}
        <View className="flex-1">
          <FlashList
            contentInsetAdjustmentBehavior="automatic"
            keyboardShouldPersistTaps="handled"
            data={dataWithSelected}
            estimatedItemSize={20}
            contentContainerClassName="py-4 android:pb-12"
            extraData={searchValue}
            keyExtractor={keyExtractor}
            ItemSeparatorComponent={() => <Separator className="ml-[80px]" />}
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
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default NewChatModal;
