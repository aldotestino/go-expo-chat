import { useOAuth } from "@clerk/clerk-expo";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";
import { ActivityIndicator, Pressable, View } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/hooks/useColorScheme";
import { useWarmUpBrowser } from "@/lib/hooks/useWarmUpBrowser";
import { cn } from "@/lib/utils";

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
            pressed && "opacity-50",
          )}
        >
          {!loading ? (
            <Ionicons name="logo-google" size={24} color={colors.foreground} />
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
