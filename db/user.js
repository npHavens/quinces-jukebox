const mongoose = require('./config');
const Song = require('./song');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: String,
    votes: {
        // Song.name: +1/-1
    }
});

const User = mongoose.model('user', UserSchema);

module.exports = User;