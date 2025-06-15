# SERVICIO DE COMPRAS:

## Tecnologias usadas
```
php.
laravel.
mysql.
swagger.
```

## estructura del proyecto
```
mservicio_compras/
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── CompraController.php
│   │   ├── Middleware/
│   │   │   └── JwtMiddleware.php
│   │   └── Requests/
│   │       └── CompraRequest.php
│   ├── Models/
│   │   └── Order.php
│   ├── Services/
│   │   ├── EventService.php
│   │   ├── NotificationService.php
│   │   └── PaymentService.php
│   └── Exceptions/
│       └── Handler.php
├── database/
│   └── migrations/
│       └── 2024_01_01_000000_create_orders_table.php
├── routes/
│   └── api.php
├── config/
│   ├── app.php
│   ├── database.php
│   └── jwt.php
├── Dockerfile
├── docker-compose.yml
├── .env
├── .env.example
├── composer.json
└── README.md
```
## Comandos para su ejecucion
```

```

## comandos para ejecucion del proyecto:
```
# 1. Clonar/crear el directorio del proyecto
mkdir mservicio_compras && cd mservicio_compras

# 2. Crear proyecto Laravel
composer create-project laravel/laravel . --prefer-dist

# 3. Instalar dependencias adicionales
composer require firebase/php-jwt
composer require guzzlehttp/guzzle

# 4. Configurar variables de entorno
cp .env.example .env
# Editar .env con la configuración de base de datos y JWT

# 5. Generar clave de aplicación
php artisan key:generate

# 6. Ejecutar migraciones
php artisan migrate

# 7. Ejecutar localmente
php artisan serve --host=0.0.0.0 --port=8003

```