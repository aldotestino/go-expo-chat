import { useSignIn } from "@clerk/clerk-expo";
import { useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";

import Button from "@/components/Button";
import InputField from "@/components/InputField";
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
    <KeyboardAvoidingView
      className="flex-1 justify-center"
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View className="flex px-4 gap-6">
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
              <InputField
                textContentType="emailAddress"
                label="Email"
                placeholder="john.doe@mail.test"
                value={email}
                onChangeText={setEmail}
              />
              <Button
                onPress={onRequestReset}
                loading={loading}
                disabled={loading}
              >
                Reset Password
              </Button>
            </>
          ) : (
            <>
              <InputField
                textContentType="oneTimeCode"
                label="Code"
                placeholder="123456"
                value={code}
                onChangeText={setCode}
              />
              <InputField
                textContentType="newPassword"
                label="New Password"
                placeholder="****"
                value={password}
                onChangeText={setPassword}
              />
              <Button onPress={onReset} loading={loading} disabled={loading}>
                Set new Password
              </Button>
            </>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default Reset;
