import React from "react";
import { TextInput, View } from "react-native";

import { Text } from "@/components/nativewindui/Text";

function PressableLink({
  label,
  children,
  ...props
}: React.PropsWithChildren<
  React.ComponentProps<typeof TextInput> & {
    label: string;
  }
>) {
  return (
    <View className="flex gap-2">
      <View className="flex flex-row justify-between items-center">
        <Text>{label}</Text>
        {children}
      </View>
      <TextInput
        {...props}
        autoCapitalize="none"
        className="border border-transparent bg-gray-200 dark:bg-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-200 dark:text-white h-10 px-3 py-2 rounded-md focus:border focus:border-primary"
      />
    </View>
  );
}

export default PressableLink;
