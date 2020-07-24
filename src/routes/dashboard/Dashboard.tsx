import React from 'react';
import { Flex, Box } from '@chakra-ui/core';
import PlaybackHeader from '../../components/PlaybackHeader/PlaybackHeader';
import firebase from '../../lib/firebase';
import { RoomInformation } from '../../models/RoomInformation';
import DashboardWelcome from '../../components/Dashboard/Welcome';
import DashboardFavoritedRooms from '../../components/Dashboard/FavoritedRooms';
import DashboardPublicRooms from '../../components/Dashboard/PublicRooms';
import { useCollectionData } from '../../hooks/firebase/useCollectionData';

interface Props {}

export const Dashboard = (props: Props) => {
  const [rooms, isLoading] = useCollectionData<RoomInformation[]>(
    firebase.firestore().collection('rooms')
  );

  return (
    <Box minH='100vh'>
      <PlaybackHeader isHome />
      <Flex
        direction='column'
        align='center'
        maxW={1200}
        p={[0, 8, 12, 16]}
        margin='0 auto'
      >
        <DashboardWelcome />
        <DashboardFavoritedRooms rooms={rooms} isLoading={isLoading} />
        <DashboardPublicRooms rooms={rooms} isLoading={isLoading} />
      </Flex>
    </Box>
  );
};

export default Dashboard;
