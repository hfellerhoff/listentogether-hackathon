import { atom } from 'recoil';

export type PlaybackInformation = SpotifyApi.CurrentPlaybackResponse | null;

export const playbackInformationState = atom<PlaybackInformation>({
  key: 'playbackInformationState',
  default: null,
});
