import React from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from '@chakra-ui/core';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onDestroy: () => void;
}

const ConfirmHomeModal = ({ isOpen, onClose, onDestroy }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Are you sure?</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Heading home will destroy this room, removing everyone who is
          listening from it. Are you sure you'd like to leave?
        </ModalBody>

        <ModalFooter>
          <Button variant='ghost' onClick={onClose}>
            Cancel
          </Button>
          <Button variantColor='red' mr={3} onClick={onDestroy}>
            Destroy and Go Home
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmHomeModal;
