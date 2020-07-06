import React from 'react';
import { Flex } from '@chakra-ui/core';
import ChatDisplay from './ChatDisplay';
import ChatInput from './ChatInput';

export type ChatComponentType = 'panel' | 'full';

interface Props {
  type: ChatComponentType;
}

const ChatComponent = ({ type }: Props) => {
  const display = {
    full: ['none', 'none', 'flex', 'flex'],
    panel: ['flex', 'flex', 'none', 'none'],
  };

  return (
    <Flex direction='column' display={display[type]}>
      <ChatDisplay />
      <ChatInput type={type} />
    </Flex>
  );
};

export default ChatComponent;
