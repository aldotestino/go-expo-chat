import { useNavigation } from "expo-router";
import * as React from "react";
import { SearchBarProps } from "react-native-screens";

export function useHeaderSearchBar(props: SearchBarProps = {}) {
  const navigation = useNavigation();
  const [search, setSearch] = React.useState("");

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerSearchBarOptions: {
        placeholder: "Search...",
        hideWhenScrolling: false,
        onChangeText(ev) {
          setSearch(ev.nativeEvent.text);
        },
        ...props,
      } satisfies SearchBarProps,
    });
  }, [navigation]);

  return search;
}
