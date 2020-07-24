import React, { useState } from 'react';
import {
  Stack,
  Heading,
  Button,
  RadioButtonGroup,
  FormControl,
  Input,
  FormLabel,
} from '@chakra-ui/core';
import RadioOption from '../../components/RadioOption';
import { useHistory } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInformationState } from '../../state/userInformation';
import { roomInformationState } from '../../state/roomInformation';
import createRoom from '../../services/createRoom';

interface Props {}

export const CreateRoom = (props: Props) => {
  const history = useHistory();
  const userInformation = useRecoilValue(userInformationState);
  const setRoomInformation = useSetRecoilState(roomInformationState);
  const [selection, setSelection] = useState('public');
  const [roomName, setRoomName] = useState('');

  const handleCreateRoom = async (details: {
    isPublic: boolean;
    name: string;
  }) => {
    if (userInformation) {
      const room = await createRoom(userInformation, details);
      if (room) {
        setRoomInformation(room);
        history.push(`/rooms/${room.id}`);
      }
    }
  };

  return (
    <>
      <Heading mb={4}>Create Your Room</Heading>
      <Stack align='center' width='100%' textAlign='left' spacing={8}>
        <FormControl minWidth={[280, 350, 500, 500]}>
          <FormLabel>Room Name</FormLabel>
          <Input
            placeholder='Room Name'
            value={roomName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoomName(e.target.value)
            }
          />
        </FormControl>
        <FormControl>
          <FormLabel>Room Visibility</FormLabel>
          <RadioButtonGroup
            defaultValue='public'
            isInline
            minWidth={[280, 350, 500, 500]}
            onChange={(e) => setSelection(e as string)}
          >
            <RadioOption
              value='public'
              title='Public'
              description='Let anyone listen in.'
            ></RadioOption>
            <RadioOption
              value='private'
              title='Private'
              description='Invite friends to listen in.'
            ></RadioOption>
          </RadioButtonGroup>
        </FormControl>

        <Button
          variant='solid'
          variantColor='green'
          size='lg'
          rightIcon='arrow-forward'
          onClick={() =>
            handleCreateRoom({
              isPublic: selection === 'public',
              name: roomName,
            })
          }
        >
          Create Room
        </Button>
      </Stack>
    </>
  );
};

export default CreateRoom;
