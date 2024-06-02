import React from "react";
import { View, Text, ActivityIndicator } from "react-native";

const LoadingChatHeaderTitle = () => {
  return (
    <View className="flex flex-row gap-4 items-center">
      <ActivityIndicator />
      <Text>Loading...</Text>
    </View>
  );
};

export default LoadingChatHeaderTitle;
