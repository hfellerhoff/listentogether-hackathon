import React from 'react';
import { Flex, Spinner } from '@chakra-ui/core';

interface Props {
  size: 'sm' | 'md' | 'lg';
}

const Loading = ({ size }: Props) => {
  const height = size === 'sm' ? 16 : size === 'md' ? 24 : 32;

  return (
    <Flex align='center' justify='center' height={height}>
      <Spinner size={size} />
    </Flex>
  );
};

export default Loading;
