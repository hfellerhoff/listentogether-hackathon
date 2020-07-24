import React from 'react';
import { DashboardCard } from './components/Card';
import FavoritedRoomsElement from './components/FavoritedRoomsElement';
import { DashboardTextContent } from './components/TextContent';
import FavoritedRoomRoll from '../RoomRolls/FavoritedRoomRoll';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '../../state/userInformation';
import { RoomInformation } from '../../models/RoomInformation';

interface Props {
  rooms: RoomInformation[] | undefined;
  isLoading?: boolean;
}

const DashboardFavoritedRooms = ({ rooms, isLoading }: Props) => {
  const userInformation = useRecoilValue(userInformationState);

  return (
    <DashboardCard
      subtitle='Jump back in...'
      title='Favorited Rooms'
      rightElement={<FavoritedRoomsElement />}
    >
      {userInformation ? (
        userInformation.favoritedRoomIDs.length === 0 ? (
          <DashboardTextContent
            text="It looks like you aren't a member of any rooms. Try joining a public
              room, or create a room of your own!"
          />
        ) : (
          <FavoritedRoomRoll rooms={rooms} isLoading={isLoading} />
        )
      ) : (
        <DashboardTextContent
          text="It looks like you aren't a member of any rooms. Try joining a public
              room, or create a room of your own!"
        />
      )}
    </DashboardCard>
  );
};

export default DashboardFavoritedRooms;
