export interface ChatTypes {
  user: string;
  title: string;
  messages: {
    message: string;
    system: boolean;
  }[];
  hasArchive: boolean;
  createdAt: Date;
  updatedAt: Date;
}