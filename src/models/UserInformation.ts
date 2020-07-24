import { Service } from './Service';

export type UserInformationRoom = {
  service: Service;
  id: string;
  displayName: string;
  image: {
    src: string;
  };
};

export interface UserInformation extends UserInformationRoom {
  currentRoomID: string | null;
  favoritedRoomIDs: string[];
}
