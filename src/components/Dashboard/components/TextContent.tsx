import React from 'react';
import { Box, Text } from '@chakra-ui/core';

interface Props {
  text: string;
  children?: JSX.Element;
}

export const DashboardTextContent = ({ text, children }: Props) => {
  return (
    <Box maxW={500} margin='0 auto' textAlign='center' mt={[4, 4, 12, 12]}>
      <Text fontSize={20} mb={4}>
        {text}
      </Text>
      {children}
    </Box>
  );
};
