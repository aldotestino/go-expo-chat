import { Stack } from "expo-router";

function SettingsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Settings",
          headerLargeTitle: true,
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTransparent: true,
          headerBlurEffect: "regular",
        }}
      />
    </Stack>
  );
}

export default SettingsLayout;
