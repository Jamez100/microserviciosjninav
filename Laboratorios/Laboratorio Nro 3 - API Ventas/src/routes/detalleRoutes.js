const express = require('express');
const router = express.Router();
const detalleCtrl = require('../controllers/detalleController');

router.post('/', detalleCtrl.crearDetalle);
router.get('/:facturaId', detalleCtrl.obtenerDetallesPorFactura);
router.put('/:id', detalleCtrl.actualizarDetalle);
router.delete('/:id', detalleCtrl.eliminarDetalle);

module.exports = router;
