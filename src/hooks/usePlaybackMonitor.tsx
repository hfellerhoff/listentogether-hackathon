import { useState, useEffect } from 'react';

export type SongInformation = SpotifyApi.CurrentPlaybackResponse | null;

const usePlaybackMonitor = (
  // @ts-ignore
  spotifyAPI: SpotifyWebApi.SpotifyWebApiJs,
  access_token: string | null,
  shouldStartCheckingPlayback: boolean
) => {
  const [songInformation, setSongInformation] = useState<SongInformation>(null);

  const [fetchInterval, setFetchInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const getMyCurrentPlaybackState = async () => {
      console.log('Checking playback state...');
      try {
        spotifyAPI.setAccessToken(access_token);
        const response = await spotifyAPI.getMyCurrentPlaybackState();
        setSongInformation(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    };

    const startCheckingPlayback = () => {
      if (access_token) {
        console.log('Starting checking playback...');
        getMyCurrentPlaybackState();
        setFetchInterval(setInterval(getMyCurrentPlaybackState, 500));
      }
    };

    if (shouldStartCheckingPlayback && !fetchInterval) startCheckingPlayback();

    return () => {
      if (fetchInterval) clearInterval(fetchInterval);
    };
  }, [access_token, fetchInterval, shouldStartCheckingPlayback, spotifyAPI]);

  return songInformation;
};

export default usePlaybackMonitor;
