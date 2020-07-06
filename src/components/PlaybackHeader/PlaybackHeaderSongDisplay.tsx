import React from 'react';
import { Box, Button, Text } from '@chakra-ui/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { playbackInformationState } from '../../state';
import DashboardSongDisplay from '../Dashboard/DashboardSongDisplay';
import { displayedModalState } from '../../state/displayedModal';

interface Props {}

const PlaybackHeaderSongDisplay = (props: Props) => {
  const playbackInformation = useRecoilValue(playbackInformationState);
  const setDisplayedModal = useSetRecoilState(displayedModalState);

  return (
    <Box>
      {playbackInformation ? (
        playbackInformation.item ? (
          <DashboardSongDisplay
            title={playbackInformation.item.name}
            artist={playbackInformation.item.artists[0].name}
            album={playbackInformation.item.album.name}
            src={playbackInformation.item.album.images[0].url}
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
        <Button
          leftIcon='add'
          variant='ghost'
          onClick={() => setDisplayedModal('queue-song')}
        >
          <Text ml={1}>Pick a song to play!</Text>
        </Button>
      )}
    </Box>
  );
};

export default PlaybackHeaderSongDisplay;
