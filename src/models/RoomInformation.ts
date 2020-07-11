import { SongInformation } from './SongInformation';
import { UserInformationRoom } from './UserInformation';
import { ChatMessage } from './ChatMessage';

export type RoomInformation = {
  id: string;
  name: string;
  isPublic: boolean;
  currentSong: SongInformation | null;
  owner: UserInformationRoom;
  listeners: {
    [id: string]: UserInformationRoom;
  };
  recentMessages: ChatMessage[];
};
