import { atom } from 'recoil';

export type DisplayedModal =
  | null
  | 'device-select'
  | 'playback-control'
  | 'queue-song';

export const displayedModalState = atom<DisplayedModal>({
  key: 'displayedModalState',
  default: null,
});
