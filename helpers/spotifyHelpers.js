const credentials = require('../env/credentials.js');
const request = require('request');
const Promise = require('bluebird');

const authOptions = {
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
    request.post(authOptions, (error, response, body) => {
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

exports.redirectAfterLogin = (req, response) => {

};