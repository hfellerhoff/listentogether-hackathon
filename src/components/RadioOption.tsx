import React from 'react';
import { Button, Box, Heading, Text, Icon, Flex } from '@chakra-ui/core';
import { Icons } from '@chakra-ui/core/dist/theme/icons';

interface Props {
  title: string;
  description: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  value?: string | boolean;
  children?: JSX.Element | JSX.Element[] | string;
  leftIcon?: JSX.Element;
}

const RadioOption = React.forwardRef((props: Props, ref) => {
  const { isChecked, isDisabled, value, leftIcon, ...rest } = props;

  const onClick = isDisabled ? { onClick: () => {} } : {};

  return (
    <Button
      as={Box}
      display='flex'
      flexDirection='column'
      alignItems='flex-start'
      textAlign='left'
      ref={ref}
      variantColor={isChecked ? 'green' : 'gray'}
      aria-checked={isChecked}
      role='radio'
      isDisabled={isDisabled}
      {...rest}
      height={70}
      width='100%'
      mb={5}
      cursor='pointer'
      {...onClick}
    >
      <Flex align='center' justify='center'>
        {leftIcon}
        <Box ml={leftIcon ? 3 : 0}>
          <Heading size='sm'>{props.title}</Heading>
          <Text fontWeight={400}>{props.description}</Text>
          {isChecked ? (
            <Icon name='check' position='absolute' top={6} right={4} mt={1} />
          ) : (
            <></>
          )}
        </Box>
      </Flex>
    </Button>
  );
});

export default RadioOption;
