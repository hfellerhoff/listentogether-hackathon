import { UserInformation } from '../../models/UserInformation';
import { UserInformationState } from '../../state/userInformation';
import { Service } from '../../models/Service';

export const getFullUserID = (user: UserInformationState) => {
  if (!user) return undefined;
  return `${user.service}-${user.id}`;
};

export const getFullUserIDFromValues = (id: string, service: Service) => {
  return `${service}-${id}`;
};
