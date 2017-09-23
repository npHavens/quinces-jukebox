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
}
