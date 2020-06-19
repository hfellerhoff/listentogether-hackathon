import React, { useEffect, useState } from 'react';
import firebase from '../firebase';
import { useObject } from 'react-firebase-hooks/database';
import { useParams, Link } from 'react-router-dom';
import {
  Heading,
  Spinner,
  Button,
  Text,
  Box,
  Image,
  Flex,
  Alert,
} from '@chakra-ui/core';
import RoomSongDisplay from '../components/RoomSongDisplay';
import { FaSpotify, FaUser } from 'react-icons/fa';
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
      console.log(trackDocumentID);

      try {
        const response = await spotifyApi.getTrack(trackDocumentID);
        console.log(response);
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
    if (isOwner && !stopSearching) {
      if (!checkingPlayback) {
        setShouldCheckPlayback(true);
      }
      if (playbackInformation && room) {
        updateRoom(room, playbackInformation);
      }
    }
    if (!isOwner && shouldBeListening && room) {
      if (user && !isListening) {
        addUserToRoom(room, user);
      }
      if (isListening) {
        spotifyApi.play({
          uris: [room.song.uri],
          position_ms: Date.now() - room.song.addedAt + room.song.progress,
        });
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
      if (user.id in room?.users) {
        const owner = room.users[user.id].owner;
        if (owner !== isOwner) {
          if (!checkingPlayback) setShouldCheckPlayback(true);
          spotifyApi.play();
          setIsOwner(owner);
        }
      }
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
    if (isOwner)
      firebase
        .database()
        .ref('rooms/' + roomID)
        .remove();
    else {
      if (user && room) {
        spotifyApi.pause();
        removeUserFromRoom(room, user);
      }
    }
  };

  return (
    <div>
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
          {isOwner ? <SongControl isPlaying={room.song.isPlaying} /> : <></>}
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
              <Box mt={4}>
                {Object.values(room.users).map((user, index) => (
                  <Flex key={index} mt={2}>
                    {user.imageUrl ? (
                      <Image
                        src={user.imageUrl}
                        w={8}
                        h={8}
                        borderRadius='50%'
                      />
                    ) : (
                      <Flex
                        background='#11151C'
                        w={8}
                        h={8}
                        align='center'
                        justify='center'
                        borderRadius='50%'
                      >
                        <FaUser />
                      </Flex>
                    )}
                    <Text ml={3} mt={0.5}>
                      {user.name}
                    </Text>
                  </Flex>
                ))}
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
          <Spinner size='lg' mt={8} mb={4} />
          <Text>Not loading? Try joining the room from the home screen.</Text>
          <Link to={`/`}>
            <Button
              variant='solid'
              variantColor='green'
              size='lg'
              rightIcon='arrow-forward'
              mt={4}
            >
              Go Home
            </Button>
          </Link>
        </Box>
      )}
      <Text color='#9EA5B3' mt={8}>
        Room ID: {roomID}
      </Text>
    </div>
  );
};

export default Room;
