import { useLocalSearchParams, useNavigation } from "expo-router";
import { useLayoutEffect } from "react";
import { SafeAreaView } from "react-native";

import { Text } from "@/components/nativewindui/Text";

function Chat() {
  const navigation = useNavigation();
  const local = useLocalSearchParams<{ id: string }>();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: `${local.id}`,
    });
  });

  return (
    <SafeAreaView>
      <Text className="text-center pt-4">Chat with {local.id}</Text>
    </SafeAreaView>
  );
}

export default Chat;
