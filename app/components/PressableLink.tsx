import { Link } from "expo-router";
import React from "react";
import { Pressable } from "react-native";

import { Text } from "@/components/nativewindui/Text";

function PressableLink({
  children,
  ...props
}: React.PropsWithChildren<React.ComponentProps<typeof Link>>) {
  return (
    <Link {...props} asChild>
      <Pressable>
        <Text
          variant="subhead"
          color="tertiary"
          className="underline text-primary"
        >
          {children}
        </Text>
      </Pressable>
    </Link>
  );
}

export default PressableLink;
