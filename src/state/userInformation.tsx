import { atom } from 'recoil';
import { UserInformation } from '../models/UserInformation';

export type UserInformationState = UserInformation | null;

export const userInformationState = atom<UserInformationState>({
  key: 'userInformationState',
  default: null,
});
