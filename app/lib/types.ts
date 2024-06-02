export type ChatType = "personal" | "group";

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
  type: ChatType;
  groupName?: string;
  user?: User;
  participants: {
    [key: string]: User;
  };
  messages: Message[];
};

export type ChatPreview = {
  id: number;
  type: ChatType;
  groupName?: string;
  lastMessageSender: string;
  user?: User;
  lastMessage: Message;
};
