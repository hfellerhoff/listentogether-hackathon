import * as functions from 'firebase-functions';
import * as express from 'express'; // Express web server framework
import * as request from 'request'; // "Request" library
import * as cors from 'cors';
import * as querystring from 'querystring';
import * as cookieParser from 'cookie-parser';
import * as dotenv from 'dotenv';
import generateRandomString from './util/generateRandomString';
dotenv.config();
// https://listen-together-hf.web.app
const redirect_uri =
  'https://us-central1-listen-together-hf.cloudfunctions.net/app/callback'; // Your redirect uri
// 'http://localhost:5001/listen-together-hf/us-central1/app/callback'; // Your redirect uri
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

  // your application requests authorization
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
      '/#' +
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
        const access_token = body.access_token,
          refresh_token = body.refresh_token;

        // const options = {
        //   url: 'https://api.spotify.com/v1/me',
        //   headers: { Authorization: 'Bearer ' + access_token },
        //   json: true,
        // };

        // use the access token to access the Spotify Web API
        // request.get(options, function (error, response, body) {
        //   console.log(body);
        // });

        // we can also pass the token to the browser to make requests from there
        //'http://localhost:3000/#'
        res.redirect(
          'https://listen-together-hf.web.app/#' +
            querystring.stringify({
              access_token: access_token,
              refresh_token: refresh_token,
            })
        );
      } else {
        res.redirect(
          '/#' +
            querystring.stringify({
              error: 'invalid_token',
            })
        );
      }
    });
  }
});

// app.get('/refresh_token', function (req, res) {
//   // requesting access token from refresh token
//   const refresh_token = req.query.refresh_token;
//   const authOptions = {
//     url: 'https://accounts.spotify.com/api/token',
//     headers: {
//       Authorization:
//         'Basic ' +
//         new Buffer(
//           process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET
//         ).toString('base64'),
//     },
//     form: {
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token,
//     },
//     json: true,
//   };

//   request.post(authOptions, function (error, response, body) {
//     if (!error && response.statusCode === 200) {
//       const access_token = body.access_token;
//       res.send({
//         access_token: access_token,
//       });
//     }
//   });
// });

exports.app = functions.https.onRequest(app);
