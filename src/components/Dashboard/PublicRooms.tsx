import React from 'react';
import { DashboardCard } from './components/Card';
import { DashboardTextContent } from './components/TextContent';
import CreateRoomButton from '../Buttons/CreateRoomButton';
import PublicRoomRoll from '../RoomRolls/PublicRoomRoll';
import { RoomInformation } from '../../models/RoomInformation';

interface Props {
  rooms: RoomInformation[] | undefined;
  isLoading?: boolean;
}

const DashboardPublicRooms = ({ rooms, isLoading }: Props) => {
  return (
    <DashboardCard
      subtitle='Looking to discover new music?'
      title='Public Rooms'
    >
      {rooms && rooms.length === 0 ? (
        <>
          <DashboardTextContent
            text="It looks like there aren't any rooms right now. Why don't you
              create the first?"
          >
            <CreateRoomButton />
          </DashboardTextContent>
        </>
      ) : (
        <PublicRoomRoll rooms={rooms} isLoading={isLoading} />
      )}
    </DashboardCard>
  );
};

export default DashboardPublicRooms;
