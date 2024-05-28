import { useUser } from "@clerk/clerk-expo";
import { useActionSheet } from "@expo/react-native-action-sheet";
import * as ImagePicker from "expo-image-picker";

import Button from "./Button";

function UpdateProfileImage() {
  const { user } = useUser();
  const { showActionSheetWithOptions } = useActionSheet();

  function onOpenActions() {
    showActionSheetWithOptions(
      {
        options: ["Delete", "Take Photo", "Choose from Library", "Cancel"],
        cancelButtonIndex: 3,
        destructiveButtonIndex: 0,
      },
      async (index) => {
        switch (index) {
          case 0:
            await deleteImage();
            break;
          case 1:
            await selectImage(false);
            break;
          case 2:
            await selectImage(true);
            break;
        }
      },
    );
  }

  async function deleteImage() {
    await user?.setProfileImage({
      file: null,
    });
  }

  async function selectImage(useLibrary: boolean) {
    const options: ImagePicker.ImagePickerOptions = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.1,
      base64: true,
    };

    let result: ImagePicker.ImagePickerResult;

    if (useLibrary) {
      result = await ImagePicker.launchImageLibraryAsync(options);
    } else {
      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync(options);
    }

    if (!result.canceled && result.assets[0].base64) {
      const base64 = result.assets[0].base64;
      const mimeType = result.assets[0].mimeType;

      const image = `data:${mimeType};base64,${base64}`;

      try {
        await user?.setProfileImage({
          file: image,
        });
      } catch (err: any) {
        alert(err.errors[0].message);
      }
    }
  }

  return (
    <Button variant="link" className="w-fit p-0" onPress={onOpenActions}>
      Update
    </Button>
  );
}

export default UpdateProfileImage;
