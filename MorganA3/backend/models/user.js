const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    googleId: {
        type: String,
    }
});


module.exports = mongoose.model('User', userSchema); 