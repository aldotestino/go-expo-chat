import { View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { ChatPreview } from "@/lib/types";

function UserItem({ item }: { item: ChatPreview }) {
  return (
    <View className="px-4 py-2 flex flex-row gap-4 items-center">
      <Avatar alt={`${item.username} profile image`}>
        <AvatarImage source={{ uri: item.imageUrl }} />
        <AvatarFallback>
          <Text>{item.username[0]}</Text>
        </AvatarFallback>
      </Avatar>
      <Text variant="title3" numberOfLines={1} className="font-semibold">
        {item.username}
      </Text>
    </View>
  );
}

export default UserItem;
