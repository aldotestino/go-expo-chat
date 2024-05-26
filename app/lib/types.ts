export type User = {
  id: string;
  username: string;
  imageUrl: string;
};

export type Message = {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
};

export type Chat = {
  id: number;
  user: User;
  messages: Message[];
};

export type ChatPreview = {
  id: number;
  lastMessage: Message | null;
  user: User;
};
