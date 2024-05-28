import { useOAuth } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import { useState } from "react";

import Button from "./Button";

import { useWarmUpBrowser } from "@/lib/hooks/useWarmUpBrowser";

WebBrowser.maybeCompleteAuthSession();

function SignInWithOAuth() {
  useWarmUpBrowser();

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
    <Button
      variant="flat"
      iconLeft="logo-google"
      onPress={onPress}
      loading={loading}
      disabled={loading}
    >
      Sign in with Google
    </Button>
  );
}

export default SignInWithOAuth;
