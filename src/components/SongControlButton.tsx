import React from 'react';
import { Button, ButtonProps } from '@chakra-ui/core';

const SongControlButton: React.FC<ButtonProps> = (props) => {
  return (
    <Button variant='ghost' mx={1} {...props}>
      {props.children}
    </Button>
  );
};

export default SongControlButton;
