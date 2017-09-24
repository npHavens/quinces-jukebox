const mongoose = require('./config');
const User = require('./user');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: {type: String, index: {unique: true}},
    userID: Number,
    image: String,
    upVoteCount: {type: Number, default: 0},
    downVoteCount: {type: Number, default: 0},
    netCount: Number
});

const Song = mongoose.model('song', SongSchema);

// dummy data
new Song({name: 'Purple Rain',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 5, downVoteCount: 3}).save();
new Song({name: 'When Doves Cry',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 7, downVoteCount: 3}).save();
new Song({name: 'Let\'s Go Crazy',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 5, downVoteCount: 8}).save();
new Song({name: 'I Would Die 4 U',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 5, downVoteCount: 8}).save();
new Song({name: 'The Beautiful Ones',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  downVoteCount: 3}).save();
new Song({name: 'Darling Nikki',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 5, downVoteCount: 1}).save();
new Song({name: 'Baby I\'m A Star',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 10, downVoteCount: 3}).save();
new Song({name: 'Take Me With U',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd',
  upVoteCount: 5, downVoteCount: 8}).save();
new Song({name: 'Purple Rain - 2015 Paisley Park Remaster',
  image: 'https://i.scdn.co/image/00f45f84cc30a651bd9575c9663465996780c9cd'})
  .save();

module.exports = Song;
