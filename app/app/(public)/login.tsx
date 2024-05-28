import { useSignIn } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
import SignInWithOAuth from "@/components/SignInWithOAuth";
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
    <KeyboardAvoidingView
      className="flex-1 justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex px-4 gap-6">
        <View className="flex items-center px-12">
          <Text variant="title1" className="font-bold">
            Welcome back
          </Text>
          <Text variant="subhead" color="tertiary" className="text-center">
            Sign in to your account to continue or{" "}
            <Link href="/register" className="underline text-primary">
              create an account
            </Link>
          </Text>
        </View>

        <View className="flex gap-4">
          <InputField
            textContentType="username"
            label="Username or Email"
            placeholder="johndoe"
            value={identifier}
            onChangeText={setIdentifier}
          />
          <InputField
            textContentType="password"
            label="Password"
            placeholder="****"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          >
            <Link href="/reset" className="underline text-primary">
              Forgot password?
            </Link>
          </InputField>
          <Button onPress={onSignIn} loading={loading} disabled={loading}>
            Sign In
          </Button>
          <View className="flex flex-row gap-2 items-center w-full">
            <View className="border border-muted/40 flex-1" />
            <Text variant="subhead" color="tertiary" className="text-center">
              or
            </Text>
            <View className="border border-muted/40 flex-1" />
          </View>
          <SignInWithOAuth />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Login;
