import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View, TextInput, Button, Pressable } from "react-native";

import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";
import { Text } from "@/components/nativewindui/Text";

function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSignIn() {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: username,
        password,
      });

      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

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
              value={username}
              onChangeText={setUsername}
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
              value={password}
              onChangeText={setPassword}
              placeholder="****"
              secureTextEntry
              className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
            />
          </View>
          {!loading ? (
            <Button onPress={onSignIn} title="Sign In" />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Login;
