// src/config/swagger.js

const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Login Service API',
      version: '1.0.0',
      description: 'API para autenticación de usuarios y generación de JWT',
    },
    servers: [
      {
        url: 'http://localhost:' + process.env.PORT,
      },
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'], // rutas donde están los comentarios swagger
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
