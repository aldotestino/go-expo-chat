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
          headerBlurEffect: "systemMaterial",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          title: "Profile",
          headerTransparent: true,
          headerBlurEffect: "systemMaterial",
        }}
      />
    </Stack>
  );
}

export default SettingsLayout;
