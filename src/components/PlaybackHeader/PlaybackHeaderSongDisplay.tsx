import React from 'react';
import { Box, Button, Text } from '@chakra-ui/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import DashboardSongDisplay from '../Room/DashboardSongDisplay';
import { displayedModalState } from '../../state/displayedModal';
import { roomInformationState } from '../../state/roomInformation';

interface Props {}

const PlaybackHeaderSongDisplay = (props: Props) => {
  const roomInformation = useRecoilValue(roomInformationState);
  const setDisplayedModal = useSetRecoilState(displayedModalState);

  return (
    <Box>
      {roomInformation ? (
        roomInformation.currentSong ? (
          <DashboardSongDisplay
            title={roomInformation.currentSong.name}
            artist={roomInformation.currentSong.artists[0]}
            album={roomInformation.currentSong.album.name}
            src={roomInformation.currentSong.album.image.src}
          />
        ) : (
          <Button
            leftIcon='add'
            variant='ghost'
            onClick={() => setDisplayedModal('queue-song')}
          >
            <Text ml={1}>Pick a song to play!</Text>
          </Button>
        )
      ) : (
        <Text ml={[0, 2, 4, 8]} fontWeight={500} fontSize={18}>
          Join a room to start listening to music!
        </Text>
      )}
    </Box>
  );
};

export default PlaybackHeaderSongDisplay;
