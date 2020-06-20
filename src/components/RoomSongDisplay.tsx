import React from 'react';
import {
  Flex,
  Stack,
  Heading,
  Slider,
  Image,
  Text,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Box,
} from '@chakra-ui/core';
import { Link } from 'react-router-dom';
import { RoomInformation } from '../state/roomInformation';
// import { FiPlay, FiPause } from 'react-icons/fi';

interface Props {
  room: RoomInformation;
  track: SpotifyApi.TrackObjectFull;
}

const RoomSongDisplay = ({ room, track }: Props) => {
  // const listenersLength = Object.keys(document.users).length;
  const owners: {
    imageUrl: string;
    name: string;
    owner: boolean;
  }[] = [];
  if (room.users) {
    for (const user of Object.values(room.users)) {
      if (user.owner) owners.push(user);
    }
  }

  return (
    <Link to={`/rooms/${room.id}`}>
      <Box>
        <Flex align='center' mt={8}>
          <Box maxW='20%' pos='relative'>
            <Image src={track.album.images[0].url} w='100%' h='100%' />
            {/* <Flex
              background='rgba(0, 0, 0, 0.1)'
              zIndex={1}
              position='absolute'
              w='100%'
              h='100%'
              top={0}
              left={0}
              align='center'
              justify='center'
            >
              {room.song.isPlaying ? (
                <FiPlay color='white' fontSize='2.5em' />
              ) : (
                <FiPause color='white' fontSize='2.5em' />
              )}
            </Flex> */}
          </Box>
          <Stack textAlign='left' width='100%' ml={4} flex={1}>
            <Heading size='md'>
              {owners.length > 0 ? owners[0].name : ''}'s Room
            </Heading>
            <Text>
              {track.name} •{' '}
              {track.artists.map(
                (artist, index) =>
                  `${artist.name}${
                    track.artists.length - 1 === index ? '' : ', '
                  }`
              )}
            </Text>
            <Slider
              min={0}
              max={track.duration_ms / 1000}
              value={room.song.progress / 1000} // Date.now() - document.song.addedAt +
            >
              <SliderTrack />
              <SliderFilledTrack />
              <SliderThumb size={4} />
            </Slider>
          </Stack>
        </Flex>
      </Box>
    </Link>
  );
};

export default RoomSongDisplay;
