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
          headerTransparent: true,
          headerBlurEffect: "systemMaterial",
          headerRight: () => <NewChatButton />,
        }}
      />
      <Stack.Screen
        name="new"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom", // for android
          title: "New Chat",
          headerTransparent: true,
          headerBlurEffect: "systemMaterial",
        }}
      />
    </Stack>
  );
}

export default ChatsLayout;