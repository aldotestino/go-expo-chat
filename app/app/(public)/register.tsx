import { useSignUp } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import InputField from "@/components/InputField";
import SubmitButton from "@/components/SubmitButton";
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
    <KeyboardAvoidingView
      className="flex-1 justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex px-4 gap-6">
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
              <InputField
                label="Email"
                placeholder="john.doe@gmail.com"
                value={email}
                onChangeText={setEmail}
              />
              <InputField
                label="Username"
                placeholder="johndoe"
                value={username}
                onChangeText={setUsername}
              />
              <InputField
                label="Password"
                placeholder="****"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
              <SubmitButton
                onPress={onSignUp}
                title="Sign Up"
                loading={loading}
              />
            </>
          ) : (
            <>
              <InputField
                textContentType="oneTimeCode"
                label="Verification Code"
                placeholder="123456"
                value={code}
                onChangeText={setCode}
              />
              <SubmitButton
                onPress={onVerify}
                title="Verify"
                loading={loading}
              />
            </>
          )}
        </View>
        {!pendingVerification && (
          <Text variant="subhead" color="tertiary" className="text-center">
            Already have an account?{" "}
            <Link href="/login" className="underline text-primary">
              Sign In
            </Link>
          </Text>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

export default Register;
