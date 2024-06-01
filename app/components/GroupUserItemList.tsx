import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { TouchableOpacity, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";
import { Text } from "./nativewindui/Text";

import { User } from "@/lib/types";

const GroupUserItemList = ({
  user,
  onRemoveUser,
}: {
  user: User;
  onRemoveUser: (userIdL: string) => void;
}) => {
  return (
    <View className="items-center gap-1 w-20" key={user.id}>
      <View className="relative">
        <Avatar alt={`${user.username} profile image`} className="h-12 w-12">
          <AvatarImage source={{ uri: user.imageUrl }} />
          <AvatarFallback>
            <Text>{user.username[0]}</Text>
          </AvatarFallback>
        </Avatar>
        <TouchableOpacity
          onPress={() => onRemoveUser(user.id)}
          className="absolute -right-1 -top-1 bg-muted rounded-full"
        >
          <Ionicons name="close" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <Text numberOfLines={1}>{user.username}</Text>
    </View>
  );
};

export default GroupUserItemList;
