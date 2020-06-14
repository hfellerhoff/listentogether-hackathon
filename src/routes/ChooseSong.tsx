import React from 'react';
import { Stack, Heading, Button, Text } from '@chakra-ui/core';
import { FaSpotify } from 'react-icons/fa';

interface Props {
  checkPlayback: () => void;
}

export const ChooseSong = ({ checkPlayback }: Props) => {
  return (
    <Stack spacing={8}>
      <Text fontSize='lg'>STEP 1</Text>
      <Heading>Choose Something to Listen To</Heading>
      <Text>
        Open Spotify on any of your devices and pick a song. Once we detect that
        your song is playing, it will show up here.
      </Text>
      <Button
        onClick={() => checkPlayback()}
        variant='solid'
        variantColor='green'
        size='lg'
        leftIcon={() => <FaSpotify />}
      >
        <Text ml={3}>Check What's Playing</Text>
      </Button>
    </Stack>
  );
};
