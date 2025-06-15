# Crear el proyecto Laravel
composer create-project laravel/laravel .

# Instalar dependencias específicas

- Instalar el paquete JWT y Guzzle (cliente HTTP) con Composer:
composer require tymon/jwt-auth guzzlehttp/guzzle

- Publicar la configuración de JWT:
php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

- Generar la clave de aplicación de Laravel (APP_KEY):
php artisan key:generate

# Configurar el archivo .env


# Crear la migración y el modelo (local)
php artisan make:migration create_reservations_table --create=reservations

-------------------------------------------------------------

## Swagger

### Instala Swagger-Lume (un paquete que monta Swagger UI dentro de Laravel):
composer require darkaonline/l5-swagger

### Publica configuración y assets:
php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"


http://localhost:4002/api/documentation

-----------------------------------------------------------

## Construcción y arranque Docker

Desde la raíz del proyecto:

1. Añade en tu `docker-compose.yml` (raíz) bajo `services:`:

```yaml
reservas-db:
 image: postgres:13
 container_name: reservas-db
 environment:
   POSTGRES_DB: reservasdb
   POSTGRES_USER: user
   POSTGRES_PASSWORD: pass
 ports:
   - "5433:5432"
 volumes:
   - reservas_db_data:/var/lib/postgresql/data
 networks:
   - backend-net

reservas-service:
 build: ./services/reservas-service
 container_name: reservas-service
 env_file: ./services/reservas-service/.env
 depends_on:
   - reservas-db
   - usuarios-service
 ports:
   - "4002:8000"
 networks:
   - backend-net
```

## En la raíz:
docker-compose down
docker-compose build reservas-service
docker-compose up -d reservas-db reservas-service

# Aplica migraciones dentro del contenedor:
docker exec reservas-service php artisan migrate --force


-------------------------------------------------------------



