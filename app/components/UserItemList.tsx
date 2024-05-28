import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { useApi } from "@/lib/hooks/useApi";
import { User } from "@/lib/types";

function UserItemList({ item }: { item: User }) {
  const router = useRouter();

  const { createChat } = useApi();
  const createChatMutation = useMutation({
    mutationFn: createChat,
    onSuccess: ({ chatId }) => {
      router.back();
      router.push(`/chat/${chatId}`);
    },
  });

  async function onPress() {
    await createChatMutation.mutateAsync({ userId: item.id });
  }

  return (
    <TouchableOpacity onPress={onPress}>
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
    </TouchableOpacity>
  );
}

export default UserItemList;
