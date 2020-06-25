import firebase from '.';
import { UserInformation } from '../state/userInformation';
import { RoomInformation, User } from '../state/roomInformation';

const addUserToRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  try {
    const userToAdd: User = {
      id: user.details.id,
      name: user.details.display_name
        ? user.details.display_name
        : user.details.email,
      imageUrl: user.details.images
        ? user.details.images[0]
          ? user.details.images[0].url
          : ''
        : '',
    };

    const listenerRef = firebase
      .database()
      .ref(`rooms/${room.id}/listeners/${user.details.id}`);

    const userRef = firebase.database().ref(`users/${user.details.id}`);

    listenerRef.onDisconnect().remove();

    listenerRef.update(userToAdd);
    userRef.update({
      room: {
        id: room.id,
        isOwner: false,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export default addUserToRoom;
