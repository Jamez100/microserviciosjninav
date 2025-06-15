// services/especialidades-agenda-service/src/models/Agenda.js

import { Schema, model } from 'mongoose';

const AgendaSchema = new Schema({
//  medico_id: { type: Schema.Types.ObjectId, required: true, ref: 'Usuario' },
  // Aquí cambiamos a String para aceptar IDs del servicio de usuarios
  medico_id: { type: String, required: true },

  especialidad_id: { type: Schema.Types.ObjectId, required: true, ref: 'Especialidad' },
  fecha: { type: String, required: true },
  horas: [{ type: String, required: true }]
});

export default model('Agenda', AgendaSchema);
