import firebase from '../lib/firebase';
import {
  UserInformationRoom,
  UserInformation,
} from '../models/UserInformation';
import Events from './analytics/Events';
import { ChatMessage } from '../models/ChatMessage';
import shortid from 'shortid';
import { MessagesDocument } from '../models/room-details/MessagesDocument';

const sendChatMessage = async (
  messagesDocument: MessagesDocument,
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

    firebase
      .firestore()
      .collection('rooms')
      .doc(roomID)
      .collection('details')
      .doc('messages')
      .update({
        messages: {
          ...messagesDocument.messages,
          [shortid.generate()]: {
            type: 'message',
            content,
            user: minifiedUser,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          } as ChatMessage,
        },
      });

    firebase.analytics().logEvent(Events.SendChatMessage, {});
  } catch (error) {
    console.error(error);
  }
};

export default sendChatMessage;
