import React from 'react';
import { Flex } from '@chakra-ui/core';
import ProgressSlider from './ProgressSlider';
import SongControl from '../SongControl';
import { useRecoilValue } from 'recoil';
import { playbackInformationState } from '../../state';

interface Props {}

const DashboardSongControls = (props: Props) => {
  const playbackInformation = useRecoilValue(playbackInformationState);

  const playback = {
    progress: playbackInformation ? playbackInformation.progress_ms || 0 : 0,
    length: playbackInformation
      ? playbackInformation.item?.duration_ms || 1
      : 1,
  };

  return (
    <Flex direction='column' align='center' justify='center'>
      <SongControl
        isPlaying={playbackInformation ? playbackInformation.is_playing : false}
        isOwner={true}
      />
      <ProgressSlider playback={playback} />
    </Flex>
  );
};

export default DashboardSongControls;
