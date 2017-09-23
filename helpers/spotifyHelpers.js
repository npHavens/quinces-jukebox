const credentials = require('../env/credentials.js');
const request = require('request');

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

const authorizedRequest = (callback) => {}

exports.getTrackSearchResults = (queryString) => {

}
