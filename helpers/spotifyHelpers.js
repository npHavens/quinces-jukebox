const credentials = require('../env/credentials.js');
const Promise = require('bluebird');
const cookieParser = require('cookie-parser');
const request = require('request');
const querystring = require('querystring');


const searchAuthOptions = {
  url: 'https://accounts.spotify.com/api/token',
  headers: {
    'Authorization': 'Basic ' + (new Buffer(credentials.client_id + ':' + credentials.client_secret).toString('base64'))
  },
  form: {
    grant_type: 'client_credentials'
  },
  json: true
};

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

exports.getTrackSearchResults = (queryString) => {
  return new Promise((resolve, reject) => {
    request.post(searchAuthOptions, (error, response, body) => {
      if (!error && response.statusCode === 200) {
        const token = body.access_token;
        const options = {
          url: `https://api.spotify.com/v1/search?q=${queryString}&type=track&market=US&limit=10`,
          headers: {'Authorization': 'Bearer ' + token},
          json: true
        };
        request.get(options, (error, response, body) => {
          if (error) {
            reject(error);
          }
          resolve(body);
        });
      }
    });
  });
};

exports.handleHostLogin = (req, res) => {
  const state = generateRandomString(16);
  const scope = 'user-read-private user-read-email user-read-playback-state';

  res.cookie('spotify_auth_state', state);

  res.redirect('https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: credentials.client_id,
      scope: scope,
      redirect_uri: 'http://localhost:3000/callback',
      state: state
    }));
};

exports.redirectAfterLogin = (req, res) => {
  const code = req.query.code || null;
  const state = req.query.state || null;
  const storedState = req.cookies ? req.cookies['spotify_auth_state'] : null;

  if (state === null || state !== storedState) {
    res.redirect('/#' +
      querystring.stringify({
        error: 'state_mismatch'
      }));
  } else {
    res.clearCookie('spotify_auth_state');
    const playerAuthOptions = {
      url: 'https://accounts.spotify.com/api/token',
      form: {
        code: code,
        redirect_uri: 'http://localhost:3000/callback',
        grant_type: 'authorization_code'
      },
      headers: {
        'Authorization': 'Basic ' + (new Buffer(credentials.client_id + ':' + credentials.client_secret).toString('base64'))
      },
      json: true
    };
  }

  request.post(playerauthOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {

      const access_token = body.access_token;
      const refresh_token = body.refresh_token;

      const options = {
        url: "https://api.spotify.com/v1/me/player/devices",
        headers: { 'Authorization': 'Bearer ' + access_token },
        json: true
      };

      // use the access token to access the Spotify Web API
      //console.log(refresh_token)

      // we can also pass the token to the browser to make requests from there
      res.redirect('http://localhost:3000/#' +
        querystring.stringify({
          access_token: access_token,
          refresh_token: refresh_token
        }));
    } else {
      res.redirect('/#' +
        querystring.stringify({
          error: 'invalid_token'
        }));
    }
  });
};