import firebase from '../lib/firebase';
import { UserInformation } from '../models/UserInformation';
import { RoomInformation } from '../models/RoomInformation';
import Events from './analytics/Events';
import { getFullUserID } from '../util/user';

const favoriteRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  favoriteRoomByRoomID(room.id, user);
};

export const favoriteRoomByRoomID = async (
  roomID: string,
  user: UserInformation
) => {
  if (!roomID || !user) return;

  try {
    firebase
      .firestore()
      .collection('users')
      .doc(getFullUserID(user))
      .update({
        favoritedRoomIDs: firebase.firestore.FieldValue.arrayUnion(roomID),
      });

    const roomRef = firebase.firestore().collection('rooms').doc(roomID);

    roomRef.update({
      'count.favorites': firebase.firestore.FieldValue.increment(1),
    });

    roomRef
      .collection('details')
      .doc('favorites')
      .update({
        favorites: firebase.firestore.FieldValue.arrayUnion(user.id),
      });

    firebase.analytics().logEvent(Events.FavoriteRoom, {
      user,
      room: roomID,
    });
  } catch (error) {
    console.error(error);
  }
};

export default favoriteRoom;
