import React, { useEffect, useState } from 'react';
import {
  Text,
  Flex,
  useColorMode,
  Heading,
  Box,
  Button,
  Image,
} from '@chakra-ui/core';
import logoLight from '../assets/logo-light.svg';
import logoDark from '../assets/logo-dark.svg';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '../state';
import { getFirstName } from '../util/user';
import PlaybackHeader from '../components/PlaybackHeader/PlaybackHeader';
import { Link } from 'react-router-dom';
import useBackgroundColor from '../hooks/useBackgroundColor';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from '../firebase';
import { RoomInformation } from '../models/RoomInformation';
import PublicRoomRoll from '../components/Public Rooms/PublicRoomRoll';

interface Props {}

const Home = (props: Props) => {
  const { colorMode } = useColorMode();
  const { foregroundColor } = useBackgroundColor();
  const userInformation = useRecoilValue(userInformationState);
  const [rooms, setRooms] = useState<RoomInformation[]>([]);
  const [snapshots, loading, error] = useCollection(
    firebase.firestore().collection('rooms')
  );

  useEffect(() => {
    if (!loading && !error && snapshots) {
      if (!snapshots.empty) {
        const rooms: RoomInformation[] = snapshots.docs.map(
          (room) => room.data() as RoomInformation
        );
        setRooms(rooms);
      }
    }
  }, [snapshots, loading, error]);

  return (
    <Box minH='100vh'>
      <PlaybackHeader isHome />
      <Flex
        direction='column'
        align='center'
        maxW={1200}
        p={[4, 8, 12, 16]}
        margin='0 auto'
      >
        <Image
          src={colorMode === 'light' ? logoLight : logoDark}
          height={[16, 16, 20, 24]}
        />
        <Box textAlign='center' mb={[4, 4, 8, 8]} mt={[4, 4, 8, 8]}>
          <Heading size='2xl'>
            {userInformation
              ? `Welcome back, ${getFirstName(userInformation.displayName)}!`
              : 'Welcome back!'}
          </Heading>
          <Text fontSize={20}>It's great to see you again.</Text>
        </Box>
        <Flex
          align='center'
          justify='center'
          bg={foregroundColor}
          mt={[4, 4, 8, 8]}
          p={[2, 6, 8, 16]}
          width='100%'
          boxShadow='0px 5px 5px 0px rgba(0, 0, 0, 0.15)'
        >
          <Box flex={1} w='100%'>
            {rooms.length === 0 ? (
              <>
                <Text fontSize={20} mb={4}>
                  It looks like there aren't any rooms right now. Why don't you
                  create the first?
                </Text>
                <Link to='/create'>
                  <Button
                    variant='solid'
                    variantColor='green'
                    size='lg'
                    leftIcon='add'
                  >
                    Create Room
                  </Button>
                </Link>
              </>
            ) : (
              <PublicRoomRoll isHome rooms={rooms} />
            )}
          </Box>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Home;
