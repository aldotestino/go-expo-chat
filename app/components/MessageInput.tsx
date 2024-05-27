import Ionicons from "@expo/vector-icons/Ionicons";
import { useState } from "react";
import { Pressable, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { cn } from "@/lib/utils";

function MessageInput({
  username,
  onSubmit,
}: {
  username?: string;
  onSubmit: ({ content }: { content: string }) => Promise<void>;
}) {
  const { colors } = useColorScheme();
  const insets = useSafeAreaInsets();
  const [input, setInput] = useState("");

  function handleSubmit() {
    if (input.trim() === "") {
      return;
    }

    onSubmit({ content: input });

    setInput("");
  }

  return (
    <View className="bg-card">
      <View
        className="px-4 py-2 flex flex-row items-center gap-4"
        style={{ marginBottom: insets.bottom }}
      >
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder={`Message ${username}`}
          className="py-2 px-3 h-10 border border-muted/40 text-card-foreground rounded-lg flex-1 focus:border-primary"
        />
        <Pressable onPress={handleSubmit} disabled={input.trim() === ""}>
          {({ pressed }) => (
            <Ionicons
              name="arrow-forward-circle"
              color={colors.primary}
              size={40}
              className={cn(pressed || (input.trim() === "" && "opacity-50"))}
            />
          )}
        </Pressable>
      </View>
    </View>
  );
}

export default MessageInput;
