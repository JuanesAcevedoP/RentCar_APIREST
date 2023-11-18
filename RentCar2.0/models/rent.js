const mongoose = require('mongoose');

const rentSchema = new mongoose.Schema({
    rentnumber: String,
    username: String,
    platenumber: String,
    initialdate: Date,
    finaldate: Date,
    status: String,
});

module.exports = mongoose.model('Rent', rentSchema);
