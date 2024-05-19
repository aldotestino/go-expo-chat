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
          headerTransparent: true,
          headerBlurEffect: "regular",
          headerRight: () => <NewChatButton />,
        }}
      />
      <Stack.Screen
        name="modal"
        options={{
          presentation: "modal",
          animation: "fade_from_bottom", // for android
          title: "New Chat",
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
}

export default Layout;
