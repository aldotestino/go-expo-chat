import { SafeAreaView } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { useHeaderSearchBar } from "@/lib/useHeaderSearchBar";

export default function ModalScreen() {
  const searchValue = useHeaderSearchBar();

  return (
    <SafeAreaView>
      <Text>{searchValue}</Text>
    </SafeAreaView>
  );
}
