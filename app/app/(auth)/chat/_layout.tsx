import { Stack } from "expo-router";

import NewChatButton from "@/components/NewChatButton";

function Layout() {
  return (
    <Stack
      screenOptions={{
        animation: "ios",
      }}
    >
      <Stack.Screen
        name="index"
        options={{
          title: "Chat",
          headerLargeTitle: true,
          headerRight: () => <NewChatButton />,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom", // for android
          title: "New Chat",
        }}
      />
    </Stack>
  );
}

export default Layout;
