import { atom } from 'recoil';

export type UserInformation = {
  connected: boolean;
  room?: {
    id: string;
    isOwner: boolean;
  };
  details: SpotifyApi.CurrentUsersProfileResponse;
};
export type UserInformationState = UserInformation | null;

export const userInformationState = atom<UserInformationState>({
  key: 'userInformationState',
  default: null,
});
