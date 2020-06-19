import { atom } from 'recoil';

export interface RoomInformation {
  id: string;
  song: {
    addedAt: number;
    id: string;
    progress: number;
    uri: string;
    isPlaying: boolean;
  };
  users: {
    [id: string]: {
      imageUrl: string;
      name: string;
      owner: boolean;
    };
  };
}

export type RoomInformationState = RoomInformation | null;

export const roomInformationState = atom<RoomInformationState>({
  key: 'roomInformationState',
  default: null,
});
