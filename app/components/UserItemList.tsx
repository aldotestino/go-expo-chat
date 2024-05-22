import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { ChatPreview } from "@/lib/types";
import { cn } from "@/lib/utils";

function UserItemList({ item }: { item: ChatPreview }) {
  return (
    <Link href={`/chat/${item.username}`} asChild>
      <Pressable>
        {({ pressed }) => (
          <View
            className={cn(
              "px-4 py-2 flex flex-row gap-4 items-center",
              pressed && "bg-muted/40",
            )}
          >
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
        )}
      </Pressable>
    </Link>
  );
}

export default UserItemList;
