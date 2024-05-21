import { ChatPreview } from "./types";

function getRandomDate(): Date {
  const startDate = new Date("2024-05-10T00:00:00Z");
  const endDate = new Date("2024-05-21T21:10:00Z");
  const startTime = startDate.getTime();
  const endTime = endDate.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

export const FAKE_CHATS: ChatPreview[] = [
  {
    time: getRandomDate(),
    username: "John",
    lastMessage: "Hello, how are you",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=John",
  },
  {
    time: getRandomDate(),
    username: "Alice",
    lastMessage: "Hey, what's up?",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Alice",
  },
  {
    time: getRandomDate(),
    username: "Bob",
    lastMessage: "Nothing much",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Bob",
  },
  {
    time: getRandomDate(),
    username: "Charlie",
    lastMessage: "I'm bored",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Charlie",
  },
  {
    time: getRandomDate(),
    username: "David",
    lastMessage: "I'm busy",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=David",
  },
  {
    time: getRandomDate(),
    username: "Eve",
    lastMessage: "I'm tired",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Eve",
  },
  {
    time: getRandomDate(),
    username: "Frank",
    lastMessage: "I'm sleepy",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Frank",
  },
  {
    time: getRandomDate(),
    username: "Grace",
    lastMessage: "See you later",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Grace",
  },
  {
    time: getRandomDate(),
    username: "Hank",
    lastMessage: "What's the plan?",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Hank",
  },
  {
    time: getRandomDate(),
    username: "Ivy",
    lastMessage: "Let's go!",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Ivy",
  },
  {
    time: getRandomDate(),
    username: "Jack",
    lastMessage: "Good morning",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Jack",
  },
  {
    time: getRandomDate(),
    username: "Kara",
    lastMessage: "How was your day?",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Kara",
  },
  {
    time: getRandomDate(),
    username: "Leo",
    lastMessage: "Can't wait!",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Leo",
  },
  {
    time: getRandomDate(),
    username: "Mona",
    lastMessage: "See you soon",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Mona",
  },
  {
    time: getRandomDate(),
    username: "Nina",
    lastMessage: "I'll be there",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Nina",
  },
  {
    time: getRandomDate(),
    username: "Oscar",
    lastMessage: "Got it",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Oscar",
  },
  {
    time: getRandomDate(),
    username: "Paul",
    lastMessage: "Alright",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Paul",
  },
  {
    time: getRandomDate(),
    username: "Quincy",
    lastMessage: "Sure thing",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Quincy",
  },
  {
    time: getRandomDate(),
    username: "Rita",
    lastMessage: "Of course",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Rita",
  },
  {
    time: getRandomDate(),
    username: "Sam",
    lastMessage: "No problem",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Sam",
  },
  {
    time: getRandomDate(),
    username: "Tina",
    lastMessage: "Good evening",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Tina",
  },
  {
    time: getRandomDate(),
    username: "Uma",
    lastMessage: "Take care",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Uma",
  },
  {
    time: getRandomDate(),
    username: "Victor",
    lastMessage: "Catch you later",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Victor",
  },
  {
    time: getRandomDate(),
    username: "Wendy",
    lastMessage: "Talk soon",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Wendy",
  },
  {
    time: getRandomDate(),
    username: "Xander",
    lastMessage: "All set",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Xander",
  },
  {
    time: getRandomDate(),
    username: "Yara",
    lastMessage: "Good luck",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Yara",
  },
  {
    time: getRandomDate(),
    username: "Zane",
    lastMessage: "See ya",
    imageUrl:
      "https://api.dicebear.com/8.x/avataaars/png?backgroundColor=b6e3f4,c0aede,d1d4f9&seed=Zane",
  },
].sort((a, b) => b.time.getTime() - a.time.getTime());
