const express = require('express');
const router = express.Router();
const clienteCtrl = require('../controllers/clienteController');

router.get('/', clienteCtrl.obtenerClientes);
router.get('/:id', clienteCtrl.obtenerCliente);
router.post('/', clienteCtrl.crearCliente);
router.put('/:id', clienteCtrl.actualizarCliente);
router.delete('/:id', clienteCtrl.eliminarCliente);

module.exports = router;
