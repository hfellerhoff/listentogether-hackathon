import React from 'react';
import { useColorMode } from '@chakra-ui/core';

interface Props {}

const RepeatedBackgroundLanding = (props: Props) => {
  const { colorMode } = useColorMode();

  return (
    <div
      style={{
        position: 'fixed',
        zIndex: -1,
        width: '100vw',
        height: '100vh',
        backgroundColor: `${colorMode === 'light' ? '#eeeeee' : '#11151c'}`,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='16' viewBox='0 0 12 16' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M4 .99C4 .445 4.444 0 5 0c.552 0 1 .45 1 .99v4.02C6 5.555 5.556 6 5 6c-.552 0-1-.45-1-.99V.99zm6 8c0-.546.444-.99 1-.99.552 0 1 .45 1 .99v4.02c0 .546-.444.99-1 .99-.552 0-1-.45-1-.99V8.99z' fill='%239C92AC' fill-opacity='0.4' fill-rule='evenodd'/%3E%3C/svg%3E")`,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
          backgroundColor: `${
            colorMode === 'light'
              ? 'rgba(238, 238, 238, 0.8)'
              : 'rgba(17, 21, 28, 0.8)'
          }`,
        }}
      />
    </div>
  );
};

export default RepeatedBackgroundLanding;
