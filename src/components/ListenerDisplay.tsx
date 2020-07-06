import React from 'react';
import { Flex, Image, Text, Tooltip, Box } from '@chakra-ui/core';
import { FaUser, FaCrown } from 'react-icons/fa';
import { User } from '../state/roomInformation';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '../state';
// import transferRoomOwnership from '../firebase/transferRoomOwnership';
// import ScaleLoader from 'react-spinners/ScaleLoader';

interface Props {
  user: User;
  isOwner?: boolean;
}

const ListenerDisplay = ({ user, isOwner }: Props) => {
  const globalUser = useRecoilValue(userInformationState);
  // const room = useRecoilValue(roomInformationState);

  return (
    <Flex align='center' justify='space-between'>
      <Flex mt={2}>
        {user.imageUrl ? (
          <Image src={user.imageUrl} w={8} h={8} borderRadius='50%' />
        ) : (
          <Flex
            background='#11151C'
            w={8}
            h={8}
            align='center'
            justify='center'
            borderRadius='50%'
          >
            <FaUser color='#ffffff' />
          </Flex>
        )}
        <Text ml={3} mt={0.5}>
          {user.name}
        </Text>
      </Flex>
      {isOwner ? (
        <Tooltip aria-label='Room Owner' label='Room Owner' placement='left'>
          <Box>
            <FaCrown fontSize='1.4em' />
          </Box>
        </Tooltip>
      ) : globalUser?.room?.isOwner ? (
        // TODO: Room ownership transfer
        // <Button onClick={() => transferRoomOwnership(room, user, globalUser)}>
        //   Make Owner
        // </Button>
        <></>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default ListenerDisplay;
