import React from 'react';
import { Grid, Box, Flex, Button, Avatar, Tooltip } from '@chakra-ui/core';
import DashboardSongControls from '../Dashboard/DashboardSongControls';
import VolumeAndDeviceControl from '../Dashboard/VolumeAndDeviceControl';
import { FiMoreVertical } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInformationState } from '../../state';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import ToggleColorMode from './ToggleColorMode';
import { displayedModalState } from '../../state/displayedModal';
import PlaybackHeaderSongDisplay from './PlaybackHeaderSongDisplay';

interface Props {}

const PlaybackHeader = (props: Props) => {
  const { foregroundColor } = useBackgroundColor();
  const userInformation = useRecoilValue(userInformationState);
  const setDisplayedModal = useSetRecoilState(displayedModalState);

  return (
    <Grid
      bg={foregroundColor}
      gridTemplateColumns={['1fr auto', '1fr auto', '1fr auto', '1fr 3fr 1fr']}
      gridTemplateRows={'1fr'}
      py={2}
      px={[2, 8, 8, 8]}
      boxShadow='0px 5px 5px 0px rgba(0,0, 0, 0.075)'
      zIndex={1}
      width='100vw'
    >
      <Box display={['none', 'none', 'none', 'block']}>
        <DashboardSongControls />
      </Box>
      <Flex
        p={2}
        borderRadius={4}
        width='100%'
        align='center'
        justify='space-between'
      >
        <PlaybackHeaderSongDisplay />
        <Box display={['none', 'none', 'none', 'block']}>
          <VolumeAndDeviceControl
            onSpeakerClick={() => setDisplayedModal('device-select')}
          />
        </Box>
      </Flex>
      <Flex
        align='center'
        justify='center'
        display={['none', 'none', 'none', 'flex']}
      >
        <Button variant='ghost' rightIcon='chevron-down'>
          <Avatar
            size='sm'
            name={userInformation?.details.display_name || 'Guest User'}
            src={
              userInformation?.details.images
                ? userInformation?.details.images[0]
                  ? userInformation?.details.images[0].url || undefined
                  : undefined
                : undefined
            }
          />
        </Button>
        <ToggleColorMode />
      </Flex>
      <Flex
        align='center'
        justify='center'
        display={['flex', 'flex', 'flex', 'none']}
      >
        <Tooltip
          label='Options and Playback'
          aria-label='Options and Playback'
          zIndex={2}
          hasArrow
          placement='bottom-end'
        >
          <Button
            variant='ghost'
            onClick={() => setDisplayedModal('playback-control')}
          >
            <FiMoreVertical fontSize={20} />
          </Button>
        </Tooltip>
      </Flex>
    </Grid>
  );
};

export default PlaybackHeader;
