import firebase from '.';
import { UserInformationState } from '../state/userInformation';
import { RoomInformationState } from '../state/roomInformation';
import { UserInformationRoom } from '../models/UserInformation';

const transferRoomOwnership = async (
  room: RoomInformationState,
  previousOwner: UserInformationRoom,
  newOwner: UserInformationState
) => {
  console.log('TODO: Room owner transfer function.');
  console.log(!!room, !!previousOwner, !!newOwner);
  if (!room || !previousOwner || !newOwner) return;

  try {
    // TODO
    // const listenerRef = firebase
    //   .database()
    //   .ref(`rooms/${room.id}/listeners/${user.details.id}`);
    // const userRef = firebase.database().ref(`users/${user.details.id}`);
    // listenerRef.onDisconnect().remove();
    // listenerRef.update(userToAdd);
    // userRef.update({
    //   room: {
    //     id: room.id,
    //     isOwner: false,
    //   },
    // });
  } catch (error) {
    console.error(error);
  }
};

export default transferRoomOwnership;
