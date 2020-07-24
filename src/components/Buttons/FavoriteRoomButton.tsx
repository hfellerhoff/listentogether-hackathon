import React from 'react';
import { FiHeart } from 'react-icons/fi';
import unfavoriteRoom from '../../services/unfavoriteRoom';
import favoriteRoom from '../../services/favoriteRoom';
import { RoomInformation } from '../../models/RoomInformation';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '../../state/userInformation';
import { useColorMode } from '@chakra-ui/core';

interface Props {
  room: RoomInformation;
  colorMode?: 'light' | 'dark';
}

const FavoriteRoomButton = ({ room, colorMode: forcedColorMode }: Props) => {
  const { colorMode } = useColorMode();
  const userInformation = useRecoilValue(userInformationState);

  const roomIsFavorited = userInformation
    ? userInformation.favoritedRoomIDs.includes(room.id)
    : false;

  const trueColorMode = forcedColorMode || colorMode;

  return (
    <FiHeart
      fontSize={20}
      cursor='pointer'
      fill={
        roomIsFavorited
          ? trueColorMode === 'light'
            ? '#1A202C'
            : '#EDEEEE'
          : 'none'
      }
      onClick={() => {
        if (userInformation) {
          if (roomIsFavorited) {
            unfavoriteRoom(room, userInformation);
          } else {
            favoriteRoom(room, userInformation);
          }
        }
      }}
    />
  );
};

export default FavoriteRoomButton;
