import { Stack } from "expo-router";

import NewChatButton from "@/components/NewChatButton";

function ChatsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Chat",
          headerLargeTitle: true,
          headerRight: () => <NewChatButton />,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom", // for android
          title: "New Chat",
        }}
      />
    </Stack>
  );
}

export default ChatsLayout;
