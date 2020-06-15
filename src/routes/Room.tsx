import React, { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-js';
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
import { TrackDocument } from '../firebase/createRoom';
import RoomSongDisplay from '../components/RoomListSongDisplay';
import { FaSpotify, FaUser } from 'react-icons/fa';
import { SongInformation } from '../hooks/usePlaybackMonitor';
import updateRoom from '../firebase/updateRoom';

interface Props {
  accessToken: string;
  spotifyApi: SpotifyWebApi.SpotifyWebApiJs;
  user: SpotifyApi.CurrentUsersProfileResponse | null;
  songInformation: SongInformation;
  checkingPlayback: boolean;
  setShouldCheckPlayback: (value: boolean) => void;
}

const Room = ({
  accessToken,
  spotifyApi,
  user,
  songInformation,
  checkingPlayback,
  setShouldCheckPlayback,
}: Props) => {
  const { roomID } = useParams();
  const [value, loading, error] = useObject(
    firebase.database().ref('rooms/' + roomID)
  );
  const [trackDocument, setTrackDocument] = useState<
    TrackDocument | undefined
  >();
  const [track, setTrack] = useState<
    SpotifyApi.SingleTrackResponse | undefined
  >();

  const [lastTrackFetch, setLastTrackFetch] = useState(0);

  const [isListening, setIsListening] = useState(false);
  const [isOwner, setIsOwner] = useState(false);
  const [stopSearching, setStopSearching] = useState(false);

  const [isDeleted, setIsDeleted] = useState(false);

  const [
    currentlyPlayingTrackDocument,
    setCurrentlyPlayingTrackDocument,
  ] = useState<TrackDocument | undefined>();

  useEffect(() => {
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken, spotifyApi]);

  useEffect(() => {
    if (loading || error || !value) return;

    const fetchTrack = async () => {
      if (!value) return;

      const document = (await value.val()) as TrackDocument;
      if (!document) {
        setIsDeleted(true);
        return;
      }
      setTrackDocument(document);
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
  }, [value, loading, error, spotifyApi, lastTrackFetch, stopSearching]);

  useEffect(() => {
    if (isOwner && !stopSearching) {
      if (!checkingPlayback) {
        setShouldCheckPlayback(true);
      }
      if (songInformation && trackDocument) {
        updateRoom(trackDocument, songInformation);
      }
    }
    if (!isOwner && isListening && trackDocument) {
      if (!currentlyPlayingTrackDocument && user) {
        const users: TrackDocument['users'] = {
          ...trackDocument.users,
          [user.id]: {
            name: user.display_name ? user.display_name : user.email,
            imageUrl: user.images
              ? user.images[0]
                ? user.images[0].url
                : ''
              : '',
            owner: false,
          },
        };

        firebase
          .database()
          .ref('rooms/' + roomID)
          .update({
            users,
          });
      }
      if (
        !currentlyPlayingTrackDocument ||
        currentlyPlayingTrackDocument.song.id !== trackDocument.id
      ) {
        spotifyApi.play({
          uris: [trackDocument.song.uri],
          position_ms:
            Date.now() -
            trackDocument.song.addedAt +
            trackDocument.song.progress,
        });
        setCurrentlyPlayingTrackDocument(trackDocument);
      }
    } else if (!isOwner && !isListening && trackDocument && user) {
      // if (checkingPlayback) setShouldCheckPlayback(false);
      try {
        spotifyApi.pause();
        const users: TrackDocument['users'] = { ...trackDocument.users };
        delete users[user.id];

        firebase
          .database()
          .ref('rooms/' + roomID)
          .update({
            users,
          });
        setCurrentlyPlayingTrackDocument(undefined);
      } catch (error) {
        console.error(error);
      }
    }
  }, [
    accessToken,
    checkingPlayback,
    currentlyPlayingTrackDocument,
    isListening,
    isOwner,
    roomID,
    setShouldCheckPlayback,
    songInformation,
    spotifyApi,
    stopSearching,
    trackDocument,
    user,
  ]);

  useEffect(() => {
    if (trackDocument && track && user) {
      if (user.id in trackDocument?.users) {
        const owner = trackDocument.users[user.id].owner;
        if (owner !== isOwner) {
          if (!checkingPlayback) setShouldCheckPlayback(true);
          spotifyApi.play();
          setIsOwner(owner);
        }
      }
    }
  }, [
    trackDocument,
    track,
    user,
    isOwner,
    checkingPlayback,
    setShouldCheckPlayback,
    spotifyApi,
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
      if (user && trackDocument) {
        spotifyApi.pause();
        const users: TrackDocument['users'] = { ...trackDocument.users };
        delete users[user.id];

        firebase
          .database()
          .ref('rooms/' + roomID)
          .update({
            users,
          });
      }
    }
  };

  return (
    <div>
      <Link to={`/rooms`}>
        <Button
          variant={isOwner ? 'solid' : 'link'}
          leftIcon='arrow-back'
          isDisabled={!trackDocument || !track}
          onClick={handleLeaveRoom}
          {...buttonColor}
          {...variantColor}
        >
          {isOwner ? 'Destroy Room' : 'Leave Room'}
        </Button>
      </Link>
      {trackDocument && track ? (
        <>
          <RoomSongDisplay track={track} document={trackDocument} />
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
                {Object.values(trackDocument.users).map((user, index) => (
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
                  setIsListening(!isListening);
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
                    : isListening
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
