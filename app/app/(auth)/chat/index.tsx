import { useHeaderHeight } from "@react-navigation/elements";
import { Icon } from "@roninoss/icons";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { cssInterop } from "nativewind";
import { View, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/nativewindui/Avatar";
import { Text } from "@/components/nativewindui/Text";
import { useColorScheme } from "@/lib/useColorScheme";
import { useHeaderSearchBar } from "@/lib/useHeaderSearchBar";

cssInterop(FlashList, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

function Index() {
  const searchValue = useHeaderSearchBar({
    hideWhenScrolling: true,
    placeholder: "Search",
  });

  const data = searchValue
    ? CHATS.filter((c) =>
        c.username.toLowerCase().includes(searchValue.toLowerCase()),
      )
    : CHATS;

  return (
    <FlashList
      contentInsetAdjustmentBehavior="automatic"
      keyboardShouldPersistTaps="handled"
      data={data}
      estimatedItemSize={20}
      contentContainerClassName="py-4 android:pb-12"
      extraData={searchValue}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={RenderItemSeparator}
      renderItem={RenderItem}
      ListEmptyComponent={CHATS.length === 0 ? ListEmptyComponent : undefined}
    />
  );
}

function ListEmptyComponent() {
  const insets = useSafeAreaInsets();
  const dimensions = useWindowDimensions();
  const headerHeight = useHeaderHeight();
  const { colors } = useColorScheme();
  const height = dimensions.height - headerHeight - insets.bottom - insets.top;

  return (
    <View
      style={{ height }}
      className="flex-1 items-center justify-center gap-1 px-12"
    >
      <Icon name="inbox" size={42} color={colors.grey} />
      <Text variant="title3" className="text-center font-semibold pb-1">
        Chat is empty
      </Text>
      <Text color="tertiary" variant="subhead" className="text-center">
        Start a{" "}
        <Link href="/chat/modal" className="underline text-primary">
          new chat
        </Link>{" "}
        to begin your conversations.
      </Text>
    </View>
  );
}

type Chat = { username: string; lastMessage: string; imageUrl: string };

function keyExtractor(item: Chat) {
  return item.username;
}

function RenderItemSeparator() {
  const { colors } = useColorScheme();

  return <View className="border-b" style={{ borderColor: colors.grey4 }} />;
}

function RenderItem({ item }: { item: Chat }) {
  return (
    <View className="px-4 py-2 flex flex-row gap-4 items-center">
      <Avatar alt={`${item.username} profile image`}>
        <AvatarImage source={{ uri: item.imageUrl }} />
        <AvatarFallback>
          <Text>{item.username[0]}</Text>
        </AvatarFallback>
      </Avatar>
      <View>
        <Text variant="title3" className="font-semibold">
          {item.username}
        </Text>
        <Text variant="body" color="tertiary">
          {item.lastMessage}
        </Text>
      </View>
    </View>
  );
}

const CHATS: Chat[] = [
  {
    username: "John",
    lastMessage: "Hello, how are you",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=John",
  },
  {
    username: "Alice",
    lastMessage: "Hey, what's up?",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Alice",
  },
  {
    username: "Bob",
    lastMessage: "Nothing much",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Bob",
  },
  {
    username: "Charlie",
    lastMessage: "I'm bored",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Charlie",
  },
  {
    username: "David",
    lastMessage: "I'm busy",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=David",
  },
  {
    username: "Eve",
    lastMessage: "I'm tired",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Eve",
  },
  {
    username: "Frank",
    lastMessage: "I'm sleepy",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Frank",
  },
  {
    username: "Grace",
    lastMessage: "See you later",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Grace",
  },
  {
    username: "Hank",
    lastMessage: "What's the plan?",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Hank",
  },
  {
    username: "Ivy",
    lastMessage: "Let's go!",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Ivy",
  },
  {
    username: "Jack",
    lastMessage: "Good morning",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Jack",
  },
  {
    username: "Kara",
    lastMessage: "How was your day?",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Kara",
  },
  {
    username: "Leo",
    lastMessage: "Can't wait!",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Leo",
  },
  {
    username: "Mona",
    lastMessage: "See you soon",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Mona",
  },
  {
    username: "Nina",
    lastMessage: "I'll be there",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Nina",
  },
  {
    username: "Oscar",
    lastMessage: "Got it",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Oscar",
  },
  {
    username: "Paul",
    lastMessage: "Alright",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Paul",
  },
  {
    username: "Quincy",
    lastMessage: "Sure thing",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Quincy",
  },
  {
    username: "Rita",
    lastMessage: "Of course",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Rita",
  },
  {
    username: "Sam",
    lastMessage: "No problem",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Sam",
  },
  {
    username: "Tina",
    lastMessage: "Good evening",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Tina",
  },
  {
    username: "Uma",
    lastMessage: "Take care",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Uma",
  },
  {
    username: "Victor",
    lastMessage: "Catch you later",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Victor",
  },
  {
    username: "Wendy",
    lastMessage: "Talk soon",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Wendy",
  },
  {
    username: "Xander",
    lastMessage: "All set",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Xander",
  },
  {
    username: "Yara",
    lastMessage: "Good luck",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Yara",
  },
  {
    username: "Zane",
    lastMessage: "See ya",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Zane",
  },
];

export default Index;
