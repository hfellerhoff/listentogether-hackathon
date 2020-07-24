import firebase from '../lib/firebase';
import { RoomInformation } from '../models/RoomInformation';
import {
  UserInformation,
  UserInformationRoom,
} from '../models/UserInformation';
import Events from './analytics/Events';
import { getFullUserID } from '../util/user';

const removeUserFromRoom = async (
  room: RoomInformation,
  user: UserInformation
) => {
  if (!room || !user) return;

  try {
    const userToDelete: UserInformationRoom = {
      service: 'spotify',
      id: user.id,
      displayName: user.displayName,
      image: {
        src: user.image.src,
      },
    };

    const fullUserID = getFullUserID(user);
    firebase.firestore().collection('users').doc(fullUserID).update({
      currentRoomID: null,
    });

    const roomRef = firebase.firestore().collection('rooms').doc(room.id);

    roomRef.update({
      'count.listeners': firebase.firestore.FieldValue.increment(-1),
    });

    roomRef
      .collection('details')
      .doc('listeners')
      .update({
        [`listeners.${fullUserID}`]: firebase.firestore.FieldValue.delete(),
      });

    firebase.analytics().logEvent(Events.LeaveRoom, {
      user: userToDelete,
      roomID: room.id,
    });

    firebase.firestore().collection('users').doc(user.id).update({
      currentRoomID: null,
    });
  } catch (error) {
    console.error(error);
  }
};

export default removeUserFromRoom;
