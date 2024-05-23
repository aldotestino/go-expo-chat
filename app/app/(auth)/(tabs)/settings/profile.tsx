import { useUser } from "@clerk/clerk-expo";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  View,
  TextInput,
  ScrollView,
} from "react-native";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { useHeaderSubmit } from "@/lib/useHeaderSubmit";
import { cn } from "@/lib/utils";

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

  async function onPickImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
        quality: 0.1,
        base64: true,
      });

      if (!result.canceled && result.assets[0].base64) {
        const base64 = result.assets[0].base64;
        const mimeType = result.assets[0].mimeType;

        const image = `data:${mimeType};base64,${base64}`;

        await user?.setProfileImage({
          file: image,
        });
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  }

  return (
    <ScrollView contentInsetAdjustmentBehavior="automatic">
      <SafeAreaView>
        <View className="flex w-full px-4 pt-4 gap-4 items-center">
          <View className="w-full flex gap-4 p-4 rounded-xl bg-card text-card-foreground border border-muted/40">
            <View className="flex flex-row gap-4">
              <View className="flex items-center gap-1">
                <Avatar alt="your profile image" className="w-14 h-14">
                  <AvatarImage source={{ uri: user?.imageUrl }} />
                  <AvatarFallback>
                    <Text>{user?.username![0]}</Text>
                  </AvatarFallback>
                </Avatar>
                <Pressable onPress={onPickImage}>
                  {({ pressed }) => (
                    <Text
                      className={cn("text-primary", pressed && "opacity-50")}
                    >
                      Update
                    </Text>
                  )}
                </Pressable>
              </View>
              <Text variant="subhead" className="flex-1">
                Insert your name and (optional) a profile image
              </Text>
            </View>
            <TextInput
              onFocus={show}
              ref={inputRef}
              className="border-y border-muted/40 py-2 h-10C placeholder:text-gray-500 dark:placeholder:text-gray-200 dark:text-white"
              placeholder="Username"
              autoCapitalize="none"
              autoCorrect={false}
              value={username}
              onChangeText={setUsername}
            />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default Profile;
