import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { View } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/useColorScheme";

function EmptyChat() {
  const { colors } = useColorScheme();

  return (
    <View className="flex-1 items-center justify-center gap-1 px-4 pt-10">
      <Ionicons name="file-tray" size={42} color={colors.grey} />
      <Text variant="title3" className="text-center font-semibold">
        Chat is empty
      </Text>
      <Text color="tertiary" variant="subhead" className="text-center max-w-60">
        Start a{" "}
        <Link href="/chats/new" className="underline text-primary">
          new chat
        </Link>{" "}
        to begin your conversations.
      </Text>
    </View>
  );
}

export default EmptyChat;
