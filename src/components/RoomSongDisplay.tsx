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
import { TrackDocument } from '../firebase/createRoom';
import { Link } from 'react-router-dom';

interface Props {
  document: TrackDocument;
  track: SpotifyApi.TrackObjectFull;
}

const RoomSongDisplay = ({ document, track }: Props) => {
  // const listenersLength = Object.keys(document.users).length;
  const owners: {
    imageUrl: string;
    name: string;
    owner: boolean;
  }[] = [];
  if (document.users) {
    for (const user of Object.values(document.users)) {
      if (user.owner) owners.push(user);
    }
  }

  return (
    <Link to={`/rooms/${document.id}`}>
      <Box>
        <Flex align='center' mt={8}>
          <Image src={track.album.images[0].url} maxW='20%' />
          <Stack textAlign='left' width='100%' ml={4}>
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
              value={document.song.progress / 1000} // Date.now() - document.song.addedAt +
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
