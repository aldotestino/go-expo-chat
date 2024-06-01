import { View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { User } from "@/lib/types";

function UserItemList({ item }: { item: User }) {
  return (
    <View className="px-4 py-2 flex flex-row gap-4 items-center flex-1">
      <Avatar alt={`${item.username} profile image`} className="h-12 w-12">
        <AvatarImage source={{ uri: item.imageUrl }} />
        <AvatarFallback>
          <Text>{item.username[0]}</Text>
        </AvatarFallback>
      </Avatar>
      <View className="flex-1">
        <Text variant="title3" numberOfLines={1} className="font-semibold">
          {item.username}
        </Text>
        <Text variant="body" color="tertiary" numberOfLines={1}>
          {item.email}
        </Text>
      </View>
    </View>
  );
}

export default UserItemList;
