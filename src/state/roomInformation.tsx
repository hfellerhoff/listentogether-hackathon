import { atom } from 'recoil';
import { RoomInformation } from '../models/RoomInformation';

export type RoomInformationState = RoomInformation | null;

export const roomInformationState = atom<RoomInformationState>({
  key: 'roomInformationState',
  default: null,
});
