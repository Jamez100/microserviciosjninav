// src/models/libro.js
const mongoose = require('mongoose');

const LibroSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  autor: { type: String, required: true },
  editorial: { type: String, required: true },
  año: { type: Number, required: true },
  descripcion: { type: String, required: true },
  numPaginas: { type: Number, required: true },
  estado: { type: String, enum: ['no entregado', 'entregado'], default: 'no entregado' }
}, { timestamps: true });

module.exports = mongoose.model('Libro', LibroSchema);
