import firebase from '.';
import { PlaybackInformation } from '../state/playbackInformation';
import { RoomInformation } from '../state/roomInformation';

const updateRoom = async (
  room: RoomInformation,
  songInformation: PlaybackInformation
) => {
  if (!songInformation) return;

  if (songInformation.item) {
    try {
      firebase
        .database()
        .ref(`rooms/${room.id}/song`)
        .update({
          id: songInformation.item.id,
          addedAt: Date.now(),
          progress: songInformation.progress_ms
            ? songInformation.progress_ms
            : 0,
          uri: songInformation.item.uri,
          isPlaying: songInformation.is_playing,
        });
      // console.log('Successfully updated room.');
    } catch (error) {
      console.error(error);
    }
  }
};

export default updateRoom;
