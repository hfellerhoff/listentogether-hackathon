import React from 'react';
import { Button } from '@chakra-ui/core';
import { FiHome } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

interface Props {}

const RouteToHome = (props: Props) => {
  const history = useHistory();
  // const [modalVisible, setModalVisible] = useState(false);

  // const onGoHomeFromModal = () => {
  //   if (room && user) {
  //     destroyRoom(room, user);
  //     setModalVisible(false);
  //     setRoom(null);
  //     history.push(`/`);
  //   }
  // };

  const onClick = () => {
    // if (room) {
    //   if (room.owner.id === user?.details.id) {
    //     setModalVisible(true);
    //   } else {
    //     if (user) {
    //       removeUserFromRoom(room, user);
    //       setRoom(null);
    //       history.push(`/`);
    //     }
    //   }
    // } else {
    //   history.push(`/`);
    // }
    history.push(`/`);
  };

  return (
    <>
      <Button
        variant='ghost'
        variantColor='blue'
        position='absolute'
        top={4}
        left={4}
        onClick={onClick}
      >
        <FiHome />
      </Button>
      {/* <ConfirmHomeModal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        onDestroy={onGoHomeFromModal}
      /> */}
    </>
  );
};

export default RouteToHome;
