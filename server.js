// *** Express ***
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

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

app.use(cookieParser);

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

// fetch top 10 songs by netVoteCount from songs collection and send to client
app.get('/songs', function(req, res) {
  Song.find({}).sort({netVoteCount: 'descending'}).limit(10)
  .then(function(songs) {
    res.json(songs);
  });
});

// fetch song research results and send to client
app.get('/songs/search', (req, res) => {
  spotifyHelpers.getTrackSearchResults(req.query.query)
  .then((results) => {
      res.json(results);
    });
});

// add song to both users collection and songs collection
app.post('/songs', (req, res) => {
  var newSong = new Song(req.body);
  newSong.save()
  .then((newSong) => {
    res.status(201).send(newSong);
  });
});

// update vote on both songs collection and users collection
app.put('/song', function(req, res) {
  Song.findOne({name: req.body.name})
  .then(function(song) {
    if (song) {
      song.upVoteCount++;
      song.save();
      res.sendStatus(201);
    }
  });
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
