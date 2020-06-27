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
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import audioDrawingLight from '../assets/audiodrawing-light.svg';
import audioDrawingDark from '../assets/audiodrawing-dark.svg';
import { FaSpotify } from 'react-icons/fa';
import TextLoop from 'react-text-loop';

interface Props {}

const loginLink =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? 'http://localhost:5001/listen-together-hf/us-central1/app/login'
    : 'https://us-central1-listen-together-hf.cloudfunctions.net/app/login';

export const LandingPage = (props: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Box minH='100vh' py={16}>
      <Flex align='center' justify='center' mb={8}>
        <Image
          src={colorMode === 'light' ? logoLight : logoDark}
          height={32}
          mb={[0, 0, 0, 16]}
        />
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
          mt={[8, 16, 16, 0]}
        >
          <Box mr={[0, 0, 0, 16]} flex={[0, 0, 0, 1]} maxW={600}>
            <TextLoop interval={4000}>
              <Heading fontSize={[28, 48, 60, 72]}>Jam out</Heading>
              <Heading fontSize={[28, 48, 60, 72]}>Be the DJ</Heading>
              <Heading fontSize={[28, 48, 60, 72]}>Share music</Heading>
              <Heading fontSize={[28, 48, 60, 72]}>Listen together</Heading>
            </TextLoop>
            <Heading fontSize={[18, 24, 30, 30]}>
              no matter where you are.
            </Heading>
            <Text fontSize='1.4em' mt={8} maxW={600}>
              Grab some friends, connect your Spotify account, and listen to
              music in sync with each other.
            </Text>
            <Box mt={12} mb={10}>
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
              {/* <Button
                ml={4}
                variant='solid'
                variantColor='pink'
                size='lg'
                leftIcon={() => <FaApple />}
                // boxShadow='0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
                isDisabled
              >
                <Text ml={3}>Coming soon!</Text>
              </Button> */}
            </Box>
          </Box>
          <Flex align='center' justify='flex-end'>
            <Image
              src={colorMode === 'light' ? audioDrawingLight : audioDrawingDark}
              height={['20em', '20em', 40, '18em']}
              display={['none', 'none', 'none', 'block']}
            />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default LandingPage;
