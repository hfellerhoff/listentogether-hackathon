import { atom } from 'recoil';
import Spotify from 'spotify-web-api-js';

export type SpotifyAPI = Spotify.SpotifyWebApiJs;

export const spotifyApiState = atom<SpotifyAPI>({
  key: 'spotifyApiState',
  default: new Spotify(),
});
