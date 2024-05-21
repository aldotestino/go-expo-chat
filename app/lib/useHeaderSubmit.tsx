import { useNavigation } from "expo-router";
import React from "react";
import { Button } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export function useHeaderSubmit({
  onSubmit,
  onCancel,
}: {
  onSubmit: () => Promise<void>;
  onCancel: () => void;
}) {
  const navigation = useNavigation();

  const [isShown, setIsShown] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);

  const show = () => setIsShown(true);

  const handleOnSave = async () => {
    await onSubmit();
    inputRef.current?.blur();
    setIsShown(false);
  };

  const handleOnCancel = () => {
    inputRef.current?.blur();
    setIsShown(false);
    onCancel();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: isShown
        ? () => <Button title="Save" onPress={handleOnSave} />
        : null,
      headerLeft: isShown
        ? () => <Button title="Cancel" onPress={handleOnCancel} />
        : null,
    });
  }, [navigation, isShown, onSubmit, onCancel]);

  return { isShown, show, inputRef };
}
