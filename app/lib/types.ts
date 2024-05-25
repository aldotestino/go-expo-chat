export type ChatPreview = {
  username: string;
  lastMessage: string;
  imageUrl: string;
  time: Date;
};

export type Message = {
  id: number;
  userId: string;
  content: string;
  createdAt: Date;
};
