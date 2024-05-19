import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { cn } from "@/lib/cn";

function PressableLink({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  return (
    <Link {...props} asChild>
      <Pressable>
        {({ pressed }) => (
          <Text
            variant="subhead"
            color="tertiary"
            className={cn("underline text-primary", pressed && "opacity-80")}
          >
            {children}
          </Text>
        )}
      </Pressable>
    </Link>
  );
}

export default PressableLink;
