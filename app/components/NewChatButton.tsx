import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { useColorScheme } from "@/lib/useColorScheme";
import { cn } from "@/lib/utils";

function NewChatButton() {
  const { colors } = useColorScheme();
  return (
    <Link href="/chat/new" asChild>
      <Pressable>
        {({ pressed }) => (
          <View className={cn(pressed && "opacity-50")}>
            <Ionicons name="add-circle" size={32} color={colors.primary} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export default NewChatButton;
