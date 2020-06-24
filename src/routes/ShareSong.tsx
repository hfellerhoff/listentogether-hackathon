import React, { useState } from 'react';
import {
  Stack,
  Heading,
  Text,
  Button,
  RadioButtonGroup,
} from '@chakra-ui/core';
import SongDisplay from '../components/SongDisplay';
import RadioOption from '../components/RadioOption';
import { PlaybackInformation } from '../state/playbackInformation';

interface Props {
  songInformation: PlaybackInformation;
  createRoom: (isPublic: boolean) => void;
}

export const ShareSong = ({ songInformation, createRoom }: Props) => {
  const [selection, setSelection] = useState('public');

  return (
    <Stack align='center' justify='center'>
      <Text fontSize='lg'>STEP 2</Text>
      <Heading>Share Your Music</Heading>
      <SongDisplay songInformation={songInformation} />
      {songInformation ? (
        <Stack align='center' width='100%'>
          <Heading mt={10} size='sm'>
            How would you like to share your music?
          </Heading>
          <RadioButtonGroup
            defaultValue='public'
            isInline
            mt={5}
            width='100%'
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
          <Button
            variant='solid'
            variantColor='green'
            size='lg'
            rightIcon='arrow-forward'
            mt={4}
            onClick={() => createRoom(selection === 'public')}
          >
            Next
          </Button>
        </Stack>
      ) : (
        <></>
      )}
    </Stack>
  );
};

export default ShareSong;
