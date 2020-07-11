import firebase from '.';
import { RoomInformation } from '../models/RoomInformation';
import Events from './Events';
import { SongInformation } from '../models/SongInformation';

const queueSong = async (room: RoomInformation, song: SongInformation) => {
  if (!room || !song) return;

  try {
    const roomRef = firebase.firestore().collection('rooms').doc(room.id);

    firebase.analytics().logEvent(Events.QueueSong, {
      room: room.id,
      song,
    });

    roomRef.update({
      currentSong: song,
    });
  } catch (error) {
    console.error(error);
  }
};

export default queueSong;
