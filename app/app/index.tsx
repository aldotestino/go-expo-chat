import { SafeAreaView } from "react-native";

import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";

function Index() {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
}

export default Index;
