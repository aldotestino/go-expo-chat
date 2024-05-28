import { useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { ChatPreview } from "@/lib/types";
import { formatPreviewDate } from "@/lib/utils";

function ChatItemList({ item }: { item: ChatPreview }) {
  const { user } = useUser();

  return (
    <Link href={`/chat/${item.id}`} asChild>
      <TouchableOpacity>
        <View className="px-4 py-2 flex flex-row gap-4 items-center">
          <Avatar alt={`${item.user.username} profile image`}>
            <AvatarImage source={{ uri: item.user.imageUrl }} />
            <AvatarFallback>
              <Text>{item.user.username[0]}</Text>
            </AvatarFallback>
          </Avatar>
          <View className="flex-1">
            <Text variant="title3" numberOfLines={1} className="font-semibold">
              {item.user.username}
            </Text>
            <Text variant="body" color="tertiary" numberOfLines={1}>
              {item.lastMessage.userId === user!.id
                ? `You: ${item.lastMessage.content}`
                : item.lastMessage.content}
            </Text>
          </View>
          {item.lastMessage && (
            <Text className="self-start" variant="subhead" color="tertiary">
              {formatPreviewDate(item.lastMessage.createdAt)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default ChatItemList;
