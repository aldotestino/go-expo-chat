import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { SafeAreaView, View, TextInput, Button } from "react-native";

import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";
import { Text } from "@/components/nativewindui/Text";

function Reset() {
  const { isLoaded, signIn, setActive } = useSignIn();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function onRequestReset() {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setSuccessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

  async function onReset() {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      });
      await setActive({ session: result.createdSessionId });
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
            Reset Password
          </Text>
          <Text variant="subhead" color="tertiary" className="text-center">
            Enter your email to reset your password
          </Text>
        </View>

        <View className="flex gap-4">
          {!successfulCreation ? (
            <>
              <View className="flex gap-2">
                <Text>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  placeholder="johndoe"
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              {!loading ? (
                <Button onPress={onRequestReset} title="Reset Password" />
              ) : (
                <ActivityIndicator />
              )}
            </>
          ) : (
            <>
              <View className="flex gap-2">
                <Text>Code</Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="123456"
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              <View className="flex gap-2">
                <Text>New Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="****"
                  secureTextEntry
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              {!loading ? (
                <Button onPress={onReset} title="Set new Password" />
              ) : (
                <ActivityIndicator />
              )}
            </>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

export default Reset;
