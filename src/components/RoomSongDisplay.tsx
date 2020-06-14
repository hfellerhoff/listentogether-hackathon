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

interface Props {
  document: TrackDocument;
  track: SpotifyApi.SingleTrackResponse;
}

const RoomListSongDisplay = ({ document, track }: Props) => {
  const listenersLength = Object.keys(document.users).length;

  return (
    <Box>
      <Flex align='center' mt={8}>
        <Image src={track.album.images[0].url} maxW='20%' />
        <Stack textAlign='left' width='100%' ml={4}>
          <Heading size='md'>{track.name}</Heading>
          <Text>
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
            value={
              (Date.now() - document.song.addedAt + document.song.progress) /
              1000
            }
          >
            <SliderTrack />
            <SliderFilledTrack />
            <SliderThumb size={4} />
          </Slider>
        </Stack>
      </Flex>
      <Flex align='flex-start' mt={2}>
        <Text>
          {listenersLength}{' '}
          {listenersLength === 1 ? 'person is ' : 'people are '}
          listening
        </Text>
      </Flex>
    </Box>
  );
};

export default RoomListSongDisplay;
