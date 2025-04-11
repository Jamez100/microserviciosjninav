const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
});

module.exports = mongoose.model('Factura', facturaSchema);
