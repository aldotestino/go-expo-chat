import { Tabs } from "expo-router";

function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="chat"
        options={{
          tabBarLabel: "Chat",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Profile",
        }}
      />
    </Tabs>
  );
}

export default Layout;
