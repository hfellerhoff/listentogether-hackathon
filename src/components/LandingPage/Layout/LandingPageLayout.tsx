import React from 'react';
import { Box } from '@chakra-ui/core';

interface Props {
  children: JSX.Element | JSX.Element[];
}

export const LandingPageLayout = ({ children }: Props) => {
  return (
    <Box minH='100vh' py={16}>
      {children}
    </Box>
  );
};
