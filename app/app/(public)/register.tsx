import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { SafeAreaView, View, TextInput, Button, Pressable } from "react-native";

import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";
import { Text } from "@/components/nativewindui/Text";

function Register() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSignUp() {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        username,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

  async function onVerify() {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
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
            Register
          </Text>
          <Text variant="subhead" color="tertiary" className="text-center">
            Create a new account to get started.
          </Text>
        </View>

        <View className="flex gap-4">
          {!pendingVerification ? (
            <>
              <View className="flex gap-2">
                <Text>Email</Text>
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  autoCapitalize="none"
                  placeholder="john.doe@mail.com"
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              <View className="flex gap-2">
                <Text>Username</Text>
                <TextInput
                  value={username}
                  onChangeText={setUsername}
                  autoCapitalize="none"
                  placeholder="johndoe"
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              <View className="flex gap-2">
                <Text>Password</Text>
                <TextInput
                  value={password}
                  onChangeText={setPassword}
                  placeholder="****"
                  secureTextEntry
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              {!loading ? (
                <Button onPress={onSignUp} title="Sign Up" />
              ) : (
                <ActivityIndicator />
              )}
            </>
          ) : (
            <>
              <View className="flex gap-2">
                <Text>Verification Code</Text>
                <TextInput
                  value={code}
                  onChangeText={setCode}
                  placeholder="123456"
                  className="bg-gray-200 placeholder:text-gray-500 h-10 px-3 py-2 rounded-md"
                />
              </View>
              {!loading ? (
                <Button onPress={onVerify} title="Verify" />
              ) : (
                <ActivityIndicator />
              )}
            </>
          )}
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
