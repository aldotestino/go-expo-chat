import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";

import { Avatar, AvatarImage } from "./nativewindui/Avatar";

import { Text } from "@/components/nativewindui/Text";
import { useUserColor } from "@/lib/hooks/useUserColor";
import { Chat, ChatType, Message } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

function MessageItem({
  item,
  chatType,
  participants,
}: {
  item: Message;
  chatType?: ChatType;
  participants?: Chat["participants"];
}) {
  const { user } = useUser();

  const isMine = item.userId === user?.id;
  const sender = participants && participants[item.userId];

  const { getColor } = useUserColor();

  return (
    <View
      className={cn(
        "flex gap-1 w-fit max-w-xs",
        isMine ? "self-end items-end" : "self-start items-start",
        !item.showTime && "-mb-3",
      )}
    >
      <View className="flex-row gap-2 items-end">
        {sender &&
          (item.showTime ? (
            <Avatar
              alt={`${sender.username} profile image`}
              className="h-8 w-8"
            >
              <AvatarImage source={{ uri: sender.imageUrl }} />
            </Avatar>
          ) : (
            <View className="w-8" />
          ))}
        <View
          className={cn(
            "p-2 bg-card rounded-xl w-fit max-w-xs",
            isMine && "bg-primary",
            isMine && item.showTime && "rounded-br-none",
            !isMine && item.showTime && "rounded-bl-none",
          )}
        >
          {sender && (
            <Text className={cn("font-semibold", getColor(sender.id))}>
              {sender.username}
            </Text>
          )}
          <Text className={cn("text-card-foreground", isMine && "text-white")}>
            {item.content}
          </Text>
        </View>
      </View>
      {item.showTime && (
        <Text
          variant="subhead"
          color="tertiary"
          className={cn(!isMine && sender && "ml-10")}
        >
          {formatDate(item.createdAt)}
        </Text>
      )}
    </View>
  );
}

export default MessageItem;
