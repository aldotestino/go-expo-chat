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
        className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
      />
    </View>
  );
}

export default PressableLink;
