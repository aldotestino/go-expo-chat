import { Stack } from "expo-router";

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
          title: "Profile",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
}

export default Layout;
