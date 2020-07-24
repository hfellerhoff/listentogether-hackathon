import React, { useState } from 'react';
import { Flex, Box } from '@chakra-ui/core';
import JoinRoomByIDButton from '../../Buttons/JoinRoomByIDButton';
import CreateRoomButton from '../../Buttons/CreateRoomButton';

interface Props {}

const FavoritedRoomsElement = (props: Props) => {
  const [showCreateRoom, setShowCreateRoom] = useState(true);

  return (
    <Flex>
      <Box display={showCreateRoom ? 'block' : 'none'}>
        <CreateRoomButton />
      </Box>
      <JoinRoomByIDButton
        toggleHideCreateRoom={() => setShowCreateRoom((value) => !value)}
      />
    </Flex>
  );
};

export default FavoritedRoomsElement;
