import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userInformationState,
  spotifyApiState,
  accessTokenState,
} from '../state';

const useUserMonitor = () => {
  const spotifyAPI = useRecoilValue(spotifyApiState);
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userInformationState);

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) return;
      try {
        const response = await spotifyAPI.getMe({
          access_token: accessToken,
        });
        setUser(response);
      } catch (error) {
        console.error('User fetch error:');
        console.error(error);
      }
    };

    if (accessToken && !user) updateUser();
  }, [accessToken, spotifyAPI, user, setUser]);
};

export default useUserMonitor;
