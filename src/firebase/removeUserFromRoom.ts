import firebase from '.';
import { UserInformation } from '../state/userInformation';
import { RoomInformation } from '../state/roomInformation';

const removeUserFromRoom = async (
  room: RoomInformation,
  user: UserInformation
) => {
  if (!room || !user) return;

  console.log(`Removing ${user.details.id} from listeners...`);

  try {
    firebase
      .database()
      .ref(`rooms/${room.id}/listeners/${user.details.id}`)
      .remove();
  } catch (error) {
    console.error(error);
  }
};

export default removeUserFromRoom;
