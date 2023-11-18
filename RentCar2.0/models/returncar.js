const mongoose = require('mongoose');

const returncarSchema = new mongoose.Schema({
    returnnumber: String,
    rentnumber: String,
    returndate: Date,
});

module.exports = mongoose.model('ReturnCar', returncarSchema);
