import { useUser } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { ChatPreview } from "@/lib/types";
import { formatPreviewDate } from "@/lib/utils";

function ChatItemList({ item }: { item: ChatPreview }) {
  const { user } = useUser();

  const { colors } = useColorScheme();

  return (
    <Link
      href={{
        pathname: "/chat/[id]",
        params: { id: item.id, type: item.type },
      }}
      asChild
    >
      <TouchableOpacity>
        <View className="px-4 py-2 flex flex-row gap-4 items-center">
          {item.type === "personal" ? (
            <Avatar
              alt={`${item.user!.username} profile image`}
              className="h-12 w-12"
            >
              <AvatarImage source={{ uri: item.user?.imageUrl }} />
            </Avatar>
          ) : (
            <View className="h-12 w-12 rounded-full items-center justify-center bg-muted">
              <Ionicons name="people" size={24} color="#fff" />
            </View>
          )}
          <View className="flex-1">
            <Text variant="title3" numberOfLines={1} className="font-semibold">
              {item.user?.username || item.groupName}
            </Text>
            {item.lastMessage && (
              <Text variant="body" color="tertiary" numberOfLines={1}>
                {item.lastMessage.userId === user?.id
                  ? `You: ${item.lastMessage.content}`
                  : item.lastMessage.content}
              </Text>
            )}
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
