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
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, color }) => (
            <Icon name="person" color={focused ? colors.primary : color} />
          ),
        }}
      />
    </Tabs>
  );
}

export default Layout;
