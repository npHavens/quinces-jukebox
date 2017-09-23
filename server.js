const express = require('express');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const spotifyHelpers = require('./helpers/spotifyHelpers.js');
const app = express();

const compiler = webpack(webpackConfig);

app.use(express.static(__dirname + '/www'));

const server = app.listen(3000, function() {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

// GET at /
// render home page

// ** songs **
// GET at /songs
// fetch top 10 songs from songs collection and send to client

// GET at /songs/search
// initiate ajax call

// POST at /songs
// add song to both users collection and songs collection

// POST at /songs/votes
// update vote on songs collection

// ** users **
// POST at /login
// direct to song playlist page

// POST at /signup
// add user to users collection
// direct to song playlist page

// GET at /logout
// direct to home page

// GET at all other routes
// send 404 to client
