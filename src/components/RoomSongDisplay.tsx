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
import { RoomInformation } from '../models/RoomInformation';

interface Props {
  room: RoomInformation;
  track: SpotifyApi.TrackObjectFull;
}

const RoomSongDisplay = ({ room, track }: Props) => {
  return (
    <Link to={`/rooms/${room.id}`}>
      <Box>
        <Flex align='center' mt={8} mb={6}>
          <Box maxW='20%' pos='relative'>
            <Image src={track.album.images[0].url} w='100%' h='100%' />
          </Box>
          <Stack textAlign='left' width='100%' ml={4} flex={1}>
            <Heading size='md'>{room.name}</Heading>
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
              value={room.currentSong ? room.currentSong.progress / 1000 : 0} // Date.now() - document.song.addedAt +
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
