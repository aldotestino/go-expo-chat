import { Link } from "expo-router";
import { SafeAreaView, View, TextInput, Button, Pressable } from "react-native";

import { Text } from "@/components/nativewindui/Text";

function Login() {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
      <View className="flex w-full px-4 gap-6">
        <View className="flex items-center">
          <Text variant="title1" className="font-bold">
            Welcome back
          </Text>
          <Text variant="subhead" color="tertiary" className="text-center">
            Sign in to your account to continue or{" "}
            <Link href="/register" asChild>
              <Pressable>
                <Text
                  variant="subhead"
                  color="tertiary"
                  className="underline text-indigo-500"
                >
                  Create an account
                </Text>
              </Pressable>
            </Link>
          </Text>
        </View>

        <View className="flex gap-4">
          <View className="flex gap-2">
            <Text>Username or Email</Text>
            <TextInput
              autoCapitalize="none"
              placeholder="johndoe"
              className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
            />
          </View>
          <View className="flex gap-2">
            <View className="flex flex-row justify-between items-center">
              <Text>Password</Text>
              <Link href="/reset" asChild>
                <Pressable>
                  <Text variant="subhead" className="underline text-indigo-500">
                    Forgot password?
                  </Text>
                </Pressable>
              </Link>
            </View>
            <TextInput
              placeholder="****"
              secureTextEntry
              className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
            />
          </View>
          <Button title="Sign In" />
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
