import React, { useState, useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import SongControlButton from './SongControlButton';
import {
  FiPause,
  FiSkipBack,
  FiSkipForward,
  FiPlay,
  FiLink2,
} from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { spotifyApiState } from '../state';

interface Props {
  isPlaying: boolean;
  isOwner: boolean;
  isDisabled?: boolean;
}

const SongControl = ({ isPlaying, isOwner, isDisabled }: Props) => {
  const spotifyApi = useRecoilValue(spotifyApiState);
  const [changeToIsPlaying, setChangeToIsPlaying] = useState(true);

  useEffect(() => {
    setChangeToIsPlaying(isPlaying);
  }, [isPlaying]);

  return (
    <Flex height={12} align='center' justify='center'>
      <SongControlButton
        label='Sync Playback'
        onClick={() => {}}
        isDisabled={isDisabled || !isOwner}
      >
        <FiLink2 fontSize='1.5em' />
      </SongControlButton>
      <SongControlButton
        label={isPlaying ? 'Pause Playback' : 'Resume Playback'}
        isDisabled={
          isDisabled || isOwner ? changeToIsPlaying !== isPlaying : true
        }
        onClick={() => {
          setChangeToIsPlaying(!isPlaying);
          isPlaying ? spotifyApi.pause() : spotifyApi.play();
        }}
      >
        {changeToIsPlaying === isPlaying ? (
          isPlaying ? (
            <FiPause fontSize='1.5em' />
          ) : (
            <FiPlay fontSize='1.5em' />
          )
        ) : (
          <Spinner />
        )}
      </SongControlButton>
      <SongControlButton
        label='Skip Song'
        onClick={() => spotifyApi.skipToNext()}
        isDisabled={isDisabled || !isOwner}
      >
        <FiSkipForward fontSize='1.5em' />
      </SongControlButton>
    </Flex>
  );
};

export default SongControl;
