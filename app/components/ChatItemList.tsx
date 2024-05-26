import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { ChatPreview } from "@/lib/types";
import { cn, formatPreviewDate } from "@/lib/utils";

function ChatItemList({ item }: { item: ChatPreview }) {
  return (
    <Link href={`/chat/${item.id}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className={cn(
              "px-4 py-2 flex flex-row gap-4 items-center",
              pressed && "bg-muted/40",
            )}
          >
            <Avatar alt={`${item.user.username} profile image`}>
              <AvatarImage source={{ uri: item.user.imageUrl }} />
              <AvatarFallback>
                <Text>{item.user.username[0]}</Text>
              </AvatarFallback>
            </Avatar>
            <View className="flex-1">
              <Text
                variant="title3"
                numberOfLines={1}
                className="font-semibold"
              >
                {item.user.username}
              </Text>
              <Text variant="body" color="tertiary" numberOfLines={1}>
                {item.lastMessage?.content ?? "No messages yet"}
              </Text>
            </View>
            {item.lastMessage && (
              <Text className="self-start" variant="subhead" color="tertiary">
                {formatPreviewDate(item.lastMessage.createdAt)}
              </Text>
            )}
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export default ChatItemList;
