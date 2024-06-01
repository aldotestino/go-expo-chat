import React from "react";
import { View, ScrollView } from "react-native";

import GroupUserItemList from "./GroupUserItemList";
import Input from "./Input";

import { User } from "@/lib/types";

const GroupUserList = ({
  selectedUsers,
  onRemoveUser,
}: {
  selectedUsers: User[];
  onRemoveUser: (userId: string) => void;
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerClassName="px-4 pt-4 h-auto"
    >
      {selectedUsers.map((user) => (
        <GroupUserItemList
          key={user.id}
          user={user}
          onRemoveUser={onRemoveUser}
        />
      ))}
    </ScrollView>
  );
};

export default GroupUserList;
