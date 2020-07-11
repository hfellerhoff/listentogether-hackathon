import firebase from '.';
import shortid from 'shortid';
import { SpotifyAPI } from '../state/spotifyAPI';
import { RoomInformation } from '../models/RoomInformation';
import Events from './Events';
import { getFullUserIDFromValues } from '../util/user';
import { UserInformationRoom } from '../models/UserInformation';

const createRoom = async (
  spotifyAPI: SpotifyAPI,
  accessToken: string,
  details: {
    name: string;
    isPublic: boolean;
  }
) => {
  const user = await spotifyAPI.getMe(accessToken);

  const id = shortid.generate();
  console.log('Creating room...');

  const userID = getFullUserIDFromValues(user.id, 'spotify');
  const roomUser: UserInformationRoom = {
    service: 'spotify',
    id: userID,
    displayName: user.display_name ? user.display_name : user.email,
    image: {
      src: user.images ? (user.images[0] ? user.images[0].url : '') : '',
    },
  };

  if (user && roomUser) {
    const document: RoomInformation = {
      id,
      isPublic: details.isPublic,
      name: details.name,
      currentSong: null,
      // currentSong: {
      //   timestampAdded: Date.now(),
      //   isPlaying: songInformation.is_playing,
      //   progress: songInformation.progress_ms ? songInformation.progress_ms : 0,
      //   duration: songInformation.item.duration_ms,
      //   spotify: {
      //     id: songInformation.item.id,
      //     uri: songInformation.item.uri,
      //   },
      // },
      recentMessages: [
        {
          type: 'room-create',
          content: `${details.name} was created by ${
            user.display_name || 'an anonymous user'
          }. Welcome everyone!`,
          user: roomUser,
        },
      ],
      listeners: {
        [userID]: roomUser,
      },
      owner: roomUser,
    };

    try {
      firebase.firestore().collection('rooms').doc(id).set(document);
      firebase.analytics().logEvent(Events.CreateRoom, document);

      return document;
    } catch (error) {
      console.error(error);
    }
  }
};

export default createRoom;
