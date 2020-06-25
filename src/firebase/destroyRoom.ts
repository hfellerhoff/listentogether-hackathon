import firebase from '.';
import { UserInformation } from '../state/userInformation';
import { RoomInformation } from '../state/roomInformation';

const destroyRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  try {
    firebase
      .database()
      .ref('rooms/' + room.id)
      .remove();

    firebase
      .database()
      .ref('users/' + user?.details.id)
      .update({
        room: null,
      });
  } catch (error) {
    console.error(error);
  }
};

export default destroyRoom;
