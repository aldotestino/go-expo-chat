import React from "react";
import { TextInput } from "react-native";

import { cn } from "@/lib/utils";

const Input = (props: React.ComponentProps<typeof TextInput>) => {
  return (
    <TextInput
      {...props}
      autoCorrect={false}
      autoCapitalize="none"
      className={cn(
        "border border-muted/40 bg-card text-card-foreground h-10 px-3 py-2 rounded-lg focus:border-primary",
        props.className,
      )}
    />
  );
};

export default Input;
