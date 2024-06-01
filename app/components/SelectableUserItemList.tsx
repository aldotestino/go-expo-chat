import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import UserItemList from "./UserItemList";

import { User } from "@/lib/types";
import { cn } from "@/lib/utils";

const SelectableUserItemList = ({
  item,
  onSelectUser,
  onRemoveUser,
}: {
  item: User & { selected: boolean };
  onSelectUser: (userId: string) => void;
  onRemoveUser: (userId: string) => void;
}) => {
  function handlePress() {
    if (item.selected) {
      onRemoveUser(item.id);
    } else {
      onSelectUser(item.id);
    }
  }

  return (
    <View className="flex flex-row items-center justify-between pr-4">
      <UserItemList item={item} />
      <TouchableOpacity
        onPress={handlePress}
        className={cn(
          "h-6 w-6 rounded-full flex items-center justify-center border-2 border-primary",
          item.selected ? "bg-primary" : "bg-transparent",
        )}
      >
        {item.selected && <Ionicons name="checkmark" size={20} color="#fff" />}
      </TouchableOpacity>
    </View>
  );
};

export default SelectableUserItemList;
