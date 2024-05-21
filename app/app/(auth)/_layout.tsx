import { Icon } from "@roninoss/icons";
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
            <Icon name="message" color={focused ? colors.primary : color} />
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
            <Icon name="cog" color={focused ? colors.primary : color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default Layout;
