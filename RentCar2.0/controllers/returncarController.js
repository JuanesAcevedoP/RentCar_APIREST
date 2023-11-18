const ReturnCar = require('../models/returncar');
const Rent = require('../models/rent');
const Car = require('../models/car');

const ReturnCarController = {
    getAllReturns: async (req, res) => {
        try {
            const returns = await ReturnCar.find();
            res.json(returns);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    createReturn: async (req, res) => {
        const { returnnumber, rentnumber } = req.body;

        if (!returnnumber || !rentnumber) {
            return res.status(400).json({ error: 'Todos los campos son obligatorios' });
        }

        try {
            // Obtener la información de la renta
            const rent = await Rent.findOne({ rentnumber });

            if (!rent) {
                return res.status(404).json({ error: 'Renta no encontrada' });
            }

            // Verificar si el carro está asociado a la renta
            const car = await Car.findOne({ platenumber: rent.platenumber });

            if (!car) {
                return res.status(404).json({ error: 'Carro asociado a la renta no encontrado' });
            }

            // Generar automáticamente la fecha de retorno
            const returndate = new Date();

            // Crear la devolución
            const newReturn = new ReturnCar({
                returnnumber,
                rentnumber,
                returndate,
            });

            const savedReturn = await newReturn.save();

            // Actualizar el estado del carro a "Disponible" después de la devolución
            car.state = 'Disponible';
            await car.save();

            res.json(savedReturn);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    getReturnById: async (req, res) => {
        const returnId = req.params.id;

        try {
            const returnItem = await ReturnCar.findById(returnId);
            if (!returnItem) {
                return res.status(404).json({ error: 'Devolución no encontrada' });
            }

            res.json(returnItem);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    updateReturn: async (req, res) => {
        const returnId = req.params.id;
        const updates = req.body;

        try {
            const updatedReturn = await ReturnCar.findByIdAndUpdate(returnId, updates, { new: true });
            if (!updatedReturn) {
                return res.status(404).json({ error: 'Devolución no encontrada' });
            }

            res.json(updatedReturn);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    deleteReturn: async (req, res) => {
        const returnId = req.params.id;

        try {
            const deletedReturn = await ReturnCar.findByIdAndDelete(returnId);
            if (!deletedReturn) {
                return res.status(404).json({ error: 'Devolución no encontrada' });
            }

            res.json({ message: 'Devolución eliminada correctamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

module.exports = ReturnCarController;
