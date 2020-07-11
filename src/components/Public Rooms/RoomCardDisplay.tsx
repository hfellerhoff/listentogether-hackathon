import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PseudoBox, Heading, Box, Text } from '@chakra-ui/core';
import DashboardSongDisplay from '../Dashboard/DashboardSongDisplay';
import { RoomInformation } from '../../models/RoomInformation';
import ColorThief from 'colorthief';
import { useSetRecoilState } from 'recoil';
import { roomInformationState } from '../../state/roomInformation';
import { getBestContrast } from '../../util/getBestContrast';

interface Props {
  room: RoomInformation;
}

const RoomCardDisplay = ({ room }: Props) => {
  const setRoomInformation = useSetRecoilState(roomInformationState);
  const [rgbArrays, setRgbArrays] = useState([
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const image = useRef<HTMLImageElement>();

  useEffect(() => {
    if (image.current) {
      image.current.setAttribute('crossOrigin', '');
      image.current.onload = () => {
        const colorThief = new ColorThief();
        const img = image.current as HTMLImageElement;
        if (img.complete) {
          const colors = colorThief.getPalette(img);
          console.log(colors);

          let colorOneSet = false;
          if (!colors) return;
          for (let i = 0; i < colors.length; i += 1) {
            const color = getBestContrast(colors[i]);
            if (color === '#ffffff') {
              if (!colorOneSet) {
                setRgbArrays([colors[i], rgbArrays[1]]);
                colorOneSet = true;
              } else {
                console.log('in setting: ' + rgbArrays);
                setRgbArrays([rgbArrays[0], colors[i]]);
                return;
              }
            }
          }
        }
      };
    }
  }, [image, rgbArrays]);

  console.log(rgbArrays);

  const backgroundGradient = `linear-gradient(to top left, rgb(${rgbArrays[0][0]}, ${rgbArrays[0][1]}, ${rgbArrays[0][2]}), rgb(${rgbArrays[1][0]}, ${rgbArrays[1][1]}, ${rgbArrays[1][2]}))`;
  const hoverGradient = `linear-gradient(to top left, rgb(${
    rgbArrays[0][0] + 20
  }, ${rgbArrays[0][1] + 20}, ${rgbArrays[0][2] + 20}), rgb(${
    rgbArrays[1][0] + 20
  }, ${rgbArrays[1][1] + 20}, ${rgbArrays[1][2] + 20}))`;

  return (
    <Link to={`/rooms/${room.id}`}>
      <PseudoBox
        h='100%'
        background={backgroundGradient}
        borderRadius={4}
        p={8}
        cursor='pointer'
        _hover={{
          background: hoverGradient,
        }}
        onClick={() => setRoomInformation(room)}
        textAlign='center'
        color='#ffffff'
      >
        <Heading size='lg' textShadow='0px 2px #2F2F2F'>
          {room.name}
        </Heading>
        {room.currentSong ? (
          <Box mt={4}>
            <DashboardSongDisplay
              title={room.currentSong.name}
              artist={room.currentSong.artists[0]}
              album={room.currentSong.album.name}
              src={room.currentSong.album.image.src}
              standalone
              imageRef={image}
            />
          </Box>
        ) : (
          <Text>Nothing is playing.</Text>
        )}
      </PseudoBox>
    </Link>
  );
};

export default RoomCardDisplay;
