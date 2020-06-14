import firebase from '.';
import shortid from 'shortid';
import SpotifyWebApi from 'spotify-web-api-js';

export interface TrackDocument {
  id: string;
  song: {
    addedAt: number;
    id: string;
    progress: number;
    uri: string;
  };
  users: {
    [id: string]: {
      imageUrl: string;
      name: string;
      owner: boolean;
    };
  };
}

const createRoom = async (
  spotifyAPI: SpotifyWebApi.SpotifyWebApiJs,
  accessToken: string,
  songInformation: SpotifyApi.CurrentPlaybackResponse
) => {
  const user = await spotifyAPI.getMe(accessToken);

  const id = shortid.generate();

  if (user && songInformation.item) {
    const document: TrackDocument = {
      id,
      song: {
        id: songInformation.item.id,
        addedAt: Date.now(),
        progress: songInformation.progress_ms ? songInformation.progress_ms : 0,
        uri: songInformation.item.uri,
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
