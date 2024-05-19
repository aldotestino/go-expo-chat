import { Icon } from "@roninoss/icons";
import { Link } from "expo-router";
import { Pressable, View } from "react-native";

import { cn } from "@/lib/cn";
import { useColorScheme } from "@/lib/useColorScheme";

function NewChatButton() {
  const { colors } = useColorScheme();
  return (
    <Link href="/chat/modal" asChild>
      <Pressable className="opacity-80">
        {({ pressed }) => (
          <View className={cn(pressed ? "opacity-50" : "opacity-90")}>
            <Icon name="plus" color={colors.primary} />
          </View>
        )}
      </Pressable>
    </Link>
  );
}

export default NewChatButton;
