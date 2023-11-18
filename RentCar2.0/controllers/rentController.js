const Rent = require('../models/rent');
const Car = require('../models/car');

const RentController = {
    getAllRents: async (req, res) => {
        try {
            const rents = await Rent.find();
            res.json(rents);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createRent: async (req, res) => {
        const { rentnumber, username, platenumber, status } = req.body;

        if (!rentnumber || !username || !platenumber || !status) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            // Verificar si el carro está disponible antes de crear el alquiler
            const car = await Car.findOne({ platenumber });

            if (!car) {
                return res.status(404).json({ error: 'Carro no encontrado' });
            }

            if (car.state !== 'Disponible') {
                return res.status(400).json({ error: 'El carro no está disponible para alquiler' });
            }

            // Generar automáticamente las fechas
            const initialdate = new Date();
            const finaldate = new Date();
            finaldate.setDate(initialdate.getDate() + 8); // 8 días después de la fecha inicial

            // Crear el alquiler si el carro está disponible
            const newRent = new Rent({
                rentnumber,
                username,
                platenumber,
                initialdate,
                finaldate,
                status,
            });

            const savedRent = await newRent.save();

            // Actualizar el estado del carro a "No Disponible" después de rentarlo
            car.state = 'No Disponible';
            await car.save();

            res.json(savedRent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getRentById: async (req, res) => {
        const rentId = req.params.id;

        try {
            const rent = await Rent.findById(rentId);
            if (!rent) {
                return res.status(404).json({ error: 'Alquiler no encontrado' });
            }

            res.json(rent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateRent: async (req, res) => {
        const rentId = req.params.id;
        const updates = req.body;

        try {
            const updatedRent = await Rent.findByIdAndUpdate(rentId, updates, { new: true });
            if (!updatedRent) {
                return res.status(404).json({ error: 'Alquiler no encontrado' });
            }

            res.json(updatedRent);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteRent: async (req, res) => {
        const rentId = req.params.id;

        try {
            const deletedRent = await Rent.findByIdAndDelete(rentId);
            if (!deletedRent) {
                return res.status(404).json({ error: 'Alquiler no encontrado' });
            }

            res.json({ message: 'Alquiler eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = RentController;
