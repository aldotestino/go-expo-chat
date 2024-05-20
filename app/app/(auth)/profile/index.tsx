import { useAuth, useUser } from "@clerk/clerk-expo";
import { useEffect, useState } from "react";
import { Pressable, SafeAreaView, View } from "react-native";

import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { cn } from "@/lib/cn";
import { useColorScheme } from "@/lib/useColorScheme";

function Profile() {
  const { colors } = useColorScheme();
  const { user } = useUser();
  const { signOut } = useAuth();

  const [updateLoading, setUpdateLoading] = useState(false);
  const [signOutLoading, setSignOutLoading] = useState(false);
  const [username, setUsername] = useState(user?.username || "");

  async function onSignOut() {
    setSignOutLoading(true);
    await signOut();
    setSignOutLoading(false);
  }

  async function onUpdate() {
    setUpdateLoading(true);
    try {
      await user?.update({
        username,
      });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setUpdateLoading(false);
    }
  }

  return (
    <SafeAreaView className="flex-1 flex items-center">
      <View className="flex w-full px-4 pt-12 gap-6 items-center">
        <Avatar alt="your profile image" className="w-20 h-20">
          <AvatarImage source={{ uri: user?.imageUrl }} />
          <AvatarFallback>
            <Text>{user?.username![0]}</Text>
          </AvatarFallback>
        </Avatar>
        <InputField
          autoCapitalize="sentences"
          value={username}
          onChangeText={setUsername}
          className="w-full"
          label="Username"
        >
          <Pressable onPress={() => setUsername(user?.username || "")}>
            {({ pressed }) => (
              <Text className={cn("text-primary", pressed && "opacity-80")}>
                Reset
              </Text>
            )}
          </Pressable>
        </InputField>
        <SubmitButton
          title="Update"
          onPress={onUpdate}
          loading={updateLoading}
        />
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

export default Profile;
