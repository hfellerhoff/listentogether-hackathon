import React from 'react';
import {
  Flex,
  Stack,
  Heading,
  Image,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Spinner,
} from '@chakra-ui/core';
import { PlaybackInformation } from '../state/playbackInformation';

interface Props {
  songInformation: PlaybackInformation;
}

const SongDisplay = ({ songInformation }: Props) => {
  if (songInformation)
    if (songInformation.item) {
      return (
        <>
          <Flex align='center' mt={8}>
            <Image src={songInformation.item.album.images[0].url} maxW='20%' />
            <Stack textAlign='left' width='100%' ml={4}>
              <Heading size='md' m={0}>
                {songInformation.item.name}
              </Heading>
              <Text m={0}>
                {songInformation.item.artists.map(
                  (artist, index) =>
                    `${artist.name}${
                      songInformation.item
                        ? songInformation.item.artists.length - 1 === index
                          ? ''
                          : ', '
                        : ''
                    }`
                )}
              </Text>
              <Slider
                min={0}
                max={songInformation.item.duration_ms / 1000}
                value={
                  songInformation.progress_ms
                    ? songInformation.progress_ms / 1000
                    : 0
                }
              >
                <SliderTrack />
                <SliderFilledTrack />
                <SliderThumb size={4} />
              </Slider>
            </Stack>
          </Flex>
        </>
      );
    }
  return (
    <Stack spacing={10} align='center' mt={10}>
      <Spinner size='lg' />
      <Text>
        If you haven't started to play a song yet, please do that now.
        Otherwise, you may be looking at this loading spinner for quite awhile{' '}
        <span role='img' aria-label='wink'>
          😉
        </span>
      </Text>
    </Stack>
  );
};

export default SongDisplay;
