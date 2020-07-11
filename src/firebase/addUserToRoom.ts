import firebase from '.';
import {
  UserInformationRoom,
  UserInformation,
} from '../models/UserInformation';
import { RoomInformation } from '../models/RoomInformation';
import Events from './Events';

const addUserToRoom = async (room: RoomInformation, user: UserInformation) => {
  if (!room || !user) return;

  try {
    const userToAdd: UserInformationRoom = {
      service: 'spotify',
      id: user.id,
      displayName: user.displayName,
      image: {
        src: user.image.src,
      },
    };

    const listenerRef = firebase
      .firestore()
      .collection('rooms')
      .doc(room.id)
      .collection('listeners')
      .doc(user.id);

    const userRef = firebase.firestore().collection('users').doc(user.id);

    // listenerRef.onDisconnect().remove();

    listenerRef.update(userToAdd);
    firebase.analytics().logEvent(Events.JoinRoom, {
      id: userToAdd.id,
      displayName: userToAdd.displayName,
      service: userToAdd.service,
    });

    userRef.update(user);
  } catch (error) {
    console.error(error);
  }
};

export default addUserToRoom;
