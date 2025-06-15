

# Baja todos los contenedores y redes existentes
docker-compose down
docker-compose build --no-cache
docker-compose up -d









# Reconstruye los servicios que cambiaron:
docker-compose up -d --force-recreate --build frontend-service nginx-proxy

# Verifica logs de Nginx:
docker logs -f nginx-proxy



#####   ##############################################

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









##### Reservas-Service ########################################

## Reconstruye y arranca de nuevo
docker-compose down
docker-compose build --no-cache reservas-service
docker-compose up -d reservas-db reservas-service

## Cuando reservas-service esté “Up”, aplica migraciones:
docker exec reservas-service php artisan migrate --force

## Comprobar los logs:
docker logs -f reservas-service

## Swagger:
http://localhost:4002/api/documentation
























