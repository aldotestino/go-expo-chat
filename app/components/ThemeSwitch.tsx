import { Switch } from "react-native";

import { useColorScheme } from "@/lib/useColorScheme";

function ThemeSwitch() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return <Switch value={colorScheme === "dark"} onChange={toggleColorScheme} />;
}

export default ThemeSwitch;
