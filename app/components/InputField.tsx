import React from "react";
import { TextInput, View } from "react-native";

import { Text } from "@/components/nativewindui/Text";

function InputField({
  label,
  children,
  ...props
}: React.PropsWithChildren<
  React.ComponentProps<typeof TextInput> & {
    label?: string;
  }
>) {
  return (
    <View className="flex gap-2 w-full">
      <View className="flex flex-row justify-between items-center">
        <Text>{label}</Text>
        {children}
      </View>
      <TextInput
        {...props}
        autoCorrect={false}
        autoCapitalize="none"
        className="border border-muted/40 bg-card text-card-foreground h-10 px-3 py-2 rounded-lg focus:border-primary"
      />
    </View>
  );
}

export default InputField;
