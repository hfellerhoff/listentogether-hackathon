import React, { useState } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from './components/layout';
import RepeatedBackground from './components/RepeatedBackground';
import getHashParams from './util/getHashParams';
import ToggleColorMode from './components/ToggleColorMode';
import usePlaybackMonitor from './hooks/usePlaybackMonitor';
import {
  LoginToSpotify,
  SearchOrShare,
  ChooseSong,
  ShareSong,
  Room,
  Rooms,
} from './routes';
import createRoom from './firebase/createRoom';
import RouteToHome from './components/RouteToHome';
import { useRecoilState, useRecoilValue } from 'recoil';
import { spotifyApiState, accessTokenState } from './state';
import useUserMonitor from './hooks/useUserMonitor';

const App = () => {
  const params = getHashParams() as { access_token: string };
  const history = useHistory();

  const [isCheckingPlayback, setIsCheckingPlayback] = useState(false);

  const spotifyAPI = useRecoilValue(spotifyApiState);
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const songInformation = usePlaybackMonitor(isCheckingPlayback);
  useUserMonitor();

  if (params.access_token && !accessToken) setAccessToken(params.access_token);

  const handleCreateRoom = async () => {
    if (songInformation && accessToken) {
      const id = await createRoom(
        spotifyAPI,
        accessToken,
        songInformation as SpotifyApi.CurrentPlaybackResponse
      );
      history.push(`/rooms/${id}`);
    }
  };

  return (
    <>
      <RepeatedBackground />
      <ToggleColorMode />
      <RouteToHome />
      <Switch>
        <Route exact path='/'>
          {accessToken ? (
            <Redirect to='/search-or-share' />
          ) : (
            <Layout title='Home' centered boxed maxW={550}>
              <LoginToSpotify />
            </Layout>
          )}
        </Route>
        {accessToken ? (
          <Switch>
            <Route path='/search-or-share'>
              <Layout title='Search or Share' centered boxed maxW={550}>
                <SearchOrShare />
              </Layout>
            </Route>
            <Route path='/rooms/:roomID'>
              <Layout title='Listening Room' centered boxed maxW={550}>
                <Room
                  checkingPlayback={isCheckingPlayback}
                  setShouldCheckPlayback={setIsCheckingPlayback}
                />
              </Layout>
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
        ) : (
          <Redirect to='/' />
        )}
      </Switch>
    </>
  );
};

export default App;
