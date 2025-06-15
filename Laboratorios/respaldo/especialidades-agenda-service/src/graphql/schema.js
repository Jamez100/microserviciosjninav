import { gql } from 'apollo-server';
import Especialidad from '../models/Especialidad.js';
import Agenda from '../models/Agenda.js';

export const typeDefs = gql`
  type Especialidad { id: ID!, nombre: String! }
  type Agenda { id: ID!, medico_id: ID!, especialidad_id: ID!, fecha: String!, horas: [String!]! }

  type Query {
    especialidades: [Especialidad!]!
    agendas(especialidad_id: ID, fecha: String): [Agenda!]!
  }

  type Mutation {
    addEspecialidad(nombre: String!): Especialidad!
    setAgenda(medico_id: ID!, especialidad_id: ID!, fecha: String!, horas: [String!]!): Agenda!
  }
`;

export const resolvers = {
  Query: {
    especialidades: async () => {
      // .exec() convierte el Query en un Promise “puro”
      return await Especialidad.find().exec();
    },
    agendas: async (_, { especialidad_id, fecha }) => {
      const filtro = {};
      if (especialidad_id) filtro.especialidad_id = especialidad_id;
      if (fecha) filtro.fecha = fecha;
      // al usar await aquí ya no queda un Query colgando
      return await Agenda.find(filtro).exec();
    }
  },
  Mutation: {
    addEspecialidad: async (_, { nombre }) => {
      return await Especialidad.create({ nombre });
    },
    setAgenda: async (_, { medico_id, especialidad_id, fecha, horas }) => {
      return await Agenda.create({ medico_id, especialidad_id, fecha, horas });
    }
  }
};

