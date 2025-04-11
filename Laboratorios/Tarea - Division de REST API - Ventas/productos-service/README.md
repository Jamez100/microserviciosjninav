npm install

Docker Build
docker build -t productos-service .     


Docker Run
docker run -p 5002:5002 productos-service

Documentación Swagger
http://localhost:5002/api-docs   ← productos

Postman

GET /api/productos

GET /api/productos/:id

POST /api/productos

PUT /api/productos/:id

DELETE /api/productos/:id