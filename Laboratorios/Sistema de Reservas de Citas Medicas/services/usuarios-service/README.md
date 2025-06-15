## Levantar la BD
docker-compose up -d usuarios-db

## Esto leerá el SQL y lo pasará por stdin al contenedor.
Get-Content .\services\usuarios-service\migrations\20250611_create_users_table.sql `
  | docker exec -i usuarios-db mysql -uuser -ppass usuariosdb



type .\services\usuarios-service\migrations\20250611_create_users_table.sql `
  | docker exec -i usuarios-db sh -c "mysql -h127.0.0.1 -uuser -ppass usuariosdb"

## Una vez aplicada la migración, levanta el servicio Node:
docker-compose up -d usuarios-service

## Logs:
docker logs -f usuarios-service

## Reconstruye la imagen sin cache para que incorpore los cambios:
docker-compose down
docker-compose build --no-cache usuarios-service
docker-compose up -d usuarios-db usuarios-service


## Swagger
http://localhost:4001/api-docs



# Registro de usuario
curl -X POST http://localhost:4001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Juan Pérez","email":"juan@correo.com","password":"Secreto123","role":"paciente"}'

# Login
curl -X POST http://localhost:4001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"juan@correo.com","password":"Secreto123"}'
Guardarás el campo token de la respuesta.


# Consultar perfil
curl -X GET http://localhost:4001/api/users/profile \
  -H "Authorization: Bearer <TU_TOKEN_AQUÍ>"