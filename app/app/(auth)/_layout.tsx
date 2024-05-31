import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Chat",
          headerShown: false,
        }}
      />
      <Stack.Screen name="chat/[id]" />
      <Stack.Screen
        name="chat/info"
        options={{
          title: "Chat Info",
        }}
      />
    </Stack>
  );
}

export default Layout;
