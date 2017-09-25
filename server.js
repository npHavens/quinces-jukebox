// *** Express ***
const express = require('express');
const app = express();
const querystring = require('querystring');
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

// *** Database ***
const User = require('./db/user');
const Song = require('./db/song');

// *** Parser ***
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// *** Helper ***
const spotifyHelpers = require('./helpers/spotifyHelpers.js');
app.use(cookieParser());

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

app.get('/hostLogin', (req, res) => {
  console.log('logging in host');
  spotifyHelpers.handleHostLogin(req, res);
})

app.get('/callback', (req, res) => {
  console.log('redirecting');
  spotifyHelpers.redirectAfterLogin(req, res);
})

// POST at /songs
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


app.get('/hostLogin', (req, res) => {
  console.log('logging in host')
  //res.send('logging in host')
  res.send('logging in host')
  //spotifyHelpers.handleHostLogin(req, res);
});

app.get('/callback', (req, res) => {
  spotifyHelpers.handleRedirectAfterLogin(req, res);
});
// send 404 to client
app.get('/*', function(req, res) {
  res.status(404).send('Not Found');
});

// *** Server ***
const server = app.listen(3000, function() {
  console.log('Listening at http://localhost:3000');
});
