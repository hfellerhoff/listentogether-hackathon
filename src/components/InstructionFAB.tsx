import React, { useState } from 'react';
import {
  useColorMode,
  Link as ChakraLink,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  List,
  ListItem,
  Text,
} from '@chakra-ui/core';
import { FiHelpCircle, FiMail } from 'react-icons/fi';

interface Props {}

const InstructionFAB = (props: Props) => {
  const { colorMode } = useColorMode();
  const [isOpen, setIsOpen] = useState(false);

  const onClose = () => setIsOpen(false);

  return (
    <>
      <Button
        variant='ghost'
        variantColor='blue'
        background={colorMode === 'light' ? '#FFFFFF' : '#1A202C'}
        position='absolute'
        bottom={4}
        right={4}
        width={16}
        height={16}
        borderRadius='50%'
        boxShadow='0px 5px 5px 0px rgba(0, 0, 0, 0.3)'
        onClick={() => setIsOpen(true)}
      >
        <FiHelpCircle fontSize='1.5em' />
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Having Trouble?</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <List>
              <ListItem mb={4}>
                Listen Together works by controlling the playback of one of your
                open instances of Spotify. Make sure Spotify is open on either
                your computer or phone so that Spotify has something to play
                music on.
              </ListItem>
              <ListItem mb={2}>
                If you're still having trouble, try playing something on the
                device you'd like to listen on before joining the room. This
                tells Spotify that your device is active and ready to be used.
              </ListItem>
            </List>
          </ModalBody>

          <ModalFooter>
            <a href='mailto:henryfellerhoff@gmail.com'>
              <Button leftIcon={() => <FiMail />}>
                <Text ml={2}>Still having trouble?</Text>
              </Button>
            </a>
            <Button onClick={onClose} ml={2}>
              Done
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default InstructionFAB;
