import { useNavigation } from "expo-router";
import React from "react";
import { Button, TextInput } from "react-native";

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
    try {
      await onSubmit();
    } finally {
      inputRef.current?.blur();
      setIsShown(false);
    }
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
  }, [navigation, isShown, handleOnSave, handleOnCancel]);

  return { isShown, show, inputRef };
}
