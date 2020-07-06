import React from 'react';
import { Flex, Box, Heading, Text, Image } from '@chakra-ui/core';

interface Props {
  title: string;
  artist: string;
  album: string;
  playback?: {
    progress: number;
    length: number;
  };
  src?: string;
}

const DashboardSongDisplay = ({
  title,
  artist,
  album,
  playback,
  src,
}: Props) => {
  return (
    <Box>
      <Flex>
        {src ? (
          <Image
            src={src}
            height={playback ? 16 : 12}
            width={playback ? 16 : 12}
          />
        ) : (
          <Box
            background='#dddddd'
            height={playback ? 16 : 12}
            width={playback ? 16 : 12}
          ></Box>
        )}
        <Flex ml={3} justify='center' direction='column'>
          <Heading size='md' fontSize={18}>
            {title}
          </Heading>
          <Text fontSize={14}>
            {artist} • {album}
          </Text>
        </Flex>
      </Flex>
    </Box>
  );
};

export default DashboardSongDisplay;
