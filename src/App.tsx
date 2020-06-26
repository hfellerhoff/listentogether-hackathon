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
  ShareSong,
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

const App = () => {
  const params = getHashParams() as { access_token: string };
  const history = useHistory();

  const [isCheckingPlayback, setIsCheckingPlayback] = useState(false);

  const spotifyAPI = useRecoilValue(spotifyApiState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const songInformation = usePlaybackMonitor(isCheckingPlayback);
  useUserMonitor();

  if (params.access_token && !accessToken) setAccessToken(params.access_token);

  const handleCreateRoom = async (isPublic: boolean) => {
    if (songInformation && accessToken) {
      const id = await createRoom(
        spotifyAPI,
        accessToken,
        songInformation as SpotifyApi.CurrentPlaybackResponse,
        isPublic
      );
      history.push(`/rooms/${id}`);
    }
  };

  return (
    <>
      <ToggleColorMode />
      <Switch>
        <Route exact path='/'>
          {accessToken ? (
            <Redirect to='/search-or-share' />
          ) : (
            <>
              <RepeatedBackgroundLanding />
              <Layout title='Home'>
                <LandingPage />
              </Layout>
            </>
          )}
        </Route>
        {accessToken ? (
          <>
            <RepeatedBackground />
            <RouteToHome />
            <Switch>
              <Route path='/search-or-share'>
                <Layout title='Search or Share' centered boxed maxW={550}>
                  <SearchOrShare />
                </Layout>
              </Route>
              <Route path='/rooms/:roomID'>
                <Room
                  checkingPlayback={isCheckingPlayback}
                  setShouldCheckPlayback={setIsCheckingPlayback}
                />
              </Route>
              <Route path='/rooms'>
                <Layout title='Rooms' centered boxed maxW={700}>
                  <Rooms />
                </Layout>
              </Route>
              <Route path='/choose-song'>
                {isCheckingPlayback ? (
                  <Redirect to='/share' />
                ) : (
                  <Layout title='Choose Song' centered boxed maxW={550}>
                    <ChooseSong
                      checkPlayback={() => {
                        setIsCheckingPlayback(true);
                      }}
                    />
                  </Layout>
                )}
              </Route>
              <Route path='/share'>
                <Layout title='Share Song' centered boxed maxW={550}>
                  <ShareSong
                    createRoom={handleCreateRoom}
                    songInformation={songInformation}
                  />
                </Layout>
              </Route>
            </Switch>
          </>
        ) : (
          <Redirect to='/' />
        )}
      </Switch>
    </>
  );
};

export default App;
