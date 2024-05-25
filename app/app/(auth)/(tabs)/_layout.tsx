import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";

function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chat",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="chatbubbles" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          unmountOnBlur: true,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
          headerShown: false,
        }}
      />
    </Tabs>
  );
}

export default Layout;
