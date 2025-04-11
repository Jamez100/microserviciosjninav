const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true
  },
  autor: {
    type: String,
    required: true
  },
  editorial: {
    type: String,
    required: true
  },
  año: {
    type: Date,
    required: true
  },
  descripcion: {
    type: String,
    required: true
  },
  numpagina: {
    type: String,
    required: true
  },
  estado: {
    type: String,
    enum: ['no entregado', 'entregado'],
    default: 'pendiente'
  },
});

module.exports = mongoose.model('libro', TareaSchema);
