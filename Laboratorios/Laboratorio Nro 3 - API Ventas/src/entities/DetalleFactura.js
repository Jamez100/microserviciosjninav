const mongoose = require('mongoose');

const DetalleFacturaSchema = new mongoose.Schema({
  factura_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Factura', required: true },
  producto_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Producto', required: true },
  cantidad: { type: Number, required: true },
  precio: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('DetalleFactura', DetalleFacturaSchema);
