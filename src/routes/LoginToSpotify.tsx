import React from 'react';
import {
  Heading,
  Button,
  Stack,
  Text,
  Link as ExternalLink,
} from '@chakra-ui/core';
import { FaSpotify } from 'react-icons/fa';

interface Props {}

const loginLink =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/listen-together-hf/us-central1/app/login'
    : 'https://us-central1-listen-together-hf.cloudfunctions.net/app/login';

export const LoginToSpotify = (props: Props) => {
  return (
    <Stack spacing={6}>
      <Heading size='2xl'>Listen Together</Heading>
      <Text fontSize='lg'>
        Grab some friends, connect your Spotify account, and listen to music in
        sync with each other.
      </Text>
      <ExternalLink href={loginLink}>
        <Button
          my={4}
          variant='solid'
          variantColor='green'
          size='lg'
          leftIcon={() => <FaSpotify />}
        >
          <Text ml={3}>Login with Spotify</Text>
        </Button>
      </ExternalLink>
      <Text color='#9EA5B3'>
        Built with{' '}
        <span role='img' aria-label='heart'>
          ❤️
        </span>{' '}
        for Same Home Different Hacks – June 2020
      </Text>
    </Stack>
  );
};

export default LoginToSpotify;
