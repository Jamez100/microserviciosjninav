const mongoose = require('mongoose');

const detalleSchema = new mongoose.Schema({
  facturaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Factura', required: true },
  productoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true }
});

module.exports = mongoose.model('Detalle', detalleSchema);
