const express = require('express');
const router = express.Router();
const detalleController = require('../controllers/detalleController');

router.post('/', detalleController.crearDetalle);
router.get('/:facturaId', detalleController.obtenerDetallesPorFactura);
router.put('/:id', detalleController.actualizarDetalle);
router.delete('/:id', detalleController.eliminarDetalle);

module.exports = router;
