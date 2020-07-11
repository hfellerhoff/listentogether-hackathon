import React, { useState } from 'react';
import { Box, Heading, Stack, Button, Flex, Icon } from '@chakra-ui/core';
import { useRecoilValue } from 'recoil';
import { roomInformationState } from '../../state/roomInformation';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import { Link } from 'react-router-dom';

interface Props {}

const DashboardBottomBar = (props: Props) => {
  const { foregroundColor } = useBackgroundColor();
  const roomInformation = useRecoilValue(roomInformationState);
  const [bottomBarShown, setBottomBarShown] = useState(false);

  if (!roomInformation)
    return (
      <Box p={4}>
        <Heading>No room selected.</Heading>
      </Box>
    );

  return (
    <Box>
      <Flex justify='flex-end'>
        <Button
          display={['block', 'block', 'none', 'none']}
          onClick={() => setBottomBarShown((value) => !value)}
          variant='outline'
          variantColor='green'
        >
          <Icon name={bottomBarShown ? 'chevron-down' : 'chevron-up'} />
        </Button>
      </Flex>
      <Stack
        p={4}
        bg={foregroundColor}
        align='center'
        justify='center'
        display={bottomBarShown ? 'flex' : ['none', 'none', 'flex', 'flex']}
      >
        <Heading size='lg'>{roomInformation.name}</Heading>
        <Flex>
          <Link to='/dashboard'>
            <Button variantColor='red' leftIcon='close' size='sm' mr={1}>
              Leave Room
            </Button>
          </Link>
          <Button variantColor='blue' leftIcon='add' size='sm' ml={1}>
            Follow Room
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default DashboardBottomBar;
