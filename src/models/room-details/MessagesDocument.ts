import { ChatMessage } from '../ChatMessage';

export type MessagesDocument = {
  messages: {
    [timestamp: number]: ChatMessage;
  };
};
