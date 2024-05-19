import { Button } from "react-native";

import { ActivityIndicator } from "@/components/nativewindui/ActivityIndicator";

function SubmitButton({
  loading,
  ...props
}: React.ComponentProps<typeof Button> & {
  loading?: boolean;
}) {
  if (loading) {
    return <ActivityIndicator />;
  }

  return <Button {...props} />;
}

export default SubmitButton;
