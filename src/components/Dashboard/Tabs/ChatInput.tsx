import React from 'react';
import { Box, Input } from '@chakra-ui/core';
import useBackgroundColor from '../../../hooks/useBackgroundColor';
import { ChatComponentType } from './ChatComponent';
import { useRecoilValue } from 'recoil';
import { userInformationState } from '../../../state';
import sendChatMessage from '../../../firebase/sendChatMessage';
import { roomInformationState } from '../../../state/roomInformation';
import { Formik } from 'formik';

interface Props {
  type: ChatComponentType;
}

const ChatInput = ({ type }: Props) => {
  const { foregroundColor } = useBackgroundColor();
  const userInformation = useRecoilValue(userInformationState);
  const roomInformation = useRecoilValue(roomInformationState);
  const isPanel = type === 'panel';

  const onSubmit = (content: string) => {
    if (userInformation && roomInformation) {
      sendChatMessage(roomInformation.id, userInformation, content);
      console.log(content);
    }
  };

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
      <Formik
        initialValues={{ message: '' }}
        onSubmit={(values, actions) => {
          onSubmit(values.message);
        }}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <form onSubmit={handleSubmit}>
            <Input
              type='text'
              name='message'
              variant='filled'
              placeholder='Send a message...'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.message}
            />
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default ChatInput;
