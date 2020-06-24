import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Text, Input, Icon, Flex } from '@chakra-ui/core';
import { FiUsers } from 'react-icons/fi';

interface Props {}

const JoinPrivateRoom = (props: Props) => {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const [roomID, setRoomID] = useState('');
  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomID(event.target.value);

  if (showInput) {
    return (
      <Flex align='center' justify='flex-end'>
        <Input
          width={40}
          placeholder='Room ID'
          value={roomID}
          onChange={handleIDChange}
        />
        <Button onClick={() => history.push(`/rooms/${roomID}`)}>
          <Icon name='arrow-forward' />
        </Button>
      </Flex>
    );
  }

  return (
    <Button
      variant='link'
      variantColor='green'
      size='lg'
      leftIcon={() => <FiUsers />}
      onClick={() => setShowInput(true)}
    >
      <Text ml={2}>Join private room</Text>
    </Button>
  );
};

export default JoinPrivateRoom;
