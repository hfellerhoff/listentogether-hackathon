import React from 'react';
import { Flex, Box, Heading, Image, Text, useColorMode } from '@chakra-ui/core';
import { getFirstName } from '../../util/user';

import logoLight from '../../assets/logo-light.svg';
import logoDark from '../../assets/logo-dark.svg';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '../../state/userInformation';

interface Props {}

const DashboardWelcome = (props: Props) => {
  const { colorMode } = useColorMode();
  const userInformation = useRecoilValue(userInformationState);

  return (
    <Flex direction='column' align='center' justify='center'>
      <Image
        src={colorMode === 'light' ? logoLight : logoDark}
        height={[16, 16, 20, 24]}
        mt={[8, 4, 0, 0]}
      />
      <Box textAlign='center' mb={[4, 4, 8, 8]} mt={[4, 4, 8, 8]}>
        <Heading size='2xl'>
          {userInformation
            ? `Welcome back, ${getFirstName(userInformation.displayName)}!`
            : 'Welcome back!'}
        </Heading>
        <Text fontSize={20}>It's great to see you again.</Text>
      </Box>
    </Flex>
  );
};

export default DashboardWelcome;
