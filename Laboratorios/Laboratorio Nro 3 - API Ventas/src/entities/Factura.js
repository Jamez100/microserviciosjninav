const mongoose = require('mongoose');

const FacturaSchema = new mongoose.Schema({
  fecha: { type: Date, default: Date.now },
  cliente_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Factura', FacturaSchema);
