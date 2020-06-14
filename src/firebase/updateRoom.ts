import firebase from '.';
import { SongInformation } from '../hooks/usePlaybackMonitor';
import { TrackDocument } from './createRoom';

const updateRoom = async (
  room: TrackDocument,
  songInformation: SongInformation
) => {
  if (!songInformation) return;

  if (songInformation.item) {
    try {
      firebase
        .database()
        .ref('rooms/' + room.id)
        .update({
          ...room,
          song: {
            id: songInformation.item.id,
            addedAt: Date.now(),
            progress: songInformation.progress_ms
              ? songInformation.progress_ms
              : 0,
            uri: songInformation.item.uri,
          },
        });
      console.log('Successfully updated room.');
    } catch (error) {
      console.error(error);
    }
  }
};

export default updateRoom;
