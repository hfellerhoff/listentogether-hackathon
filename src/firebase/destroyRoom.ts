import firebase from '.';
import { RoomInformation } from '../models/RoomInformation';
import { UserInformation } from '../models/UserInformation';
import Events from './Events';

const destroyRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  try {
    firebase.firestore().collection('rooms').doc(room.id).delete();
    firebase.analytics().logEvent(Events.DestroyRoom, room);

    firebase.firestore().collection('users').doc(user.id).update({
      currentRoomID: null,
    });
  } catch (error) {
    console.error(error);
  }
};

export default destroyRoom;
