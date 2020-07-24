import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Text, Input, Icon, Flex } from '@chakra-ui/core';
import { FiLogIn, FiX } from 'react-icons/fi';

interface Props {
  toggleHideCreateRoom: () => void;
}

const JoinRoomByIDButton = ({ toggleHideCreateRoom }: Props) => {
  const history = useHistory();
  const [showInput, setShowInput] = useState(false);
  const [roomID, setRoomID] = useState('');
  const handleIDChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRoomID(event.target.value);

  const toggleInput = () => {
    setShowInput((value) => !value);
    toggleHideCreateRoom();
  };

  if (showInput) {
    return (
      <Flex align='center' justify='flex-end' ml={2}>
        <Button onClick={toggleInput}>
          <FiX />
        </Button>
        <Input
          width={40}
          placeholder='Room ID'
          value={roomID}
          onChange={handleIDChange}
        />
        <Button
          variantColor='blue'
          onClick={() => history.push(`/rooms/${roomID}`)}
        >
          <Icon name='arrow-forward' />
        </Button>
      </Flex>
    );
  }

  return (
    <Button
      ml={2}
      variantColor='blue'
      leftIcon={() => <FiLogIn />}
      onClick={toggleInput}
    >
      <Text ml={2}>Join By ID</Text>
    </Button>
  );
};

export default JoinRoomByIDButton;
