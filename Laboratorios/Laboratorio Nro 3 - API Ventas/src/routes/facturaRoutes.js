const express = require('express');
const router = express.Router();
const facturaCtrl = require('../controllers/facturaController');

router.get('/', facturaCtrl.obtenerFacturas);
router.get('/:id', facturaCtrl.obtenerFactura);
router.get('/cliente/:clienteId', facturaCtrl.obtenerFacturasPorCliente);
router.post('/', facturaCtrl.crearFactura);
router.put('/:id', facturaCtrl.actualizarFactura);
router.delete('/:id', facturaCtrl.eliminarFactura);

module.exports = router;
