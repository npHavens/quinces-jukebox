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

// *** Parser ***
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// *** Helper ***
const spotifyHelpers = require('./helpers/spotifyHelpers.js');

// *** Routes ***

// GET at /
// render home page

// fetch top 10 songs by netVoteCount from songs collection and send to client
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
// add song to both users collection and songs collection
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

// update vote on both songs collection and users collection
app.post('/songs/votes', function(req, res) {
  // need to get from client: song name, user name, upvote or downvote
});

// POST at /login
// direct to song playlist page

// add user to users collection and direct them to song playlist page
app.post('/signup', function(req, res) {
  console.log('->', req.body);
  new User({name: req.body.username}).save()
  .then(function() {
    // direct them to song playlist page
  });
});

// GET at /logout
// direct to home page

// send 404 to client
app.get('/*', function(req, res) {
  res.status(404).send('Not Found');
});

// *** Server ***
const server = app.listen(3000, function() {
  console.log('Listening at http://localhost:3000');
});
