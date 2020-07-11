import React, { useState } from 'react';
import {
  Stack,
  Text,
  Heading,
  RadioButtonGroup,
  Button,
} from '@chakra-ui/core';
import RadioOption from '../components/RadioOption';
import { Redirect } from 'react-router-dom';

export type SearchOrShareResponse = 'search' | 'share';

interface Props {}

export const SearchOrShare = (props: Props) => {
  const [value, setValue] = useState<SearchOrShareResponse>('share');
  const [submitted, setSubmitted] = useState(false);

  if (submitted)
    return <Redirect to={value === 'search' ? 'rooms' : 'create'} />;

  return (
    <Stack align='center' justify='center'>
      <Text>Welcome! You're successfully signed in.</Text>
      <Heading>How would you like to listen together?</Heading>
      <RadioButtonGroup
        defaultValue='share'
        isInline
        mt={5}
        width='100%'
        onChange={(e) => setValue(e as SearchOrShareResponse)}
      >
        <RadioOption
          value='share'
          title='Share your music'
          description='Share publicly or with friends.'
        ></RadioOption>
        <RadioOption
          value='search'
          title='Join another listener'
          description="Listen in to someone else's music."
        ></RadioOption>
      </RadioButtonGroup>
      <Button
        variant='solid'
        variantColor='green'
        size='lg'
        rightIcon='arrow-forward'
        mt={4}
        onClick={() => setSubmitted(true)}
      >
        Next
      </Button>
    </Stack>
  );
};

export default SearchOrShare;
