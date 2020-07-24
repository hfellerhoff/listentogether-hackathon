import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import firebase from '../../lib/firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { getFullUserID, getFullUserIDFromValues } from '../../util/user';
import { UserInformation } from '../../models/UserInformation';
import { Service } from '../../models/Service';
import { spotifyApiState } from '../../state/spotifyAPI';
import { accessTokenState } from '../../state/accessToken';
import { userInformationState } from '../../state/userInformation';

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
      console.log('fetched user from firebase');

      if (document) setUser(document as UserInformation);
    }
  }, [snapshot, loading, error, setUser]);

  useEffect(() => {
    const updateUser = async () => {
      if (!accessToken) return;
      try {
        spotifyAPI.setAccessToken(accessToken);
        const spotifyUser = await spotifyAPI.getMe();

        const updatedUser = {
          service: 'spotify' as Service,
          id: spotifyUser.id,
          displayName: spotifyUser.display_name || '',
          currentRoomID: null,
          image: {
            src: spotifyUser.images
              ? spotifyUser.images[0]
                ? spotifyUser.images[0].url || ''
                : ''
              : '',
          },
        };

        const userID = getFullUserIDFromValues(
          updatedUser.id,
          updatedUser.service as Service
        );

        const initialUser: UserInformation = {
          ...updatedUser,
          favoritedRoomIDs: [],
        };

        const realtimeRef = firebase.database().ref(`connected/${userID}`);
        realtimeRef.set(true);
        realtimeRef.onDisconnect().set(false);

        setUser(initialUser);

        const document = await firebase
          .firestore()
          .collection('users')
          .doc(getFullUserID(initialUser))
          .get();

        if (document.exists) {
          firebase
            .firestore()
            .collection('users')
            .doc(getFullUserIDFromValues(updatedUser.id, updatedUser.service))
            .update(updatedUser);
          console.log('updated user');
        } else {
          firebase
            .firestore()
            .collection('users')
            .doc(userID)
            .set({ ...updatedUser, favoritedRoomIDs: [] } as UserInformation);
          console.log('set user');
        }
      } catch (error) {
        console.error('User fetch error:');
        console.error(error);
      }
    };

    if (accessToken && !user) updateUser();
  }, [accessToken, spotifyAPI, user, setUser]);
};

export default useUserMonitor;
