import { UserInformationRoom } from './UserInformation';

export type SongInformation = {
  name: string;
  artists: string[];
  timestampUpdated: number | firebase.firestore.FieldValue;
  isPlaying: boolean;
  progress: number;
  duration: number;
  album: {
    name: string;
    image: {
      src: string;
    };
  };
  spotify: {
    id: string;
    uri: string;
  };
  userWhoQueued: UserInformationRoom;
};
