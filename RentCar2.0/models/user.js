const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    password: String,
    role: String,
    reservword: String,
});

module.exports = mongoose.model('User', userSchema);
