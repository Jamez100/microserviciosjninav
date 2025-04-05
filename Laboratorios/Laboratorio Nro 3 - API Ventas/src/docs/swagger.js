const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Sistema de Ventas API',
      version: '1.0.0',
      description: 'API RESTful para gestionar productos, clientes, facturas y detalles de facturas'
    },
    servers: [
      { url: 'http://localhost:5000' }
    ]
  },
  apis: ['./src/routes/*.js'] // Se generan comentarios en las rutas para documentación
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
