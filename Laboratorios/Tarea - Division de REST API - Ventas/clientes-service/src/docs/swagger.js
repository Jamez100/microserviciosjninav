const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Clientes Service API',
      version: '1.0.0',
      description: 'API para gestionar clientes'
    },
    servers: [
      { url: 'http://localhost:5001' }
    ],
    components: {
      schemas: {
        Cliente: {
          type: 'object',
          properties: {
            ci: { type: 'string' },
            nombres: { type: 'string' },
            apellidos: { type: 'string' },
            sexo: { type: 'string', enum: ['M', 'F', 'Otro'] }
          },
          required: ['ci', 'nombres', 'apellidos', 'sexo']
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
