import React from 'react';
import {
  Box,
  Image,
  useColorMode,
  Flex,
  Text,
  Button,
  Heading,
} from '@chakra-ui/core';
import { FaSpotify, FaApple } from 'react-icons/fa';

import audioDrawingDark from '../assets/audiodrawing-dark.svg';
import audioDrawingLight from '../assets/audiodrawing-light.svg';
import logoDark from '../assets/logo-dark.svg';
import logoLight from '../assets/logo-light.svg';
import { LandingPageTextLoop } from '../components/LandingPage';

const loginLink =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/listen-together-hf/us-central1/app/login'
    : 'https://us-central1-listen-together-hf.cloudfunctions.net/app/login';

export const LandingPage = () => {
  const { colorMode } = useColorMode();

  return (
    <Box minH='100vh' py={16}>
      <Flex align='center' justify='center' mb={[8, 8, 8, 24]}>
        <Image src={colorMode === 'light' ? logoLight : logoDark} height={32} />
      </Flex>
      <Flex align='center' justify='center'>
        <Flex
          align='center'
          justify={['center', 'center', 'center', 'space-between']}
          direction={[
            'column-reverse',
            'column-reverse',
            'column-reverse',
            'row',
          ]}
          flex={1}
          maxW={1100}
          mx={[8, 8, 8, 20]}
          mt={[8, 8, 8, 0]}
        >
          <Box
            mt={[16, 16, 16, 0]}
            mr={[0, 0, 0, 16]}
            flex={[0, 0, 0, 1]}
            maxW={600}
          >
            <LandingPageTextLoop
              text={['Jam out', 'Be the DJ', 'Share music', 'Listen together']}
            />
            <Heading fontSize={[18, 24, 30, 30]}>
              no matter where you are.
            </Heading>
            <Text fontSize='1.4em' mt={8} maxW={600}>
              Grab some friends, connect your Spotify account, and listen to
              music in sync with each other.
            </Text>
            <Flex
              mt={12}
              mb={10}
              direction={['column', 'column', 'row', 'row']}
            >
              <a href={loginLink}>
                <Button
                  variant='solid'
                  variantColor='green'
                  size='lg'
                  leftIcon={() => <FaSpotify />}
                  boxShadow='0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
                >
                  <Text ml={3}>Login with Spotify</Text>
                </Button>
              </a>
              <a
                href='https://www.listentogether.app'
                onClick={(e) => e.preventDefault()}
              >
                <Button
                  ml={[0, 0, 4, 4]}
                  mt={[4, 4, 0, 0]}
                  variant='solid'
                  variantColor='red'
                  size='lg'
                  leftIcon={() => <FaApple />}
                  boxShadow='0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
                  isDisabled
                >
                  <Text ml={3}>Coming soon!</Text>
                </Button>
              </a>
            </Flex>
          </Box>
          <Flex align='center' justify='flex-end'>
            <Image
              src={colorMode === 'light' ? audioDrawingLight : audioDrawingDark}
              height={['12em', '14em', '16em', '18em']}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingPage;
