export type User = {
  id: string;
  username: string;
  imageUrl: string;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type Message = {
  id: number;
  userId: string;
  content: string;
  createdAt: string;
  showTime: boolean;
};

export type Chat = {
  id: number;
  user: User;
  messages: Message[];
};

export type ChatPreview = {
  id: number;
  lastMessage: Message;
  user: User;
};
