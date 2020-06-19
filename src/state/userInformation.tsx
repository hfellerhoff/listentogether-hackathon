import { atom } from 'recoil';

export type UserInformation = SpotifyApi.CurrentUsersProfileResponse;
export type UserInformationState = UserInformation | null;

export const userInformationState = atom<UserInformationState>({
  key: 'userInformationState',
  default: null,
});
