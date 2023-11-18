const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Importar rutas
const userRoutes = require('./routes/userRoutes');
const carRoutes = require('./routes/carRoutes');
const rentRoutes = require('./routes/rentRoutes');
const returncarRoutes = require('./routes/returncarRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Conectado a la base de datos de MongoDB Atlas"))
    .catch(()=>console.error("Error de conexión a la base de datos") )

// Rutas
app.use('/users', userRoutes);
app.use('/cars', carRoutes);
app.use('/rents', rentRoutes);
app.use('/returns', returncarRoutes);

app.get('/', (req, res) => {
    res.send('Hola, desde API REST');
});

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
