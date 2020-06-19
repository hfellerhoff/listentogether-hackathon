import React from 'react';
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
  createRoom: () => void;
}

export const ShareSong = ({ songInformation, createRoom }: Props) => {
  // const [value, setValue] = useState('public');

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
            // onChange={(e) => setValue(e as string)}
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
              isDisabled
            ></RadioOption>
          </RadioButtonGroup>
          <Button
            variant='solid'
            variantColor='green'
            size='lg'
            rightIcon='arrow-forward'
            mt={4}
            onClick={() => createRoom()}
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
