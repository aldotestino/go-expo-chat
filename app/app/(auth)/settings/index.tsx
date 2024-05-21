import { useAuth, useUser } from "@clerk/clerk-expo";
import { Icon } from "@roninoss/icons";
import { Link } from "expo-router";
import React from "react";
import { View, SafeAreaView, Pressable, Switch } from "react-native";

import SubmitButton from "@/components/SubmitButton";
import ThemeSwitch from "@/components/ThemeSwitch";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { cn } from "@/lib/cn";
import { useColorScheme } from "@/lib/useColorScheme";

function Settings() {
  const { colors, colorScheme, setColorScheme } = useColorScheme();
  const { user } = useUser();
  const { signOut } = useAuth();

  const [signOutLoading, setSignOutLoading] = React.useState(false);

  async function onSignOut() {
    setSignOutLoading(true);
    await signOut();
    setSignOutLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 flex items-center">
      <View className="flex w-full px-4 gap-4 pt-4 items-center">
        <Link href="/settings/profile" asChild>
          <Pressable className="w-full">
            {({ pressed }) => (
              <View
                className={cn(
                  "border border-muted/40 w-full flex flex-row justify-between items-center p-4 rounded-xl bg-card text-card-foreground",
                  pressed && "opacity-80",
                )}
              >
                <View className="flex flex-row items-center gap-4">
                  <Avatar alt="your profile image" className="w-10 h-10">
                    <AvatarImage source={{ uri: user?.imageUrl }} />
                    <AvatarFallback>
                      <Text>{user?.username![0]}</Text>
                    </AvatarFallback>
                  </Avatar>
                  <Text variant="title3">{user?.username}</Text>
                </View>
                <Icon name="chevron-right" size={24} color={colors.grey} />
              </View>
            )}
          </Pressable>
        </Link>
        <View className="border border-muted/40 w-full flex flex-row justify-between items-center p-4 rounded-xl bg-card text-card-foreground">
          <Text variant="body">Dark mode</Text>
          <ThemeSwitch />
        </View>
        <SubmitButton
          title="Sign Out"
          onPress={onSignOut}
          loading={signOutLoading}
          color={colors.destructive}
        />
      </View>
    </SafeAreaView>
  );
}

export default Settings;
