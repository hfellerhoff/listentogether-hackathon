import React from 'react';
import {
  Flex,
  Text,
  Grid,
  Button,
  Avatar,
  Icon,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
  Tabs,
  Tooltip,
  Box,
} from '@chakra-ui/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userInformationState } from '../state';
import ChatComponent from '../components/Dashboard/Tabs/ChatComponent';
import useBackgroundColor from '../hooks/useBackgroundColor';
import PlaybackHeader from '../components/PlaybackHeader/PlaybackHeader';
import { displayedModalState } from '../state/displayedModal';
import DashboardBottomBar from '../components/Dashboard/DashboardBottomBar';

interface Props {}

const RoomDashboard = (props: Props) => {
  const userInformation = useRecoilValue(userInformationState);
  const setDisplayedModal = useSetRecoilState(displayedModalState);

  const { foregroundColor, backgroundColor } = useBackgroundColor();

  return (
    <>
      <Flex bg={backgroundColor} h='100vh' direction='column'>
        <PlaybackHeader />
        <Grid
          gridTemplateColumns={['1fr', '1fr', '350px 1fr', '350px 1fr']}
          flex={1}
        >
          <Flex bg={foregroundColor} p={4}>
            <Tabs
              flex={1}
              variant='solid-rounded'
              variantColor='green'
              display='flex'
              flexDirection='column'
              size='md'
            >
              <Flex
                align='center'
                justify='space-between'
                mb={6}
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
                  >
                    <Icon name='add' />
                  </Button>
                </Tooltip>
              </Flex>
              <TabPanels flex={1}>
                <TabPanel>
                  <Box></Box>
                </TabPanel>
                <TabPanel>
                  <Flex align='center'>
                    <Avatar
                      size='sm'
                      name={userInformation?.displayName || 'Guest User'}
                      src={
                        userInformation
                          ? userInformation.image.src || undefined
                          : undefined
                      }
                    />
                    <Text ml={2}>
                      {userInformation?.displayName || 'Guest User'}
                    </Text>
                  </Flex>
                </TabPanel>
                <TabPanel
                  display={['flex', 'flex', 'none', 'none']}
                  flexDirection='column'
                >
                  <ChatComponent type='panel' />
                </TabPanel>
              </TabPanels>
              <DashboardBottomBar />
            </Tabs>
          </Flex>
          <ChatComponent type='full' />
        </Grid>
      </Flex>
    </>
  );
};

export default RoomDashboard;
