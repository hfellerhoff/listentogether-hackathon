import React from 'react';
import { Button } from '@chakra-ui/core';
import { FiHome } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface Props {}

const RouteToHome = (props: Props) => {
  return (
    <Link to='/'>
      <Button
        variant='ghost'
        variantColor='blue'
        position='absolute'
        top={4}
        left={4}
      >
        <FiHome />
      </Button>
    </Link>
  );
};

export default RouteToHome;
