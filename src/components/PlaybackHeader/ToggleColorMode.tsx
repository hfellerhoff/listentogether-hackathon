import React from 'react';
import { Button, Icon, useColorMode } from '@chakra-ui/core';

interface Props {}

const ToggleColorMode = (props: Props) => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button variant='ghost' onClick={toggleColorMode}>
      <Icon name={colorMode === 'light' ? 'moon' : 'sun'} />
    </Button>
  );
};

export default ToggleColorMode;
