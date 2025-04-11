const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  descripcion: String,
  marca: String,
  stock: { type: Number, required: true },
});

module.exports = mongoose.model('Producto', productoSchema);
