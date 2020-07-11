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
  standalone?: boolean;
  imageRef?: React.MutableRefObject<HTMLImageElement | undefined>;
}

const DashboardSongDisplay = ({
  title,
  artist,
  album,
  playback,
  src,
  standalone,
  imageRef,
}: Props) => {
  if (standalone && src)
    return (
      <Box>
        <Flex direction='column' align='center' justify='space-between'>
          <Image src={src} height={32} width={32} ref={imageRef} />
          <Box>
            <Heading size='sm' mt={4}>
              {title}
            </Heading>
            <Text>{artist}</Text>
          </Box>
        </Flex>
      </Box>
    );
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
