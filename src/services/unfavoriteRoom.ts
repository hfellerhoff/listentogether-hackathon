import firebase from '../lib/firebase';
import { UserInformation } from '../models/UserInformation';
import { RoomInformation } from '../models/RoomInformation';
import Events from './analytics/Events';
import { getFullUserID } from '../util/user';

const unfavoriteRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  try {
    firebase
      .firestore()
      .collection('users')
      .doc(getFullUserID(user))
      .update({
        favoritedRoomIDs: firebase.firestore.FieldValue.arrayRemove(room.id),
      });

    const roomRef = firebase.firestore().collection('rooms').doc(room.id);

    roomRef.update({
      'count.favorites': firebase.firestore.FieldValue.increment(-1),
    });

    roomRef
      .collection('details')
      .doc('favorites')
      .update({
        favorites: firebase.firestore.FieldValue.arrayRemove(user.id),
      });

    firebase.analytics().logEvent(Events.UnfavoriteRoom, {
      user,
      room,
    });
  } catch (error) {
    console.error(error);
  }
};

export default unfavoriteRoom;
