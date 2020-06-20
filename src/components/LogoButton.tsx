import React from 'react';
import logo from '../assets/hf-logo.png';
import { Image, Link } from '@chakra-ui/core';

interface Props {}

const LogoButton = (props: Props) => {
  return (
    <Link
      href='https://www.henryfellerhoff.com'
      target='_blank'
      rel='noopener noreferrer'
    >
      <Image width={6} src={logo} display='inline-block' mx={2} mb={1} />
    </Link>
  );
};

export default LogoButton;
