import React from 'react';
import TextLoop from 'react-text-loop';
import { Heading } from '@chakra-ui/core';

interface Props {
  text: string[];
}

export const LandingPageTextLoop = ({ text }: Props) => {
  return (
    <TextLoop interval={4000}>
      {text.map((string) => (
        <Heading fontSize={[36, 48, 60, 72]}>{string}</Heading>
      ))}
    </TextLoop>
  );
};
