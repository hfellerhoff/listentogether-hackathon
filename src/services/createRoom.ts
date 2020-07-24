import firebase from '../lib/firebase';
import shortid from 'shortid';
import { RoomInformation } from '../models/RoomInformation';
import Events from './analytics/Events';
import { getFullUserIDFromValues } from '../util/user';
import {
  UserInformationRoom,
  UserInformation,
} from '../models/UserInformation';
import { QueueDocument } from '../models/room-details/QueueDocument';
import { ListenersDocument } from '../models/room-details/ListenersDocument';
import { MessagesDocument } from '../models/room-details/MessagesDocument';
import { FavoritesDocument } from '../models/room-details/FavoritesDocument';
import { favoriteRoomByRoomID } from './favoriteRoom';
import { addUserToRoomByRoomID } from './addUserToRoom';
import { ChatMessage } from '../models/ChatMessage';

export const createRoom = async (
  user: UserInformation,
  details: {
    name: string;
    isPublic: boolean;
  }
) => {
  const id = shortid.generate();

  const userID = getFullUserIDFromValues(user.id, 'spotify');
  const roomUser: UserInformationRoom = {
    service: 'spotify',
    id: userID,
    displayName: user.displayName,
    image: {
      src: user.image.src,
    },
  };

  if (user && roomUser) {
    const document: RoomInformation = {
      id,
      isPublic: details.isPublic,
      name: details.name,
      currentSong: null,
      owner: roomUser,
      count: {
        listeners: 0,
        favorites: 0,
      },
    };

    const roomRef = firebase.firestore().collection('rooms').doc(id);
    const detailsRef = roomRef.collection('details');
    try {
      // Create primary room document
      roomRef.set(document);

      // Initial chat message
      const roomCreationMessage: ChatMessage = {
        type: 'room-create',
        content: `${document.name} was created by ${user.displayName} – welcome everyone!`,
        user: roomUser,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      };

      // Create details documents
      detailsRef.doc('queue').set({ queue: [] } as QueueDocument);
      detailsRef.doc('listeners').set({ listeners: {} } as ListenersDocument);
      detailsRef.doc('messages').set({
        messages: {
          [shortid.generate()]: roomCreationMessage,
        },
      } as MessagesDocument);
      detailsRef.doc('favorites').set({ favorites: [] } as FavoritesDocument);

      // Favorite room and add room creator as listener
      favoriteRoomByRoomID(id, user);
      addUserToRoomByRoomID(id, user);

      firebase.analytics().logEvent(Events.CreateRoom, document);

      return document;
    } catch (error) {
      console.error(error);
    }
  }
};

export default createRoom;
