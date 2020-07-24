import { UserInformationRoom } from '../UserInformation';

export type ListenersDocument = {
  listeners: {
    [id: string]: UserInformationRoom;
  };
};
