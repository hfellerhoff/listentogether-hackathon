import React from 'react';
import { Flex, Image, Text } from '@chakra-ui/core';
import { FaUser } from 'react-icons/fa';
import { User } from '../state/roomInformation';
// import ScaleLoader from 'react-spinners/ScaleLoader';

interface Props {
  user: User;
}

const ListenerDisplay = ({ user }: Props) => {
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
      {/* <ScaleLoader height={20} width={3} radius={1.5} /> */}
    </Flex>
  );
};

export default ListenerDisplay;
