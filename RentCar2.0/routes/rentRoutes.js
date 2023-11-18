const express = require('express');
const router = express.Router();
const RentController = require('../controllers/rentController');

// Definir rutas CRUD para alquileres
router.get('/', RentController.getAllRents);
router.post('/', RentController.createRent);
router.get('/:id', RentController.getRentById);
router.put('/:id', RentController.updateRent);
router.delete('/:id', RentController.deleteRent);

module.exports = router;
