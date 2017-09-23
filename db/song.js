const mongoose = require('./config');
const User = require('./user');

const Schema = mongoose.Schema;

const SongSchema = new Schema({
    name: String,
    image: String,
    upVoteCount: Number,
    downVoteCount: Number,
    netCount: Number
});

const Song = mongoose.model('song', SongSchema);

module.exports = Song;