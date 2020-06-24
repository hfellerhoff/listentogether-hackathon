import React, { useState, useEffect } from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import SongControlButton from './SongControlButton';
import { FiPause, FiSkipBack, FiSkipForward, FiPlay } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { spotifyApiState } from '../state';

interface Props {
  isPlaying: boolean;
  isOwner: boolean;
}

const SongControl = ({ isPlaying, isOwner }: Props) => {
  const spotifyApi = useRecoilValue(spotifyApiState);
  const [changeToIsPlaying, setChangeToIsPlaying] = useState(true);

  useEffect(() => {
    setChangeToIsPlaying(isPlaying);
  }, [isPlaying]);

  return (
    <Flex height={12} mt={6} align='center' justify='center'>
      <SongControlButton
        onClick={() => spotifyApi.skipToPrevious()}
        isDisabled={!isOwner}
      >
        <FiSkipBack fontSize='1.5em' />
      </SongControlButton>
      <SongControlButton
        isDisabled={isOwner ? changeToIsPlaying !== isPlaying : true}
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
        onClick={() => spotifyApi.skipToNext()}
        isDisabled={!isOwner}
      >
        <FiSkipForward fontSize='1.5em' />
      </SongControlButton>
    </Flex>
  );
};

export default SongControl;
