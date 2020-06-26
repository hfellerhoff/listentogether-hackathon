import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userInformationState,
  spotifyApiState,
  accessTokenState,
} from '../state';
import firebase from '../firebase';
import { useObject } from 'react-firebase-hooks/database';

const useUserMonitor = () => {
  const spotifyAPI = useRecoilValue(spotifyApiState);
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userInformationState);
  const [value, loading, error] = useObject(
    firebase.database().ref('users/' + user?.details.id)
  );

  useEffect(() => {
    if (!loading && !error && value) {
      const document = value.val();
      if (document) setUser(document);
    }
  }, [value, loading, error, setUser]);

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) return;
      try {
        const response = await spotifyAPI.getMe({
          access_token: accessToken,
        });

        const userRef = firebase.database().ref(`users/${response.id}`);

        // When the user disconnects
        userRef.onDisconnect().update({
          connected: false,
          room: null,
        });

        const updatedUser = {
          connected: true,
          details: response,
        };

        setUser({
          connected: true,
          details: response,
        });

        userRef.update(updatedUser);
      } catch (error) {
        console.error('User fetch error:');
        console.error(error);
      }
    };

    if (accessToken && !user) updateUser();
  }, [accessToken, spotifyAPI, user, setUser]);
};

export default useUserMonitor;
