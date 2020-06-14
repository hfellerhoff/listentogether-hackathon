import React from 'react';
import { Button, Box, Heading, Text, Icon } from '@chakra-ui/core';

interface Props {
  title: string;
  description: string;
  isChecked?: boolean;
  isDisabled?: boolean;
  value?: string;
  children?: JSX.Element | JSX.Element[] | string;
}

const RadioOption = React.forwardRef((props: Props, ref) => {
  const { isChecked, isDisabled, value, ...rest } = props;

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
      <Box>
        <Heading size='sm'>{props.title}</Heading>
        <Text fontWeight={400}>{props.description}</Text>
        {isChecked ? (
          <Icon name='check' position='absolute' top={6} right={4} mt={1} />
        ) : (
          <></>
        )}
      </Box>
    </Button>
  );
});

export default RadioOption;
