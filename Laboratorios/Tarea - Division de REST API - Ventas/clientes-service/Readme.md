# [Nombre del Microservicio] Service API

Este microservicio forma parte del Sistema de Ventas y se encarga de gestionar [Clientes/Productos/Facturas].  
La API RESTful utiliza JSON para el intercambio de datos y está documentada con Swagger.

## Ejecutar el Programa

Puedes iniciar el servicio ejecutando:

npm src/app.js


npm install express dotenv body-parser mysql2 mongoose typeorm swagger-jsdoc swagger-ui-express bcrypt cors

Para elDocker
docker build -t api-rest-cliente-service .
docker run -p 5001:5001 api-rest-cliente-service