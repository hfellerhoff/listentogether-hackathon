import React from 'react';
import { Box, Heading, Grid, Text } from '@chakra-ui/core';
import { RoomInformation } from '../../models/RoomInformation';
import RoomCardDisplay from './RoomCardDisplay';

interface Props {
  isHome?: boolean;
  rooms: RoomInformation[];
}

const PublicRoomRoll = ({ isHome, rooms }: Props) => {
  return (
    <Box>
      <Box textAlign={['center', 'center', 'left', 'left']}>
        <Text display={isHome ? 'block' : 'none'} fontSize={18}>
          Looking to discover new music?
        </Text>
        <Heading>Public Rooms</Heading>
      </Box>
      <Grid
        mt={[4, 4, 8, 8]}
        templateColumns='repeat(auto-fit, minmax(300px, 1fr))'
        templateRows='1fr'
        gap={[2, 2, 4, 4]}
        alignItems='stretch'
        justifyContent='stretch'
      >
        {rooms.map((room, index) => {
          return <RoomCardDisplay room={room} key={index} />;
        })}
      </Grid>
    </Box>
  );
};

export default PublicRoomRoll;
