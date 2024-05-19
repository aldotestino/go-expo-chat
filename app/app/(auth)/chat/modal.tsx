import { SafeAreaView } from "react-native";

import { Text } from "@/components/nativewindui/Text";
import { useDebounce } from "@/lib/useDebounce";
import { useHeaderSearchBar } from "@/lib/useHeaderSearchBar";

export default function ModalScreen() {
  const searchValue = useHeaderSearchBar({
    placeholder: "Search by username",
    autoCapitalize: "none",
  });

  const debouncedSearchValue = useDebounce(searchValue, 500);

  return (
    <SafeAreaView>
      <Text>{debouncedSearchValue}</Text>
    </SafeAreaView>
  );
}
