import { useLocalSearchParams } from "expo-router";
import { ScrollView, View } from "react-native";

import Separator from "@/components/Separator";
import { Avatar, AvatarImage } from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";

function ChatInfo() {
  const { username, imageUrl, email, firstName, lastName, chatId } =
    useLocalSearchParams<{
      chatId: string;
      username: string;
      imageUrl: string;
      email: string;
      firstName?: string;
      lastName?: string;
    }>();

  return (
    <ScrollView>
      <View className="items-center pt-10 px-4 gap-4">
        <Avatar alt={`${username} profile image`} className="w-24 h-24">
          <AvatarImage source={{ uri: imageUrl }} />
        </Avatar>
        <View className="items-center">
          <Text className="font-bold" variant="title1">
            {username}
          </Text>
          <Text color="tertiary">{email}</Text>
        </View>
        {(firstName || lastName) && (
          <View className="self-start w-full bg-card p-4 rounded-xl border border-muted/40">
            {firstName && (
              <View className="flex-row h-8 items-end gap-4">
                <Text variant="body" color="tertiary">
                  Firstname:
                </Text>
                <Text variant="title3">{firstName}</Text>
              </View>
            )}
            {firstName && lastName && <Separator className="py-1" />}
            {lastName && (
              <View className="flex-row h-8 items-end gap-4">
                <Text variant="body" color="tertiary">
                  Lastname:
                </Text>
                <Text variant="title3">{lastName}</Text>
              </View>
            )}
          </View>
        )}
        {/* <Button variant="destructive" iconLeft="trash">
          Delete Chat
        </Button> */}
      </View>
    </ScrollView>
  );
}

export default ChatInfo;
