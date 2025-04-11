const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
  ci: { type: String, required: true, unique: true },
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true },
  sexo: { type: String, required: true, enum: ['M', 'F', 'Otro'] }
}, { timestamps: true });

module.exports = mongoose.model('Cliente', ClienteSchema);
