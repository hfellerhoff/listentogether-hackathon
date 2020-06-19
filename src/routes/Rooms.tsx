import React, { useEffect, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import firebase from '../firebase';
import { Box, Spinner, Text, Button, Heading, Stack } from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import RoomSongDisplay from '../components/RoomSongDisplay';
import { useRecoilValue } from 'recoil';
import { accessTokenState, spotifyApiState } from '../state';
import { RoomInformation } from '../state/roomInformation';

interface Props {}

export const Rooms = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const spotifyApi = useRecoilValue(spotifyApiState);
  const [snapshots, loading, error] = useList(firebase.database().ref('rooms'));
  const [rooms, setRooms] = useState<RoomInformation[]>([]);
  const [tracks, setTracks] = useState<null | SpotifyApi.TrackObjectFull[]>(
    null
  );

  useEffect(() => {
    const fetchTracks = async () => {
      if (!snapshots) return;
      const roomDocuments = snapshots.map((snapshot) => snapshot.val());
      setRooms(roomDocuments);

      if (roomDocuments.length === 0) setTracks([]);

      const roomDocumentIDs = roomDocuments.map((room) => room.song.id);

      try {
        const response = await spotifyApi.getTracks(roomDocumentIDs);
        setTracks(response.tracks);
      } catch (error) {
        console.error(error);
      }
    };

    if (!loading && !error && snapshots) {
      spotifyApi.setAccessToken(accessToken);
      fetchTracks();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [accessToken, error, loading, snapshots]);

  if (loading || !tracks) return <Spinner size='lg' />;

  return (
    <Box>
      <Heading>Join a Room</Heading>
      {tracks.length === 0 ? (
        <Stack>
          <Text mt={2} maxW={500}>
            It looks like there aren't any people sharing their music right now.
            Why don't you become the first?
          </Text>
          <Link to='/choose-song'>
            <Button
              variant='solid'
              variantColor='green'
              size='lg'
              rightIcon='arrow-forward'
              mt={4}
            >
              Share your music
            </Button>
          </Link>
        </Stack>
      ) : (
        <>
          {tracks.map((track, index) => (
            <RoomSongDisplay key={index} track={track} room={rooms[index]} />
          ))}
          <Text mt={6}>Don't see anything interesting?</Text>
          <Link to='/choose-song'>
            <Button
              variant='solid'
              variantColor='green'
              size='lg'
              rightIcon='arrow-forward'
              mt={4}
            >
              Share your music
            </Button>
          </Link>
        </>
      )}
    </Box>
  );
};

export default Rooms;
