import React from 'react';
import { Flex, Box, Heading, Text } from '@chakra-ui/core';
import useBackgroundColor from '../../../hooks/useBackgroundColor';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  subtitle: string;
  rightElement?: JSX.Element;
}

export const DashboardCard = ({
  children,
  title,
  subtitle,
  rightElement,
}: Props) => {
  const { foregroundColor } = useBackgroundColor();

  return (
    <Flex
      align='center'
      justify='center'
      bg={foregroundColor}
      mt={[4, 4, 8, 8]}
      p={[4, 6, 12, 16]}
      width='100%'
      boxShadow='0px 5px 5px 0px rgba(0, 0, 0, 0.15)'
    >
      <Box flex={1} w='100%'>
        <Flex align='center' flexDirection={['column', 'column', 'row', 'row']}>
          <Box textAlign={['center', 'center', 'left', 'left']} flex={1}>
            <Text fontSize={18}>{subtitle}</Text>
            <Heading>{title}</Heading>
          </Box>
          <Box ml={[0, 0, 4, 4]} mt={[4, 4, 0, 0]} mb={[4, 4, 0, 0]}>
            {rightElement}
          </Box>
        </Flex>
        {children}
      </Box>
    </Flex>
  );
};
