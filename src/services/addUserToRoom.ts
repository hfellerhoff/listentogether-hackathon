import firebase from '../lib/firebase';
import {
  UserInformationRoom,
  UserInformation,
} from '../models/UserInformation';
import { RoomInformation } from '../models/RoomInformation';
import Events from './analytics/Events';
import { getFullUserID } from '../util/user';

const addUserToRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  addUserToRoomByRoomID(room.id, user);
};

export const addUserToRoomByRoomID = async (
  roomID: string,
  user: UserInformation
) => {
  try {
    const userToAdd: UserInformationRoom = {
      service: 'spotify',
      id: user.id,
      displayName: user.displayName,
      image: {
        src: user.image.src,
      },
    };

    const fullUserID = getFullUserID(user);
    firebase.firestore().collection('users').doc(fullUserID).update({
      currentRoomID: roomID,
    });

    const roomRef = firebase.firestore().collection('rooms').doc(roomID);

    roomRef.update({
      'count.listeners': firebase.firestore.FieldValue.increment(1),
    });

    roomRef
      .collection('details')
      .doc('listeners')
      .update({
        [`listeners.${fullUserID}`]: userToAdd,
      });

    firebase.analytics().logEvent(Events.JoinRoom, {
      user: userToAdd,
      room: roomID,
    });
  } catch (error) {
    console.error(error);
  }
};

export default addUserToRoom;
