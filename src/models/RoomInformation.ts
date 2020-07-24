import { SongInformation } from './SongInformation';
import { UserInformationRoom } from './UserInformation';

export type RoomInformation = {
  id: string;
  name: string;
  isPublic: boolean;
  currentSong: SongInformation | null;
  owner: UserInformationRoom;
  count: {
    listeners: number;
    favorites: number;
  };
};
