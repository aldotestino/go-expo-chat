import { useNavigation } from "expo-router";
import React from "react";
import { Button, TextInput } from "react-native";

import { useColorScheme } from "@/lib/hooks/useColorScheme";

export function useHeaderSubmit({
  onSubmit,
  onCancel,
  submitButtonTitle = "Save",
  cancelButtonTitle = "Cancel",
}: {
  onSubmit: () => Promise<void>;
  onCancel: () => void;
  submitButtonTitle?: string;
  cancelButtonTitle?: string;
}) {
  const navigation = useNavigation();

  const { colors } = useColorScheme();
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
        ? () => <Button title={submitButtonTitle} onPress={handleOnSave} />
        : null,
      headerLeft: isShown
        ? () => (
            <Button
              title={cancelButtonTitle}
              color={colors.destructive}
              onPress={handleOnCancel}
            />
          )
        : null,
    });
  }, [navigation, isShown, handleOnSave, handleOnCancel]);

  return { isShown, show, inputRef };
}
