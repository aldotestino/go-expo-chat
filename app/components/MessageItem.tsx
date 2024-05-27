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
        "flex gap-1 w-fit max-w-xs",
        isMine ? "self-end items-end" : "self-start items-start",
        !item.showTime && "-mb-2",
      )}
    >
      <View
        className={cn(
          "p-2 bg-card rounded-xl w-fit max-w-xs",
          isMine ? "bg-primary rounded-xl rounded-br-none" : "rounded-bl-none",
        )}
      >
        <Text className={cn("text-card-foreground", isMine && "text-white")}>
          {item.content}
        </Text>
      </View>
      {item.showTime && (
        <Text variant="subhead" color="tertiary">
          {formatDate(item.createdAt)}
        </Text>
      )}
    </View>
  );
}

export default MessageItem;
