// *** Express ***
const express = require('express');
const app = express();
const cors = require('cors');
const env = require('./env/credentials.js')

// *** Webpack ***
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require(`./webpack.config${env.prod ? '.prod' : ''}.js`);
const compiler = webpack(webpackConfig);

if (!env.prod) {
  app.use(webpackDevMiddleware(compiler, {
    hot: true,
    filename: 'bundle.js',
    publicPath: '/',
    stats: {
    colors: true,
    },
    historyApiFallback: true,
  }));
}
app.use(cors());

// *** Static Assets ***
app.use(express.static(__dirname + '/public'));


// *** Database ***
const User = require('./db/user');
const Song = require('./db/song');

// *** Parser ***
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const cookieParser = require('cookie-parser');
app.use(cookieParser());
const querystring = require('querystring');

// *** Session ***
var session = require('express-session');
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));

// *** Helper ***
const spotifyHelpers = require('./helpers/spotifyHelpers.js');

// *** Routes ***

// fetch top 50 songs by netVoteCount from songs collection and send to client
app.get('/songs', function(req, res) {
  Song.find({}).sort({netVoteCount: 'descending'}).limit(50)
  .then(function(songs) {
    res.json(songs);
  });
});

// fetch song research results and send to client
app.get('/songs/search', (req, res) => {
  spotifyHelpers.getTrackSearchResults(req.query.query)
  .then((results) => {
    console.log(results.tracks.items[0].album.images[1])
      res.json(results);
    });
});

// add song to both user collection and songs collection
app.post('/songs', function(req, res) {
  console.log(req.body);
  var newSong = new Song({
    name: req.body.name,
    image: req.body.image,
    link: req.body.link,
    userName: req.body.userName,
    artist: req.body.artist
  });
  User.findOne({name: req.body.userName})
  .then(function(user) {
    if (user) {
      user.addedSongs.push(newSong);
      user.save();
      return newSong.save();
    }
  })
  .then(function() {
    res.sendStatus(201);
  });
});

// update vote on both songs collection and users collection
app.put('/song', function(req, res) {
  Song.findOne({name: req.body.name})
  .then(function(song) {
    if (song) {
      if(req.body.vote > 0) {
        song.upVoteCount++;
      } else {
        song.downVoteCount++;
      }
      song.save();
      res.sendStatus(201);
    }
  });
});

app.delete('/song', function(req, res) {
  const songID = req.body._id;
  Song.remove({
    "_id": ObjectId(songID)
  });
});

// add user to users collection
app.post('/signup', function(req, res) {
  var newUser = new User({
    name: req.body.username
  });

  User.findOne({name: req.body.username})
  .then(function(user) {
    if (!user) {
      newUser.save()
      .then(function() {
        req.session.username = req.body.username;
        res.sendStatus(201);
      });
    } else {
      res.send('User already exist!');
    }
  });
});

app.get('/users', (req,res) => {
  User.find({})
  .then(function(users) {
    res.json(users);
  });
})

// POST at /login
// GET at /logout

// Host Authentication
app.get('/hostLogin', (req, res) => {
  console.log('logging in host');
  spotifyHelpers.handleHostLogin(req, res);
});

app.get('/callback', (req, res) => {
  console.log('redirecting');
  spotifyHelpers.redirectAfterLogin(req, res);
});

// send 404 to client
app.get('/*', function(req, res) {
  res.status(404).send('Not Found');
});

// *** Server ***
const server = app.listen(3000, function() {
  console.log('Listening at http://localhost:3000');
});

