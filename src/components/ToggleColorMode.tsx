import React from 'react';
import { useColorMode, Button, Icon } from '@chakra-ui/core';

interface Props {}

const ToggleColorMode = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button
      variant='ghost'
      variantColor='blue'
      position='absolute'
      top={4}
      right={4}
      onClick={toggleColorMode}
    >
      <Icon name={colorMode === 'light' ? 'moon' : 'sun'} />
    </Button>
  );
};

export default ToggleColorMode;
