/*
    Brief disclaimer: much of this code is borrowed/inspired from this
    GitHub library by a Spotify developer here:

    https://github.com/spotify/web-api-auth-examples

    If you have any questions, that would be the best place to check first
    as they know much more about this than I do. 

    Good luck!
*/

import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as express from 'express';
import * as request from 'request';
import * as cors from 'cors';
import * as querystring from 'querystring';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import generateRandomString from './util/generateRandomString';
dotenv.config();

admin.initializeApp();
const firestore = admin.firestore();

// This solution is incredibly temporary and hacky:
// Firebase doesn't support process.env.NODE_ENV, so
// this is what I am doing until I figure out a better
// solution. If you are hosting this on a real Node
// server and not Firebase Functions, swap out this
// ungodly boolean below for the commented code.
const isDevelopment = true; // !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

const redirect_uri = isDevelopment
  ? 'http://localhost:5001/listen-together-hf/us-central1/app/callback'
  : 'https://us-central1-listen-together-hf.cloudfunctions.net/app/callback';
const callbackURI = isDevelopment
  ? 'http://localhost:3000/#'
  : 'https://listentogether.app/#';

const stateKey = 'spotify_auth_state';

const scope =
  'user-read-private user-read-email user-read-playback-state user-modify-playback-state streaming';

const app = express();
const { client_id, client_secret } = functions.config().spotify;

app
  .use(express.static(__dirname + '/public'))
  .use(cors())
  .use(cookieParser());

app.get('/login', (req, res) => {
  const state = generateRandomString(16);
  res.cookie(stateKey, state);

  // Request authentication from Spotify
  res.redirect(
    'https://accounts.spotify.com/authorize?' +
      querystring.stringify({
        response_type: 'code',
        client_id,
        scope,
        redirect_uri: redirect_uri,
        state,
      })
  );
});

app.get('/callback', function (req, res) {
  // your application requests refresh and access tokens
  // after checking the state parameter

  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies[stateKey] : null;

  if (state === null || state !== storedState) {
    res.redirect(
      callbackURI +
        querystring.stringify({
          error: 'state_mismatch',
        })
    );
  } else {
    res.clearCookie(stateKey);
    const authOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: redirect_uri,
        grant_type: 'authorization_code',
      },
      headers: {
        Authorization:
          'Basic ' +
          new Buffer(client_id + ':' + client_secret).toString('base64'),
      },
      json: true,
    };

    request.post(authOptions, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        const access_token = body.access_token;
        const refresh_token = body.refresh_token;

        // Pass the access token back to the Listen Together client
        // to be able to make client-side API requests
        res.redirect(
          callbackURI +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          callbackURI +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

// Specific to Firebase – I don't believe this is needed for a standalone Node server
exports.app = functions.https.onRequest(app);

exports.onUserDisconnect = functions.database
  .ref('connected/{userID}')
  .onUpdate(async (snapshot, context) => {
    const before = snapshot.before.val();
    const userID = context.params.userID;

    if (before) {
      const userRef = firestore.collection('users').doc(userID);

      const userDocument = await userRef.get();
      const user = userDocument.data();

      if (!user) return null;
      if (!user.currentRoomID) return null; // No room to leave

      const roomRef = firestore.collection('rooms').doc(user.currentRoomID);
      const listenersRef = roomRef.collection('details').doc('listeners');

      await roomRef.update({
        'count.listeners': admin.firestore.FieldValue.increment(-1),
      });

      await listenersRef.update({
        [`listeners.${userID}`]: admin.firestore.FieldValue.delete(),
      });

      return userRef.update({
        currentRoomID: null,
      });
    }

    return null;
  });
