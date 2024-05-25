import { ChatPreview, Message } from "./types";

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

export const FAKE_MESSAGES: Message[] = [
  {
    userId: "user1",
    content: "Hello, how are you?",
    createdAt: new Date("2024-05-25T10:00:00Z"),
  },
  {
    userId: "user2",
    content:
      "I am good, thank you! I had a busy weekend, though. Spent most of it catching up on some work and then finally had some time to relax on Sunday. How about you?",
    createdAt: new Date("2024-05-25T10:05:00Z"),
  },
  {
    userId: "user1",
    content:
      "Glad to hear that! My weekend was quite the opposite, actually. I mostly relaxed and took it easy. I watched a couple of movies that I had been wanting to see for a while. It was nice to just unwind for a bit.",
    createdAt: new Date("2024-05-25T10:10:00Z"),
  },
  {
    userId: "user2",
    content:
      "That sounds wonderful. I’ve been meaning to catch up on some movies too. Which ones did you watch?",
    createdAt: new Date("2024-05-25T10:15:00Z"),
  },
  {
    userId: "user1",
    content:
      'I watched "Inception" and "The Grand Budapest Hotel". Both were fantastic, though in very different ways. "Inception" really made me think, and "The Grand Budapest Hotel" was just a visual treat with its quirky story and beautiful cinematography.',
    createdAt: new Date("2024-05-25T10:20:00Z"),
  },
  {
    userId: "user2",
    content:
      'Those are great choices! I loved "Inception" for its mind-bending plot and "The Grand Budapest Hotel" for its unique style and humor. I think I might rewatch them soon. Thanks for the reminder!',
    createdAt: new Date("2024-05-25T10:25:00Z"),
  },
  {
    userId: "user1",
    content:
      "No problem! If you have any recommendations for good movies, do let me know. I’m always on the lookout for something new to watch.",
    createdAt: new Date("2024-05-25T10:30:00Z"),
  },
  {
    userId: "user2",
    content:
      'Sure thing! Have you seen "Parasite"? It’s a brilliant film that won several awards. It’s a must-watch if you haven’t seen it already. The story is gripping and the social commentary is quite thought-provoking.',
    createdAt: new Date("2024-05-25T10:35:00Z"),
  },
  {
    userId: "user1",
    content:
      'Yes, I’ve heard a lot about "Parasite" but haven’t gotten around to watching it yet. I’ll definitely add it to my list. Thanks for the recommendation!',
    createdAt: new Date("2024-05-25T10:40:00Z"),
  },
  {
    userId: "user2",
    content:
      "You’re welcome! Let me know what you think once you watch it. By the way, are you working on any interesting projects at the moment?",
    createdAt: new Date("2024-05-25T10:45:00Z"),
  },
  {
    userId: "user1",
    content:
      "Yes, I’m currently working on a new web development project. It’s for a client who wants an e-commerce site with some custom features. It’s been quite challenging but also very rewarding to see it come together.",
    createdAt: new Date("2024-05-25T10:50:00Z"),
  },
  {
    userId: "user2",
    content:
      "That sounds exciting! Web development can be challenging but also very satisfying when you see the final product. What kind of custom features are you implementing?",
    createdAt: new Date("2024-05-25T10:55:00Z"),
  },
  {
    userId: "user1",
    content:
      "We’re adding a feature for personalized product recommendations based on user behavior, and another for a dynamic pricing model that adjusts prices in real-time based on various factors. It’s a bit complex, but I’m learning a lot in the process.",
    createdAt: new Date("2024-05-25T11:00:00Z"),
  },
  {
    userId: "user2",
    content:
      "Wow, those sound like great features! Personalized recommendations can really enhance user experience, and dynamic pricing is quite innovative. It’s impressive that you’re working on such advanced functionality.",
    createdAt: new Date("2024-05-25T11:05:00Z"),
  },
  {
    userId: "user1",
    content:
      "Thanks! It’s been a steep learning curve, but I’m enjoying the challenge. Do you have any big projects on your plate?",
    createdAt: new Date("2024-05-25T11:10:00Z"),
  },
  {
    userId: "user2",
    content:
      "Yes, I’m actually working on a mobile app for a startup. It’s a fitness app that tracks user activities and provides personalized workout plans. We’re also integrating a social feature so users can connect with friends and share their progress.",
    createdAt: new Date("2024-05-25T11:15:00Z"),
  },
  {
    userId: "user1",
    content:
      "That sounds fantastic! Fitness apps are really popular right now, and the social feature sounds like a great addition. Best of luck with the project!",
    createdAt: new Date("2024-05-25T11:20:00Z"),
  },
  {
    userId: "user2",
    content:
      "Thank you! It’s been a lot of work, but I’m excited to see how it turns out. Maybe we can share tips and tricks as we go along.",
    createdAt: new Date("2024-05-25T11:25:00Z"),
  },
  {
    userId: "user1",
    content:
      "Absolutely, that would be great! It’s always good to learn from each other. Looking forward to it!",
    createdAt: new Date("2024-05-25T11:30:00Z"),
  },
  {
    userId: "user2",
    content:
      "Definitely! Alright, I need to get back to work now. Talk to you later!",
    createdAt: new Date("2024-05-25T11:35:00Z"),
  },
  {
    userId: "user1",
    content: "Talk to you later! Have a great day!",
    createdAt: new Date("2024-05-25T11:40:00Z"),
  },
].map((m, i) => ({ ...m, id: i }));
