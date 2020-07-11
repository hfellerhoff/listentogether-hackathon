import firebase from '.';
import { RoomInformation } from '../models/RoomInformation';
import { UserInformation } from '../models/UserInformation';
import Events from './Events';

const removeUserFromRoom = async (
  room: RoomInformation,
  user: UserInformation
) => {
  if (!room || !user) return;

  try {
    firebase
      .firestore()
      .collection('rooms')
      .doc(room.id)
      .collection('listeners')
      .doc(user.id)
      .delete();

    firebase.analytics().logEvent(Events.LeaveRoom, {
      id: user.id,
      displayName: user.displayName,
      service: user.service,
    });

    firebase.firestore().collection('users').doc(user.id).update({
      currentRoomID: null,
    });
  } catch (error) {
    console.error(error);
  }
};

export default removeUserFromRoom;
