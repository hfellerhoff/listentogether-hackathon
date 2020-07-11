import { UserInformationRoom } from './UserInformation';

export type ChatMessageType =
  | 'message'
  | 'join'
  | 'leave'
  | 'queue'
  | 'room-create';

export type ChatMessage = {
  type: ChatMessageType;
  content: string;
  user: UserInformationRoom;
};
