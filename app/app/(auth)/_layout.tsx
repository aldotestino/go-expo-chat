import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

import { useColorScheme } from "@/lib/useColorScheme";

function Layout() {
  const { colors } = useColorScheme();

  return (
    <Tabs>
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="chatbubbles"
              size={32}
              color={focused ? colors.primary : color}
            />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          unmountOnBlur: true,
          title: "Settings",
          tabBarIcon: ({ focused, color }) => (
            <Ionicons
              name="cog"
              size={32}
              color={focused ? colors.primary : color}
            />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default Layout;
