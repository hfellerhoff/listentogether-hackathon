import firebase from '.';
import { UserInformation } from '../state/userInformation';
import { RoomInformation } from '../state/roomInformation';

const removeUserFromRoom = async (
  room: RoomInformation,
  user: UserInformation
) => {
  if (!room || !user) return;

  try {
    const users = { ...room.users };
    delete users[user.id];

    firebase
      .database()
      .ref('rooms/' + room.id)
      .update({
        users,
      });
  } catch (error) {
    console.error(error);
  }
};

export default removeUserFromRoom;
