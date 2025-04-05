const express = require('express');
const router = express.Router();
const productoCtrl = require('../controllers/productoController');

/**
 * @swagger
 * /api/productos:
 *   get:
 *     summary: Obtiene la lista de productos
 *     responses:
 *       200:
 *         description: Lista de productos.
 */
router.get('/', productoCtrl.obtenerProductos);
router.get('/:id', productoCtrl.obtenerProducto);
router.post('/', productoCtrl.crearProducto);
router.put('/:id', productoCtrl.actualizarProducto);
router.delete('/:id', productoCtrl.eliminarProducto);

module.exports = router;
