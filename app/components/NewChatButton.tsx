import Ionicons from "@expo/vector-icons/Ionicons";
import { Link } from "expo-router";
import { TouchableOpacity, View } from "react-native";

import { useColorScheme } from "@/lib/hooks/useColorScheme";

function NewChatButton() {
  const { colors } = useColorScheme();
  return (
    <Link href="/chats/new" asChild>
      <TouchableOpacity>
        <View>
          <Ionicons name="add-circle" size={32} color={colors.primary} />
        </View>
      </TouchableOpacity>
    </Link>
  );
}

export default NewChatButton;
