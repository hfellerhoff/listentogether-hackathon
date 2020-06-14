import React, { useState, useEffect } from 'react';
import { Switch, Route, Redirect, useHistory } from 'react-router-dom';
import Layout from './components/layout';
import RepeatedBackground from './components/RepeatedBackground';
import getHashParams from './util/getHashParams';
import ToggleColorMode from './components/ToggleColorMode';
import usePlaybackMonitor from './hooks/usePlaybackMonitor';
import { LoginToSpotify, SearchOrShare, ChooseSong, ShareSong } from './routes';
import createRoom from './firebase/createRoom';
import Spotify from 'spotify-web-api-js';
import Rooms from './routes/Rooms';
import Room from './routes/Room';
import RouteToHome from './components/RouteToHome';
const spotifyAPI = new Spotify();

const App = () => {
  const { access_token } = getHashParams() as { access_token: string };
  const history = useHistory();
  const [savedAccessToken, setSavedAccessToken] = useState<string | null>(null);
  const [isCheckingPlayback, setIsCheckingPlayback] = useState(false);
  const songInformation = usePlaybackMonitor(
    spotifyAPI,
    savedAccessToken,
    isCheckingPlayback
  );
  if (access_token && !savedAccessToken) setSavedAccessToken(access_token);
  const [
    user,
    setUser,
  ] = useState<SpotifyApi.CurrentUsersProfileResponse | null>(null);

  useEffect(() => {
    const updateUser = async () => {
      if (!savedAccessToken) return;
      try {
        const response = await spotifyAPI.getMe({
          access_token: savedAccessToken,
        });
        setUser(response);
      } catch (error) {
        console.log(savedAccessToken);
        console.error('User fetch error:');
        console.error(error);
      }
    };

    if (savedAccessToken && !user) updateUser();
  }, [savedAccessToken, setUser, user]);

  const handleCreateRoom = async () => {
    if (songInformation && savedAccessToken) {
      const id = await createRoom(
        spotifyAPI,
        savedAccessToken,
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
          {savedAccessToken ? (
            <Redirect to='/search-or-share' />
          ) : (
            <Layout title='Home' centered boxed maxW={550}>
              <LoginToSpotify />
            </Layout>
          )}
        </Route>
        {savedAccessToken ? (
          <Switch>
            <Route path='/search-or-share'>
              <Layout title='Search or Share' centered boxed maxW={550}>
                <SearchOrShare />
              </Layout>
            </Route>
            <Route path='/rooms/:roomID'>
              <Layout title='Listening Room' centered boxed maxW={550}>
                <Room
                  accessToken={savedAccessToken}
                  spotifyApi={spotifyAPI}
                  user={user}
                  songInformation={songInformation}
                  checkingPlayback={isCheckingPlayback}
                  setShouldCheckPlayback={setIsCheckingPlayback}
                />
              </Layout>
            </Route>
            <Route path='/rooms'>
              <Layout title='Rooms' centered boxed maxW={700}>
                <Rooms accessToken={savedAccessToken} spotifyApi={spotifyAPI} />
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
