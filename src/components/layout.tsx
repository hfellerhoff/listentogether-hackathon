/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from 'react';

import SEO from './seo';
import { Stack, useColorMode } from '@chakra-ui/core';

interface Props {
  children: JSX.Element | JSX.Element[];
  title: string;
  centered?: boolean;
  maxW?: number;
  boxed?: boolean;
}

const Layout = ({ children, title, centered, boxed, maxW }: Props) => {
  const { colorMode } = useColorMode();

  return (
    <>
      <SEO title={title} />
      <main>
        {centered ? (
          <Stack
            minH='100vh'
            maxW={maxW || ''}
            margin={maxW ? '0 auto' : ''}
            spacing={8}
            align='center'
            justify='center'
            textAlign='center'
          >
            {boxed ? (
              <Stack
                background={colorMode === 'light' ? '#ffffff' : '#1a202c'}
                padding={16}
                boxShadow='0px 8px 10px 5px rgba(0, 0, 0, 0.1)'
              >
                {children}
              </Stack>
            ) : (
              { children }
            )}
          </Stack>
        ) : (
          children
        )}
      </main>
    </>
  );
};

export default Layout;
