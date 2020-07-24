import React from 'react';
import { Grid, Box, Flex, Button, Avatar, Tooltip } from '@chakra-ui/core';
import DashboardSongControls from '../Room/DashboardSongControls';
import VolumeAndDeviceControl from '../Room/VolumeAndDeviceControl';
import { FiMoreVertical, FiMusic } from 'react-icons/fi';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInformationState } from '../../state/userInformation';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import ToggleColorMode from './ToggleColorMode';
import { displayedModalState } from '../../state/displayedModal';
import PlaybackHeaderSongDisplay from './PlaybackHeaderSongDisplay';
import { roomInformationState } from '../../state/roomInformation';
import { Link } from 'react-router-dom';

interface Props {
  placement?: 'top' | 'bottom';
  isHome?: boolean;
}

const PlaybackHeader = ({ placement, isHome }: Props) => {
  placement = placement || 'top';
  const { foregroundColor } = useBackgroundColor();
  const userInformation = useRecoilValue(userInformationState);
  const roomInformation = useRecoilValue(roomInformationState);
  const setDisplayedModal = useSetRecoilState(displayedModalState);

  return (
    <>
      <Box height={24} display={isHome ? 'static' : 'none'} />
      <Grid
        bg={foregroundColor}
        gridTemplateColumns={[
          '1fr auto',
          '1fr auto',
          '1fr auto',
          '1fr 3fr 1fr',
        ]}
        gridTemplateRows={'1fr'}
        py={2}
        px={[2, 8, 8, 8]}
        boxShadow='0px 5px 5px 0px rgba(0,0, 0, 0.075)'
        zIndex={1}
        width='100vw'
        position='fixed' //placement === 'top' ? 'static' : 'fixed'
        bottom={placement === 'bottom' ? 0 : ''}
        top={placement === 'top' ? 0 : ''}
        height={24}
      >
        <Flex
          display={['none', 'none', 'none', 'flex']}
          align='center'
          justify='center'
        >
          {roomInformation ? (
            <DashboardSongControls />
          ) : (
            <Link to='/create'>
              <Button variantColor='green' leftIcon='add'>
                Create Room
              </Button>
            </Link>
          )}
        </Flex>
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
              name={userInformation?.displayName || 'Guest User'}
              src={
                userInformation
                  ? userInformation.image.src || undefined
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
            <Button onClick={() => setDisplayedModal('playback-control')}>
              <FiMusic fontSize={20} />
            </Button>
          </Tooltip>
        </Flex>
      </Grid>
    </>
  );
};

export default PlaybackHeader;
