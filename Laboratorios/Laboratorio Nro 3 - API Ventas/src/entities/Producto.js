const mongoose = require('mongoose');

const ProductoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  marca: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Producto', ProductoSchema);