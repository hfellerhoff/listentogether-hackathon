import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import firebase from '../firebase';
import { useDocument } from 'react-firebase-hooks/firestore';
import { roomInformationState } from '../state/roomInformation';
import { RoomInformation } from '../models/RoomInformation';

const useRoomMonitor = () => {
  const [room, setRoom] = useRecoilState(roomInformationState);

  const [snapshot, loading, error] = useDocument(
    room ? firebase.firestore().collection('rooms').doc(room.id) : null
  );

  useEffect(() => {
    if (!loading && !error && snapshot) {
      if (!snapshot.exists) return;
      const document = snapshot.data();
      if (document) setRoom(document as RoomInformation);
    }
  }, [snapshot, loading, error, setRoom]);
};

export default useRoomMonitor;
