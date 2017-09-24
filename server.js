// *** Express ***
const express = require('express');
const app = express();

// *** Webpack ***
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');
const compiler = webpack(webpackConfig);
app.use(webpackDevMiddleware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
  colors: true,
  },
  historyApiFallback: true,
}));

// *** Static Assets ***
app.use(express.static(__dirname + '/www'));

// *** Database ***
const User = require('./db/user');
const Song = require('./db/song');

// *** Helper ***
const spotifyHelpers = require('./helpers/spotifyHelpers.js');

// *** Routes ***

// GET at /
// render home page

// fetch top 10 songs by netVoteCount and send to client
app.get('/songs', function(req, res) {
  Song.find({}).sort({netVoteCount: 'descending'}).limit(10)
  .then(function(songs) {
    res.json(songs);
  });
});

// GET at /songs/search
app.get('/songs/search', (req, res) => {
  console.log(req.query.query);
  spotifyHelpers.getTrackSearchResults(req.query.query)
    .then((result) => {
        res.send(result);
      });
});

// POST at /songs
app.post('/songs', (req, res) => {
  new Song({
    name: "Sound of Silence",
    userID: 1,
    image: "https://i.scdn.co/image/cc3bbe5a796b2b23384862d046f55e7118380db9",
    upVoteCount: 0,
    downVoteCount: 0,
    netCount: 0
  }).save((err) => {
    if(err) res.json(err);
    else res.status(201).send('Sucessfully inserted');
  })
})

// POST at /songs
// add song to both users collection and songs collection

// POST at /songs/votes
// update vote on songs collection

// POST at /login
// direct to song playlist page

// POST at /signup
// add user to users collection
// direct to song playlist page

// GET at /logout
// direct to home page

// GET at all other routes
// send 404 to client

// *** Server ***
const server = app.listen(3000, function() {
  console.log('Listening at http://localhost:3000');
});
