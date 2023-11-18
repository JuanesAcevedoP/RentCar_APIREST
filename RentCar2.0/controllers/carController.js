const Car = require('../models/car');

const CarController = {
    getAllCars: async (req, res) => {
        try {
            const cars = await Car.find();
            res.json(cars);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createCar: async (req, res) => {
        const { platenumber, brand, state, dailyvalue } = req.body;

        if (!platenumber || !brand || !state || !dailyvalue) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            const existingCar = await Car.findOne({ platenumber });
            if (existingCar) {
                return res.status(400).json({ error: 'Ya existe un auto con esa placa' });
            }

            const newCar = new Car({
                platenumber,
                brand,
                state,
                dailyvalue,
            });

            const savedCar = await newCar.save();
            res.json(savedCar);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getCarById: async (req, res) => {
        const carId = req.params.id;

        try {
            const car = await Car.findById(carId);
            if (!car) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }

            res.json(car);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateCar: async (req, res) => {
        const carId = req.params.id;
        const updates = req.body;

        try {
            const updatedCar = await Car.findByIdAndUpdate(carId, updates, { new: true });
            if (!updatedCar) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }

            res.json(updatedCar);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteCar: async (req, res) => {
        const carId = req.params.id;

        try {
            const deletedCar = await Car.findByIdAndDelete(carId);
            if (!deletedCar) {
                return res.status(404).json({ error: 'Auto no encontrado' });
            }

            res.json({ message: 'Auto eliminado correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = CarController;
