import { useMutation } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";

import { Avatar, AvatarFallback, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { useApi } from "@/lib/api";
import { User } from "@/lib/types";
import { cn } from "@/lib/utils";

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
    <Pressable onPress={onPress}>
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
  );
}

export default UserItemList;
