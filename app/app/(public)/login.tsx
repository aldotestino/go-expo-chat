import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { SafeAreaView, View, TextInput, Button } from "react-native";

import InputField from "@/components/InputField";
import PressableLink from "@/components/PressableLink";
import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";
import { Text } from "@/components/nativewindui/Text";

function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSignIn() {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier,
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
            <PressableLink href="/register">create an account</PressableLink>
          </Text>
        </View>

        <View className="flex gap-4">
          <InputField
            label="Username or Email"
            placeholder="johndoe"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <InputField
            label="Password"
            placeholder="****"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          >
            <PressableLink href="/reset">Forgot password?</PressableLink>
          </InputField>
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
