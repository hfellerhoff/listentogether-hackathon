import { atom } from 'recoil';

export type AccessToken = string | null;

export const accessTokenState = atom<AccessToken>({
  key: 'accessTokenState',
  default: null,
});
