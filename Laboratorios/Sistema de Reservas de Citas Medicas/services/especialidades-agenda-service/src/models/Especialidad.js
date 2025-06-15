import { Schema, model } from 'mongoose';

const EspecialidadSchema = new Schema({
  nombre: { type: String, required: true, unique: true }
});

export default model('Especialidad', EspecialidadSchema);
