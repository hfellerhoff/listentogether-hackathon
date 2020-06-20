import React from 'react';
import {
  Heading,
  Button,
  Stack,
  Text,
  Link as ExternalLink,
} from '@chakra-ui/core';
import { FaSpotify } from 'react-icons/fa';
import LogoButton from '../components/LogoButton';

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
      <a href={loginLink}>
        <Button
          mt={4}
          mb={10}
          variant='solid'
          variantColor='green'
          size='lg'
          leftIcon={() => <FaSpotify />}
        >
          <Text ml={3}>Login with Spotify</Text>
        </Button>
      </a>
      <Text color='#9EA5B3' m={0}>
        Built by
        <LogoButton />
        for{' '}
        <ExternalLink
          href='https://samehomedifferenthacks.devpost.com/?ref_content=default&ref_feature=challenge&ref_medium=portfolio'
          target='_blank'
          rel='noopener noreferrer'
        >
          Same Home Different Hacks
        </ExternalLink>{' '}
        – June 2020
      </Text>
    </Stack>
  );
};

export default LoginToSpotify;
