import React, { useState } from 'react';
import { Flex, Spinner } from '@chakra-ui/core';
import SongControlButton from './SongControlButton';
import { FiPause, FiSkipBack, FiSkipForward, FiPlay } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { spotifyApiState } from '../state';

interface Props {
  isPlaying: boolean;
}

const SongControl = ({ isPlaying }: Props) => {
  const spotifyApi = useRecoilValue(spotifyApiState);
  const [changeToIsPlaying, setChangeToIsPlaying] = useState(true);

  return (
    <Flex height={12} mt={6} align='center' justify='center'>
      <SongControlButton>
        <FiSkipBack fontSize='1.5em' />
      </SongControlButton>
      <SongControlButton
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
      <SongControlButton>
        <FiSkipForward fontSize='1.5em' />
      </SongControlButton>
    </Flex>
  );
};

export default SongControl;
