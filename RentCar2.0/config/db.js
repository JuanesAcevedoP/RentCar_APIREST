const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('Conexión exitosa a MongoDB Atlas');
    } catch (error) {
        console.error('Error de conexión a MongoDB:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
