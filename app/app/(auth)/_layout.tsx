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
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
}

export default Layout;
