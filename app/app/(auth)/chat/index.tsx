import { SafeAreaView } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { useHeaderSearchBar } from "@/lib/useHeaderSearchBar";

function Chat() {
  const searchValue = useHeaderSearchBar();

  return (
    <SafeAreaView>
      <Text>Chat</Text>
    </SafeAreaView>
  );
}

export default Chat;
