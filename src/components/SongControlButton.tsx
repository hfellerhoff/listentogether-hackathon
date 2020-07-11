import React from 'react';
import { Button, ButtonProps, Tooltip } from '@chakra-ui/core';

interface Props {
  label?: string;
}

const SongControlButton: React.FC<ButtonProps & Props> = (props) => {
  return (
    <Tooltip
      label={props.label}
      aria-label={props.label || 'Button'}
      zIndex={5}
    >
      <Button variant='ghost' mx={1} {...props}>
        {props.children}
      </Button>
    </Tooltip>
  );
};

export default SongControlButton;
