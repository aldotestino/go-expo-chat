import { Stack } from "expo-router";

function Layout() {
  return (
    <Stack
      screenOptions={{
        headerBackTitleVisible: false,
        headerTransparent: true,
        headerBlurEffect: "systemMaterial",
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="chat/[id]" />
    </Stack>
  );
}

export default Layout;
