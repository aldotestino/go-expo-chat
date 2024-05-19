import { Stack } from "expo-router";
import React from "react";

function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="register"
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="reset"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}

export default Layout;
