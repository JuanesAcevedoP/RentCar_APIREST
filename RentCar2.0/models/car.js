const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    platenumber: String,
    brand: String,
    state: String,
    dailyvalue: Number,
});

module.exports = mongoose.model('Car', carSchema);
