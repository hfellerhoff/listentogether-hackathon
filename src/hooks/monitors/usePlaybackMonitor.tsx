import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { spotifyApiState } from '../../state/spotifyAPI';
import { accessTokenState } from '../../state/accessToken';
import { playbackInformationState } from '../../state/playbackInformation';

const usePlaybackMonitor = (shouldStartCheckingPlayback: boolean) => {
  const spotifyAPI = useRecoilValue(spotifyApiState);
  const accessToken = useRecoilValue(accessTokenState);
  const [songInformation, setSongInformation] = useRecoilState(
    playbackInformationState
  );

  const [fetchInterval, setFetchInterval] = useState<NodeJS.Timeout | null>(
    null
  );

  useEffect(() => {
    const getMyCurrentPlaybackState = async () => {
      console.log('Checking playback state...');
      try {
        spotifyAPI.setAccessToken(accessToken);
        const response = await spotifyAPI.getMyCurrentPlaybackState();
        // console.log(response);

        setSongInformation(response);
        return response;
      } catch (error) {
        console.error(error);
      }
    };

    const startCheckingPlayback = () => {
      if (accessToken) {
        getMyCurrentPlaybackState();
        setFetchInterval(setInterval(getMyCurrentPlaybackState, 500));
      }
    };

    if (shouldStartCheckingPlayback && !fetchInterval) startCheckingPlayback();

    return () => {
      if (fetchInterval) clearInterval(fetchInterval);
    };
  }, [
    accessToken,
    fetchInterval,
    setSongInformation,
    shouldStartCheckingPlayback,
    spotifyAPI,
  ]);

  return songInformation;
};

export default usePlaybackMonitor;
