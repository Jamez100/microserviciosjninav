npm install

Docker Build
docker build -t productos-service .     # o facturas-service


Docker Run
docker run -p 5003:5003 facturas-service

Documentación Swagger
http://localhost:5003/api-docs   ← facturas

Postman

GET /api/facturas

GET /api/facturas/:id

GET /api/facturas/cliente/:clienteId

POST /api/facturas

PUT /api/facturas/:id

DELETE /api/facturas/:id