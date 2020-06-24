import { atom } from 'recoil';

export type User = {
  id: string;
  imageUrl: string;
  name: string;
};

export interface RoomInformation {
  id: string;
  isPublic: boolean;
  song: {
    addedAt: number;
    id: string;
    progress: number;
    uri: string;
    isPlaying: boolean;
  };
  owner: User;
  listeners: {
    [id: string]: User;
  };
}

export type RoomInformationState = RoomInformation | null;

export const roomInformationState = atom<RoomInformationState>({
  key: 'roomInformationState',
  default: null,
});
