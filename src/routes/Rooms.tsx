import React, { useEffect, useState } from 'react';
import { useList } from 'react-firebase-hooks/database';
import firebase from '../firebase';
import {
  Box,
  Spinner,
  Text,
  Button,
  Heading,
  Stack,
  Flex,
} from '@chakra-ui/core';
import { Link, Redirect } from 'react-router-dom';
import RoomSongDisplay from '../components/RoomSongDisplay';
import { useRecoilValue } from 'recoil';
import {
  accessTokenState,
  spotifyApiState,
  userInformationState,
} from '../state';
import { RoomInformation } from '../state/roomInformation';
import JoinPrivateRoom from '../components/JoinPrivateRoom';

interface Props {}

export const Rooms = () => {
  const accessToken = useRecoilValue(accessTokenState);
  const spotifyApi = useRecoilValue(spotifyApiState);
  const user = useRecoilValue(userInformationState);
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

  let publicTrackCount = 0;
  for (const room of rooms) {
    if (user) {
      if (room.owner.id === user?.details.id) {
        return <Redirect to={`rooms/${room.id}`} />;
      }
    }
    if (room.isPublic) publicTrackCount += 1;
  }

  return (
    <Box>
      <Flex
        align='center'
        justify='space-between'
        direction={['column', 'row', 'row', 'row']}
      >
        <Heading flex={1} textAlign='left' mb={[2, 0, 0, 0]}>
          Public Rooms
        </Heading>
        <JoinPrivateRoom />
      </Flex>
      {publicTrackCount === 0 ? (
        <Stack>
          <Text mt={8} maxW={500}>
            It looks like there aren't any people sharing their music right now.
            Why don't you become the first?
          </Text>
          <Link to='/choose-song'>
            <Button
              variant='solid'
              variantColor='green'
              size='lg'
              rightIcon='arrow-forward'
              mt={6}
            >
              Share your music
            </Button>
          </Link>
        </Stack>
      ) : (
        <>
          {tracks.map((track, index) => {
            if (rooms[index].isPublic) {
              return (
                <RoomSongDisplay
                  key={index}
                  track={track}
                  room={rooms[index]}
                />
              );
            }
            return <></>;
          })}
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
