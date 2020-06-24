import firebase from '.';
import shortid from 'shortid';
import { RoomInformation } from '../state/roomInformation';
import { SpotifyAPI } from '../state/spotifyAPI';

const createRoom = async (
  spotifyAPI: SpotifyAPI,
  accessToken: string,
  songInformation: SpotifyApi.CurrentPlaybackResponse,
  isPublic: boolean
) => {
  const user = await spotifyAPI.getMe(accessToken);

  const id = shortid.generate();

  if (user && songInformation.item) {
    const document: RoomInformation = {
      id,
      isPublic,
      song: {
        id: songInformation.item.id,
        addedAt: Date.now(),
        progress: songInformation.progress_ms ? songInformation.progress_ms : 0,
        uri: songInformation.item.uri,
        isPlaying: songInformation.is_playing,
      },
      owner: {
        id: user.id,
        name: user.display_name ? user.display_name : user.email,
        imageUrl: user.images ? user.images[0].url : '',
      },
      listeners: {},
    };
    try {
      const roomRef = firebase.database().ref(`rooms/${id}`);
      roomRef.onDisconnect().remove();
      await roomRef.set(document);
      await firebase
        .database()
        .ref(`users/${user.id}`)
        .update({
          room: {
            id: document.id,
            isOwner: true,
          },
        });
    } catch (error) {
      console.error(error);
    }
  }

  return id;
};

export default createRoom;
