import firebase from '.';
import { UserInformation } from '../state/userInformation';
import { RoomInformation } from '../state/roomInformation';

const addUserToRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  try {
    const users: RoomInformation['users'] = {
      ...room.users,
      [user.id]: {
        name: user.display_name ? user.display_name : user.email,
        imageUrl: user.images ? (user.images[0] ? user.images[0].url : '') : '',
        owner: false,
      },
    };

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

export default addUserToRoom;
