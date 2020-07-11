import React from 'react';
import { Flex, Image, Text, Tooltip, Box } from '@chakra-ui/core';
import { FaUser, FaCrown } from 'react-icons/fa';
import { UserInformationRoom } from '../models/UserInformation';
// import ScaleLoader from 'react-spinners/ScaleLoader';

interface Props {
  user: UserInformationRoom;
  isOwner?: boolean;
}

const ListenerDisplay = ({ user, isOwner }: Props) => {
  return (
    <Flex align='center' justify='space-between'>
      <Flex mt={2}>
        {user.image.src ? (
          <Image src={user.image.src} w={8} h={8} borderRadius='50%' />
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
          {user.displayName}
        </Text>
      </Flex>
      {isOwner ? (
        <Tooltip aria-label='Room Owner' label='Room Owner' placement='left'>
          <Box>
            <FaCrown fontSize='1.4em' />
          </Box>
        </Tooltip>
      ) : (
        <></>
      )}
    </Flex>
  );
};

export default ListenerDisplay;
