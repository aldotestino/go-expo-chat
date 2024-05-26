import { useUser } from "@clerk/clerk-expo";
import { View } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { Message } from "@/lib/types";
import { cn, formatDate } from "@/lib/utils";

function MessageItem({ item }: { item: Message }) {
  const { user } = useUser();

  const isMine = item.userId === user?.id;

  return (
    <View
      className={cn(
        "w-fit flex gap-1 max-w-xs",
        isMine && "self-end items-end",
      )}
    >
      <View
        className={cn(
          "p-2 bg-card rounded-xl",
          isMine ? "bg-primary rounded-xl rounded-br-none" : "rounded-bl-none",
        )}
      >
        <Text className={cn("text-card-foreground", isMine && "text-white")}>
          {item.content}
        </Text>
      </View>
      <Text variant="subhead" color="tertiary">
        {formatDate(item.createdAt)}
      </Text>
    </View>
  );
}

export default MessageItem;
