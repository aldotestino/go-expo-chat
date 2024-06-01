import { Stack } from "expo-router";
import React from "react";

const NewLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "New Chat",
        }}
      />
      <Stack.Screen
        name="group"
        options={{
          title: "New Group",
          headerBackTitle: "Cancel",
        }}
      />
    </Stack>
  );
};

export default NewLayout;
