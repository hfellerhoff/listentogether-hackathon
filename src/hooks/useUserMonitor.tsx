import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  userInformationState,
  spotifyApiState,
  accessTokenState,
} from '../state';
import firebase from '../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getFullUserID } from '../util/user';
import { UserInformation } from '../models/UserInformation';

const useUserMonitor = () => {
  const spotifyAPI = useRecoilValue(spotifyApiState);
  const accessToken = useRecoilValue(accessTokenState);
  const [user, setUser] = useRecoilState(userInformationState);

  const fullUserID = getFullUserID(user);
  const [snapshot, loading, error] = useDocument(
    fullUserID ? firebase.firestore().collection('users').doc(fullUserID) : null
  );

  useEffect(() => {
    if (!loading && !error && snapshot) {
      if (!snapshot.exists) return;
      const document = snapshot.data();
      if (document) setUser(document as UserInformation);
    }
  }, [snapshot, loading, error, setUser]);

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) return;
      try {
        spotifyAPI.setAccessToken(accessToken);
        const spotifyUser = await spotifyAPI.getMe();

        const updatedUser: UserInformation = {
          service: 'spotify',
          id: spotifyUser.id,
          displayName: spotifyUser.display_name || '',
          currentRoomID: null,
          image: {
            src: spotifyUser.images ? spotifyUser.images[0].url || '' : '',
          },
        };

        console.log('Updating user...');
        console.log(updatedUser);

        setUser(updatedUser);

        firebase
          .firestore()
          .collection('users')
          .doc(getFullUserID(updatedUser))
          .set(updatedUser);
      } catch (error) {
        console.error('User fetch error:');
        console.error(error);
      }
    };

    if (accessToken && !user) updateUser();
  }, [accessToken, spotifyAPI, user, setUser]);
};

export default useUserMonitor;
