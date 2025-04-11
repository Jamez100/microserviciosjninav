const express = require('express');
const router = express.Router();
const clienteCtrl = require('../controllers/clienteController');

/**
 * @swagger
 * /api/clientes:
 *   get:
 *     summary: Obtiene la lista de clientes
 *     responses:
 *       200:
 *         description: Lista de clientes
 *   post:
 *     summary: Crea un nuevo cliente
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Cliente creado
 */
router.get('/', clienteCtrl.obtenerClientes);
router.post('/', clienteCtrl.crearCliente);

/**
 * @swagger
 * /api/clientes/{id}:
 *   get:
 *     summary: Obtiene un cliente por su ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente obtenido
 *       404:
 *         description: Cliente no encontrado
 *   put:
 *     summary: Actualiza un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Cliente actualizado
 *   delete:
 *     summary: Elimina un cliente
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cliente eliminado
 */
router.get('/:id', clienteCtrl.obtenerCliente);
router.put('/:id', clienteCtrl.actualizarCliente);
router.delete('/:id', clienteCtrl.eliminarCliente);

module.exports = router;
