const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/quince');

mongoose.connection
    .once('open', () => {
        console.log('Successfully connected');
    })
    .on('error', (error) => {
        console.warn('Warning', error);
    });

module.exports = mongoose;