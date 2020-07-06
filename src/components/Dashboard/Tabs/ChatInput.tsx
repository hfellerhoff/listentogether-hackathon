import React from 'react';
import { Box, Input } from '@chakra-ui/core';
import useBackgroundColor from '../../../hooks/useBackgroundColor';
import { ChatComponentType } from './ChatComponent';

interface Props {
  type: ChatComponentType;
}

const ChatInput = ({ type }: Props) => {
  const { foregroundColor } = useBackgroundColor();
  const isPanel = type === 'panel';

  return (
    <Box
      bg={foregroundColor}
      pt={isPanel ? 0 : 4}
      pl={isPanel ? [0, 4, 4, 4] : 4}
      pr={isPanel ? [8, 12, 12, 12] : 4}
      pb={isPanel ? [3, 4, 4, 4] : 4}
      position={isPanel ? 'fixed' : 'static'}
      width={isPanel ? '100%' : ''}
      bottom={0}
    >
      <Input variant='filled' placeholder='Send a message...' />
    </Box>
  );
};

export default ChatInput;
