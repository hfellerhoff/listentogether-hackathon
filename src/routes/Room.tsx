import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { useObject } from 'react-firebase-hooks/database';
import { useParams, Link } from 'react-router-dom';
import { Heading, Spinner, Button, Text, Box, Alert } from '@chakra-ui/core';
import RoomSongDisplay from '../components/RoomSongDisplay';
import { FaSpotify } from 'react-icons/fa';
import updateRoom from '../firebase/updateRoom';
import { useRecoilValue, useRecoilState } from 'recoil';
import {
  accessTokenState,
  spotifyApiState,
  userInformationState,
  playbackInformationState,
} from '../state';
import addUserToRoom from '../firebase/addUserToRoom';
import removeUserFromRoom from '../firebase/removeUserFromRoom';
import {
  roomInformationState,
  RoomInformation,
} from '../state/roomInformation';
import SongControl from '../components/SongControl';
import Layout from '../components/layout';
import ListenerDisplay from '../components/ListenerDisplay';
import destroyRoom from '../firebase/destroyRoom';

interface Props {
  checkingPlayback: boolean;
  setShouldCheckPlayback: (value: boolean) => void;
}

export const Room = ({ checkingPlayback, setShouldCheckPlayback }: Props) => {
  const { roomID } = useParams();
  const accessToken = useRecoilValue(accessTokenState);
  const spotifyApi = useRecoilValue(spotifyApiState);
  const user = useRecoilValue(userInformationState);
  const [room, setRoom] = useRecoilState(roomInformationState);
  const playbackInformation = useRecoilValue(playbackInformationState);
  const [track, setTrack] = useState<
    SpotifyApi.SingleTrackResponse | undefined
  >();

  const [value, loading, error] = useObject(
    firebase.database().ref('rooms/' + roomID)
  );

  const [lastTrackFetch, setLastTrackFetch] = useState(0);
  // const [lastSynced, setLastSynced] = useState<number>(0);

  const [isOwner, setIsOwner] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [shouldBeListening, setShouldBeListening] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [stopSearching, setStopSearching] = useState(false);

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  useEffect(() => {
    if (loading || error || !value) return;

    const fetchTrack = async () => {
      if (!value) return;

      const document = (await value.val()) as RoomInformation;
      if (!document) {
        setIsDeleted(true);
        return;
      }
      setRoom(document);
      const trackDocumentID = document.song.id;

      try {
        const response = await spotifyApi.getTrack(trackDocumentID);
        setTrack(response);
      } catch (error) {
        console.error(error);
      }
    };

    if (Date.now() - lastTrackFetch > 1000 && !stopSearching) {
      fetchTrack();
      setLastTrackFetch(Date.now());
    }
  }, [
    value,
    loading,
    error,
    spotifyApi,
    lastTrackFetch,
    stopSearching,
    setRoom,
  ]);

  useEffect(() => {
    if (!stopSearching) {
      if (!checkingPlayback) {
        setShouldCheckPlayback(true);
      }
      if (isOwner && playbackInformation && room) {
        updateRoom(room, playbackInformation);
      }
    }
    if (!isOwner && shouldBeListening && room) {
      if (user) {
        const now = Date.now();
        const progress = now - room.song.addedAt + room.song.progress;

        if (!room.song.isPlaying && playbackInformation?.is_playing) {
          spotifyApi.pause();
        } else if (room.song.isPlaying && !playbackInformation?.is_playing) {
          spotifyApi.play({
            uris: [room.song.uri],
            position_ms: progress,
          });
        } else if (room.song.isPlaying) {
          // && now - lastSynced > 1000
          // setLastSynced(now);
          let isOutOfSync = true;
          if (playbackInformation) {
            const progressDifference = Math.abs(
              (playbackInformation.progress_ms || 0) - progress
            );
            const isSameSong = playbackInformation.item?.id === room.song.id;
            console.log('-----------');
            console.log('Progress Difference: ' + progressDifference);
            if (progressDifference < 1000 && isSameSong) isOutOfSync = false;

            console.log('In Sync: ' + !isOutOfSync);
            if (isOutOfSync) {
              console.log('Syncing up...');
              spotifyApi.play({
                uris: [room.song.uri],
                position_ms: progress,
              });
            }
          }
        }
        if (!isListening) {
          addUserToRoom(room, user);
          setIsListening(true);
        }
      }
    } else if (!isOwner && !shouldBeListening && isListening && room && user) {
      try {
        spotifyApi.pause();
        removeUserFromRoom(room, user);
        setIsListening(false);
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    accessToken,
    checkingPlayback,
    isListening,
    isOwner,
    playbackInformation,
    room,
    roomID,
    setShouldCheckPlayback,
    shouldBeListening,
    spotifyApi,
    stopSearching,
    user,
  ]);

  useEffect(() => {
    if (room && track && user) {
      setIsOwner(room.owner.id === user.details.id);
    }
  }, [
    track,
    user,
    isOwner,
    checkingPlayback,
    setShouldCheckPlayback,
    spotifyApi,
    room,
  ]);

  const buttonColor = isOwner ? {} : { color: '#9EA5B3' };
  const variantColor = isOwner ? { variantColor: 'red' } : {};

  const handleLeaveRoom = () => {
    setStopSearching(true);
    if (isOwner) {
      if (room && user) {
        setIsDeleted(true);
        destroyRoom(room, user);
      }
    } else {
      if (user && room) {
        spotifyApi.pause();
        removeUserFromRoom(room, user);
      }
    }
  };

  return (
    <Layout
      title={room ? `${room.owner.name}'s Room` : `Listening Room`}
      centered
      boxed
      maxW={550}
    >
      <Link to={`/rooms`}>
        <Button
          variant={isOwner ? 'solid' : 'link'}
          leftIcon='arrow-back'
          isDisabled={!room || !track}
          onClick={handleLeaveRoom}
          {...buttonColor}
          {...variantColor}
        >
          {isOwner ? 'Destroy Room' : 'Leave Room'}
        </Button>
      </Link>
      {room && track ? (
        <>
          <RoomSongDisplay track={track} room={room} />
          <SongControl isOwner={isOwner} isPlaying={room.song.isPlaying} />
          <Heading size='md' mt={8} textAlign='left'>
            Currently Listening
          </Heading>
          {isDeleted ? (
            <Alert status='error' mt={2}>
              <Text textAlign='left'>
                This room has been deleted by the owner.
              </Text>
              <Link to='/rooms'>
                <Button>Leave Room</Button>
              </Link>
            </Alert>
          ) : (
            <>
              <Box mt={2}>
                <ListenerDisplay user={room.owner} isOwner />
                {room.listeners ? (
                  Object.values(room.listeners).map((listener, index) => (
                    <ListenerDisplay key={index} user={listener} />
                  ))
                ) : (
                  <></>
                )}
              </Box>
              <Button
                onClick={() => {
                  setShouldBeListening((value) => !value);
                }}
                variant='solid'
                variantColor='green'
                size='lg'
                leftIcon={() => <FaSpotify />}
                mt={8}
                isDisabled={isOwner}
              >
                <Text ml={3}>
                  {isOwner
                    ? 'Already Listening'
                    : shouldBeListening
                    ? 'Stop Listening'
                    : 'Start Listening'}
                </Text>
              </Button>
            </>
          )}
        </>
      ) : (
        <Box>
          <Spinner size='lg' mt={8} mb={6} />
          <Text>
            Not loading? Make sure your room ID is correct and try again.
          </Text>
          <Link to={`/rooms`}>
            <Button variant='solid' variantColor='green' size='lg' mt={6}>
              Back
            </Button>
          </Link>
        </Box>
      )}
      {!room?.isPublic ? (
        <Box mt={12}>
          <Text mb={2}>
            This is a private room. Share this ID with your friends to allow
            them to join:
          </Text>
          <Heading size='md'>{roomID}</Heading>
        </Box>
      ) : (
        <Text color='#9EA5B3' mt={8}>
          Room ID: {roomID}
        </Text>
      )}
    </Layout>
  );
};

export default Room;
