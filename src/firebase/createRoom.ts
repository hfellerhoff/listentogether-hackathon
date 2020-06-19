import firebase from '.';
import shortid from 'shortid';
import { RoomInformation } from '../state/roomInformation';
import { SpotifyAPI } from '../state/spotifyAPI';

const createRoom = async (
  spotifyAPI: SpotifyAPI,
  accessToken: string,
  songInformation: SpotifyApi.CurrentPlaybackResponse
) => {
  const user = await spotifyAPI.getMe(accessToken);

  const id = shortid.generate();

  if (user && songInformation.item) {
    const document: RoomInformation = {
      id,
      song: {
        id: songInformation.item.id,
        addedAt: Date.now(),
        progress: songInformation.progress_ms ? songInformation.progress_ms : 0,
        uri: songInformation.item.uri,
        isPlaying: songInformation.is_playing,
      },
      users: {
        [user.id]: {
          name: user.display_name ? user.display_name : user.email,
          imageUrl: user.images ? user.images[0].url : '',
          owner: true,
        },
      },
    };
    try {
      await firebase
        .database()
        .ref('rooms/' + id)
        .set(document);
    } catch (error) {
      console.error(error);
    }
  }

  return id;
};

export default createRoom;
