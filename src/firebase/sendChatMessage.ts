import firebase from '.';
import {
  UserInformationRoom,
  UserInformation,
} from '../models/UserInformation';
import Events from './Events';
import { ChatMessage } from '../models/ChatMessage';

const sendChatMessage = async (
  roomID: string,
  user: UserInformation,
  content: string
) => {
  try {
    const minifiedUser: UserInformationRoom = {
      service: 'spotify',
      id: user.id,
      displayName: user.displayName,
      image: {
        src: user.image.src,
      },
    };

    const roomRef = firebase.firestore().collection('rooms').doc(roomID);

    roomRef.update({
      recentMessages: firebase.firestore.FieldValue.arrayUnion({
        type: 'message',
        content,
        user: minifiedUser,
      } as ChatMessage),
    });

    firebase.analytics().logEvent(Events.SendChatMessage, {});
  } catch (error) {
    console.error(error);
  }
};

export default sendChatMessage;
