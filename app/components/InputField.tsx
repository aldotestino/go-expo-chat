import React from "react";
import { TextInput, View } from "react-native";

import Input from "./Input";

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
      <Input {...props} />
    </View>
  );
}

export default InputField;
