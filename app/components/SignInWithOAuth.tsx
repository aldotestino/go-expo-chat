import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

import GoogleIcon from "./GoogleIcon";

import { Text } from "@/components/nativewindui/Text";
import { cn } from "@/lib/cn";
import { useColorScheme } from "@/lib/useColorScheme";
import { useWarmUpBrowser } from "@/lib/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

function SignInWithOAuth() {
  useWarmUpBrowser();

  const { colors } = useColorScheme();
  const [loading, setLoading] = useState(false);
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  async function onPress() {
    try {
      const { createdSessionId, setActive, signUp } = await startOAuthFlow();

      setLoading(true);
      if (createdSessionId) {
        await setActive!({ session: createdSessionId });
      } else if (signUp?.emailAddress) {
        console.log(signUp.id);
        const completeSignUp = await signUp?.update({
          username: `user_${signUp.id?.slice(-5)}`,
        });
        console.log(completeSignUp);
        setActive!({ session: completeSignUp.createdSessionId });
      }
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Pressable onPress={onPress}>
      {({ pressed }) => (
        <View
          className={cn(
            "flex h-10 flex-row items-center justify-center gap-2 bg-card border border-muted/40 py-2 px-3 rounded-lg",
            pressed && "opacity-80",
          )}
        >
          {!loading ? (
            <GoogleIcon width={16} height={16} fill={colors.foreground} />
          ) : (
            <ActivityIndicator />
          )}
          <Text>Sign in with Google</Text>
        </View>
      )}
    </Pressable>
  );
}

export default SignInWithOAuth;
