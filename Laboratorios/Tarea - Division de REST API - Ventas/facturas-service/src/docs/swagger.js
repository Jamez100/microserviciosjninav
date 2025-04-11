const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Facturas API',
      version: '1.0.0',
      description: 'API REST para gestión de facturas y detalles de facturas',
    },
  },
  apis: ['./src/routes/*.js'], // Aquí Swagger buscará las anotaciones
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
