import React from 'react';
import { Flex, Image, useColorMode, Stack } from '@chakra-ui/core';
import logoDark from '../../assets/logo-dark.svg';
import logoLight from '../../assets/logo-light.svg';
import { LandingPageTextLoop } from '../../components/LandingPage';

interface Props {}

const Beta = (props: Props) => {
  const { colorMode } = useColorMode();

  return (
    <Stack align='center' py={16} px={4}>
      <Flex align='center' justify='center' mb={[8, 8, 8, 24]}>
        <Image src={colorMode === 'light' ? logoLight : logoDark} height={24} />
      </Flex>
      <LandingPageTextLoop
        text={['Jam out', 'Be the DJ', 'Share music', 'Listen together']}
      />
    </Stack>
  );
};

export default Beta;
