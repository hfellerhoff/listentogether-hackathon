import React, { useState } from 'react';
import {
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Button,
} from '@chakra-ui/core';
import { FiVolumeX, FiVolume, FiVolume1, FiVolume2 } from 'react-icons/fi';
import { useRecoilValue } from 'recoil';
import { spotifyApiState, accessTokenState } from '../../state';

interface Props {}

const VolumeSlider = (props: Props) => {
  const spotifyApi = useRecoilValue(spotifyApiState);
  const accessToken = useRecoilValue(accessTokenState);

  const [localVolume, setLocalVolume] = useState(100);

  const updateSpotifyVolume = (value: number) => {
    setLocalVolume(value);
    if (spotifyApi) {
      spotifyApi.setAccessToken(accessToken);
      spotifyApi.setVolume(value);
    }
  };

  return (
    <Flex>
      <Button
        variant='ghost'
        onClick={() => updateSpotifyVolume(localVolume > 0 ? 0 : 100)}
      >
        {localVolume < 1 ? (
          <FiVolumeX fontSize={20} />
        ) : localVolume < 33 ? (
          <FiVolume fontSize={20} />
        ) : localVolume < 66 ? (
          <FiVolume1 fontSize={20} />
        ) : (
          <FiVolume2 fontSize={20} />
        )}
      </Button>
      <Slider
        value={localVolume}
        onChange={(value) => {
          updateSpotifyVolume(value);
        }}
        onBlur={() => updateSpotifyVolume(localVolume)}
        min={0}
        max={100}
        step={1}
        w={20}
      >
        <SliderTrack />
        <SliderFilledTrack />
        <SliderThumb />
      </Slider>
    </Flex>
  );
};
export default VolumeSlider;
