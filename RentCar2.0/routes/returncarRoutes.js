const express = require('express');
const router = express.Router();
const ReturnCarController = require('../controllers/returncarController');

// Definir rutas CRUD para devoluciones
router.get('/', ReturnCarController.getAllReturns);
router.post('/', ReturnCarController.createReturn);
router.get('/:id', ReturnCarController.getReturnById);
router.put('/:id', ReturnCarController.updateReturn);
router.delete('/:id', ReturnCarController.deleteReturn);

module.exports = router;
