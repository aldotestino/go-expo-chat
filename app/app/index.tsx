import React from "react";
import { SafeAreaView } from "react-native";

import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";

const index = () => {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default index;
