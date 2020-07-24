import { useState, useEffect } from 'react';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../../lib/firebase';

/*
  A wrapper on the useCollection react-firebase-hooks hook that
  processes data fetched from Firebase and returns it in a 
  useable format (grabs data from documents and parses it)
*/
export const useCollectionData = <T,>(
  query:
    | firebase.firestore.Query<firebase.firestore.DocumentData>
    | null
    | undefined
): [T | undefined, boolean, Error | undefined] => {
  const [data, setData] = useState<T | undefined>(undefined);

  const [snapshots, loading, error] = useCollection(
    firebase.firestore().collection('rooms')
  );

  useEffect(() => {
    if (!loading && !error && snapshots) {
      if (!snapshots.empty) {
        const updatedData = snapshots.docs.map((room) => room.data());
        setData((updatedData as unknown) as T);
      }
    }
  }, [snapshots, loading, error]);

  return [data, loading, error];
};
