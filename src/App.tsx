import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Layout from './components/layout';
import getHashParams from './util/getHashParams';
import ToggleColorMode from './components/ToggleColorMode';
import RouteToHome from './components/RouteToHome';
import { useRecoilState } from 'recoil';
import { accessTokenState } from './state/accessToken';
import useUserMonitor from './hooks/monitors/useUserMonitor';
import RepeatedBackgroundLanding from './components/RepeatedBackgroundLanding';
import { Box } from '@chakra-ui/core';
import useSpotifyWebPlayback from './hooks/useSpotifyWebPlayback';
import SongSearchDrawer from './components/Drawers/SongSearchDrawer';
import DeviceSelectDrawer from './components/Drawers/DeviceSelectDrawer';
import PlaybackControlDrawer from './components/Drawers/PlaybackControlDrawer';
import useRoomMonitor from './hooks/monitors/useRoomMonitor';
import LandingPage from './routes/LandingPage';
import Dashboard from './routes/dashboard/Dashboard';
import Room from './routes/rooms/Room';
import CreateRoom from './routes/rooms/Create';
import Beta from './routes/beta/Beta';

const App = () => {
  const params = getHashParams() as { access_token: string };
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
              <Layout title=''>
                <LandingPage />
              </Layout>
            </>
          )}
        </Route>
        <Route path='/beta'>
          <RepeatedBackgroundLanding />
          <ToggleColorMode />
          <Layout title='Coming Soon' maxW={1000}>
            <Beta />
          </Layout>
        </Route>
        {accessToken ? (
          <>
            <Box>
              <RepeatedBackgroundLanding />
              <Switch>
                <Route path='/dashboard'>
                  <Layout title='Dashboard'>
                    <Dashboard />
                  </Layout>
                </Route>
                <Route path='/rooms/create'>
                  <RouteToHome />
                  <ToggleColorMode />
                  <Layout title='Create Room' centered boxed maxW={500}>
                    <CreateRoom />
                  </Layout>
                </Route>
                <Route path='/rooms/:roomID'>
                  <Layout title='Listen'>
                    <Room />
                  </Layout>
                </Route>
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
