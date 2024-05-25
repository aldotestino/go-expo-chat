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
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="chat/[id]"
        options={{
          headerTransparent: true,
          headerBlurEffect: "systemMaterial",
        }}
      />
    </Stack>
  );
}

export default Layout;
