import React, { useEffect } from 'react';
import {
  Flex,
  Grid,
  Button,
  Icon,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  Box,
} from '@chakra-ui/core';
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil';
import { userInformationState } from '../../state/userInformation';
import ChatComponent from '../../components/Room/Chat/ChatComponent';
import useBackgroundColor from '../../hooks/useBackgroundColor';
import PlaybackHeader from '../../components/PlaybackHeader/PlaybackHeader';
import { displayedModalState } from '../../state/displayedModal';
import DashboardBottomBar from '../../components/Room/DashboardBottomBar';
import { useDocument } from 'react-firebase-hooks/firestore';
import { useParams } from 'react-router-dom';
import firebase from '../../lib/firebase';
import { RoomInformation } from '../../models/RoomInformation';
import { roomInformationState } from '../../state/roomInformation';
import addUserToRoom from '../../services/addUserToRoom';
import ListenerPanel from '../../components/Room/Listeners/ListenerPanel';

interface Props {}

export const Room = (props: Props) => {
  const params: { roomID: string } = useParams();

  const userInformation = useRecoilValue(userInformationState);
  const [roomInformation, setRoomInformation] = useRecoilState(
    roomInformationState
  );
  const setDisplayedModal = useSetRecoilState(displayedModalState);

  const [value, loading, error] = useDocument(
    firebase.firestore().collection('rooms').doc(params.roomID)
  );

  const { foregroundColor, backgroundColor } = useBackgroundColor();

  useEffect(() => {
    const initializeRoom = async (room: RoomInformation) => {
      if (userInformation) {
        setRoomInformation(room);
        await addUserToRoom(room, userInformation);
      }
    };

    if (!loading && !error && value) {
      if (value.exists) {
        const room = value.data();
        if (!roomInformation) initializeRoom(room as RoomInformation);
      }
    }
  }, [
    value,
    loading,
    error,
    userInformation,
    setRoomInformation,
    roomInformation,
  ]);

  return (
    <Box h='100vh'>
      <PlaybackHeader />
      <Grid
        gridTemplateColumns={['1fr', '1fr', '350px 1fr', '350px 1fr']}
        flex={1}
        bg={backgroundColor}
        position='relative'
      >
        <Flex
          bg={foregroundColor}
          pt={24}
          position='fixed'
          left={0}
          w={['100%', '100%', '350px', '350px']}
          h='100%'
        >
          <Tabs
            pt={4}
            flex={1}
            variant='solid-rounded'
            variantColor='green'
            display='flex'
            flexDirection='column'
            size='md'
          >
            {roomInformation ? (
              <Flex
                align='center'
                justify='space-between'
                mb={4}
                px={4}
                direction='row'
              >
                <TabList>
                  <Tab>Queue</Tab>
                  <Tab ml={1}>Listeners</Tab>
                  <Tab ml={1} display={['block', 'block', 'none', 'none']}>
                    Chat
                  </Tab>
                </TabList>
                <Tooltip
                  placement='right'
                  label='Queue Song'
                  aria-label='Queue Song'
                  hasArrow
                >
                  <Button
                    variant='ghost'
                    onClick={() => setDisplayedModal('queue-song')}
                    display={[
                      'none',
                      'inline-block',
                      'inline-block',
                      'inline-block',
                    ]}
                    isDisabled={!roomInformation}
                  >
                    <Icon name='add' />
                  </Button>
                </Tooltip>
              </Flex>
            ) : (
              <></>
            )}
            <TabPanels flex={1}>
              <TabPanel px={4}>
                <Box></Box>
              </TabPanel>
              <TabPanel px={4}>
                <ListenerPanel />
              </TabPanel>
              <TabPanel
                overflowY='scroll'
                h='100%'
                maxH='75vh'
                bg={backgroundColor}
              >
                <ChatComponent type='panel' />
              </TabPanel>
            </TabPanels>
            <DashboardBottomBar />
          </Tabs>
        </Flex>
        <Box
          gridColumn='2/3'
          minH='100vh'
          pt={24}
          display={['none', 'none', 'block', 'block']}
        >
          <ChatComponent type='full' />
        </Box>
      </Grid>
    </Box>
  );
};

export default Room;
