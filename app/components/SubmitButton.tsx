import { ActivityIndicator, Button } from "react-native";

function SubmitButton({
  loading = false,
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
