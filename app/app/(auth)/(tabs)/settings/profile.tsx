import { useUser } from "@clerk/clerk-expo";
import { useState } from "react";
import {
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import UpdateProfileImage from "@/components/UpdateProfileImage";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { useHeaderSubmit } from "@/lib/useHeaderSubmit";

function Profile() {
  const { user } = useUser();

  const [username, setUsername] = useState(user?.username || "");

  const { show, inputRef } = useHeaderSubmit({
    onSubmit: onUpdate,
    onCancel: () => setUsername(user?.username || ""),
  });

  async function onUpdate() {
    if (username === user?.username) return;
    try {
      await user?.update({
        username,
      });
    } catch (err: any) {
      setUsername(user?.username || "");
      alert(err.errors[0].message);
    }
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          className="flex w-full px-4 pt-4 gap-4 items-center"
        >
          <View className="w-full flex gap-4 p-4 rounded-xl bg-card text-card-foreground border border-muted/40">
            <View className="flex flex-row gap-4">
              <View className="flex items-center gap-1">
                <Avatar alt="your profile image" className="w-14 h-14">
                  <AvatarImage source={{ uri: user?.imageUrl }} />
                  <AvatarFallback>
                    <Text>{user?.username![0]}</Text>
                  </AvatarFallback>
                </Avatar>
                <UpdateProfileImage />
              </View>
              <Text variant="subhead" className="flex-1">
                Insert your name and (optional) a profile image
              </Text>
            </View>
            <TextInput
              onFocus={show}
              ref={inputRef}
              className="border-y border-muted/40 py-2 h-10 text-card-foreground"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Profile;
