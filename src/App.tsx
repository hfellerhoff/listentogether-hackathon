import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from './components/layout';
import RepeatedBackground from './components/RepeatedBackground';
import getHashParams from './util/getHashParams';
import ToggleColorMode from './components/ToggleColorMode';
import usePlaybackMonitor from './hooks/usePlaybackMonitor';
import {
  SearchOrShare,
  ChooseSong,
  CreateRoom,
  Room,
  Rooms,
  LandingPage,
} from './routes';
import createRoom from './firebase/createRoom';
import RouteToHome from './components/RouteToHome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { spotifyApiState, accessTokenState } from './state';
import useUserMonitor from './hooks/useUserMonitor';
import RepeatedBackgroundLanding from './components/RepeatedBackgroundLanding';
import InstructionFAB from './components/InstructionFAB';
import RoomDashboard from './routes/RoomDashboard';
import { Box } from '@chakra-ui/core';
import useSpotifyWebPlayback from './hooks/useSpotifyWebPlayback';
import Home from './routes/Home';
import SongSearchDrawer from './components/Drawers/SongSearchDrawer';
import DeviceSelectDrawer from './components/Drawers/DeviceSelectDrawer';
import PlaybackControlDrawer from './components/Drawers/PlaybackControlDrawer';
import useRoomMonitor from './hooks/useRoomMonitor';

const App = () => {
  const params = getHashParams() as { access_token: string };
  const [isCheckingPlayback, setIsCheckingPlayback] = useState(true);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  useUserMonitor();
  useRoomMonitor();
  useSpotifyWebPlayback();

  if (params.access_token && !accessToken) setAccessToken(params.access_token);

  return (
    <>
      <Switch>
        <Route exact path='/'>
          {accessToken ? (
            <Redirect to='/dashboard' />
          ) : (
            <>
              <RepeatedBackgroundLanding />
              <ToggleColorMode />
              <Layout title='Home'>
                <LandingPage />
              </Layout>
            </>
          )}
        </Route>
        <Route path='/create'>
          <RepeatedBackgroundLanding />
          <RouteToHome />
          <ToggleColorMode />
          <Layout title='Create Room' centered boxed maxW={500}>
            <CreateRoom />
          </Layout>
        </Route>
        {accessToken ? (
          <>
            <Box>
              <Switch>
                <Route path='/dashboard'>
                  <RepeatedBackgroundLanding />
                  <Layout title='Home'>
                    <Home />
                  </Layout>
                </Route>
                <Route path='/search-or-share'>
                  <RepeatedBackground />
                  <RouteToHome />
                  <ToggleColorMode />
                  <Layout title='Search or Share' centered boxed maxW={550}>
                    <SearchOrShare />
                  </Layout>
                </Route>

                <Route path='/rooms/:roomID'>
                  <Layout title='Listen'>
                    <RoomDashboard />
                  </Layout>
                </Route>
                <Route path='/rooms'>
                  <RepeatedBackground />
                  <RouteToHome />
                  <ToggleColorMode />
                  <Layout title='Rooms' centered boxed maxW={700}>
                    <Rooms />
                  </Layout>
                </Route>
                <Route path='/choose-song'>
                  {isCheckingPlayback ? (
                    <Redirect to='/share' />
                  ) : (
                    <>
                      <RepeatedBackground />
                      <RouteToHome />
                      <ToggleColorMode />
                      <Layout title='Choose Song' centered boxed maxW={550}>
                        <ChooseSong
                          checkPlayback={() => {
                            setIsCheckingPlayback(true);
                          }}
                        />
                      </Layout>
                    </>
                  )}
                </Route>
                {/* <Route path='/share'>
                  <RepeatedBackground />
                  <RouteToHome />
                  <ToggleColorMode />
                  <Layout title='Share Song' centered boxed maxW={550}>
                    <ShareSong
                      createRoom={handleCreateRoom}
                      songInformation={songInformation}
                    />
                  </Layout>
                </Route> */}
              </Switch>
            </Box>
            <SongSearchDrawer />
            <DeviceSelectDrawer />
            <PlaybackControlDrawer />
          </>
        ) : (
          <Redirect to='/' />
        )}
      </Switch>
    </>
  );
};

export default App;
