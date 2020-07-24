import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/core';

interface Props {}

const CreateRoomButton = (props: Props) => {
  return (
    <Link to='/rooms/create'>
      <Button variant='solid' variantColor='green' leftIcon='add'>
        Create Room
      </Button>
    </Link>
  );
};

export default CreateRoomButton;
