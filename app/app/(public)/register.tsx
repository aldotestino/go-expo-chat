import { Link } from "expo-router";
import { SafeAreaView, View, TextInput, Button, Pressable } from "react-native";

import { Text } from "@/components/nativewindui/Text";

function Register() {
  return (
    <SafeAreaView className="flex-1 flex items-center justify-center">
      <View className="flex w-full px-4 gap-6">
        <View className="flex items-center">
          <Text variant="title1" className="font-bold">
            Register
          </Text>
          <Text variant="subhead" color="tertiary" className="text-center">
            Create a new account to get started.
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
            <Text>Password</Text>
            <TextInput
              placeholder="****"
              secureTextEntry
              className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
            />
          </View>
          <Button title="Sign Up" />
        </View>
        <Text variant="subhead" color="tertiary" className="text-center">
          Already have an account?{" "}
          <Link href="/login" asChild>
            <Pressable>
              <Text
                variant="subhead"
                color="tertiary"
                className="underline text-indigo-500"
              >
                Sign in
              </Text>
            </Pressable>
          </Link>
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default Register;
