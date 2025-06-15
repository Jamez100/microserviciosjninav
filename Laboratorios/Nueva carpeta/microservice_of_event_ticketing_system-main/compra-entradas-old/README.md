
## Crear el proyecto

composer create-project --prefer-dist laravel/laravel compra-entradas

## Instalar Dependencias

composer require tymon/jwt-auth darkaonline/l5-swagger

### Para las rutas

php artisan make:provider RouteServiceProvider


## Publicar configuraciones:

php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider"

php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider"

## Generar clave secreta JWT:

# JWT
php artisan jwt:secret

# Generar key de aplicación (si no se hizo)
php artisan key:generate

# Completar .env con:
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=compra_entradas_db
DB_USERNAME=laravel
DB_PASSWORD=laravel

# Servicios internos
EVENT_SERVICE_URL=http://events:8082/api/v1
NOTIFY_SERVICE_URL=http://notifications:9000

# Configurar config/services.php

'events' => [
    'url' => env('EVENT_SERVICE_URL'),
],
'notify' => [
    'url' => env('NOTIFY_SERVICE_URL'),
],

------------------------------------------

## Construir Docker y arrancarlos

docker-compose up -d --build

docker-compose ps

------------------------------------------

## Ejecutamos migraciones

docker-compose exec app php artisan migrate

docker-compose exec app php artisan migrate --seed

docker-compose exec app php artisan migrate:fresh --seed

------------------------------------------

## Generar docs Swagger:

docker-compose exec app php artisan l5-swagger:generate

http://localhost:8000/api/documentation


### Para cambios en Swagger
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan cache:clear
docker-compose exec app php artisan l5-swagger:generate


docker-compose exec app php artisan migrate
docker-compose exec app php artisan config:clear
docker-compose exec app php artisan l5-swagger:generate


### Instalar guzzle

composer require guzzlehttp/guzzle

EVENT_SERVICE_URL=http://127.0.0.1:8002/api/v1  -->  .env


### Para RabbitMQ No usamos!!!!!!!

composer require php-amqplib/php-amqplib


------------------------------------------

## Eliminar y reiniciar el contenedor

docker-compose down -v  # para eliminar contenedores y volúmenes (por seguridad)
docker-compose build
docker-compose up -d



--------------------------------------------------------


# Flujo de uso (HTTP)

1. Registrar usuario (otro MS Usuarios):

POST /api/v1/register   # devuelve 201
POST /api/v1/login      # devuelve { token }

2. Listar eventos (proxy HTTP):

GET /api/v1/events
Authorization: Bearer <token>

3. Crear ticket + payment:

POST /api/v1/tickets
Authorization: Bearer <token>
Body: { "event_id":1, "quantity":2, "price":25.00 }

4. Confirmar pago + notificar:

POST /api/v1/pagar/{ticket_id}
Authorization: Bearer <token>

Internamente hace:

Actualiza payments.status = 'confirmed'

POST a http://notifications:9000/api/v1/notify con { email, subject, body }



------------------------------------------------

10. Comunicación entre microservicios

- Eventos: tu EventController@index hace:
    Http::get(config('services.events.url').'/events');
- Notificaciones: tu PaymentController@confirm hace:
    Http::post(config('services.notify.url').'/api/v1/notify', [...]);
- Usuarios: validación JWT con middleware auth:api; no hay petición HTTP al MS Usuarios.

--------------------------------------------------















-----------
**OTRA FORMA**

## Flujo completo
- GET /api/v1/events → proxy a Eventos
- POST /api/v1/tickets → crea Ticket y Payment en Compras
- POST /api/v1/pagar/{id} → actualiza Payment y publica mensaje a RabbitMQ
- Microservicio Notificaciones (otro contenedor) consume esa cola y envía el correo.


##### Comunicacion de microservicios

Microservicio se encarga de:
- Listar eventos disponibles	  (EventController llama al MS de Eventos)
- Crear tickets de compra	      (TicketController)
- Confirmar pagos	              (PaymentController)
- Enviar notificaciones al pagar  (RabbitMQ publica a cola que otro MS consume)
- Autenticación del usuario	      (JWT por AuthController y middleware)

## COMUNICACION DE LOS MICROSERVICIOS

# Eventos:
Compras se comunica con el MS de Eventos a través de HTTP:
- $response = Http::get(env('EVENT_SERVICE_URL') . '/api/events');   
Esto está resuelto con tu EventController.

# Usuarios:
Tu microservicio no se comunica directamente con el de Usuarios, porque usa JWT.

Esquema de flujo:
[Cliente Frontend] ---> [MS de Usuarios (Auth/login)] ---> retorna JWT
          |
          v
[Cliente Frontend] ---> [MS de Compras]  <--- valida JWT

Entonces:
- El MS de Usuarios expone /login, que devuelve un token JWT.
- El cliente (por ejemplo frontend) adjunta ese token en cada request a Compras.
- En tu microservicio, usás el middleware de JWT para obtener el usuario actual sin hacer una petición externa.



## VERIFICAR QUE TODO FUNCIONA

🔹 1. Entorno funcionando
Accedé a: http://localhost:8000

Revisa logs del contenedor Laravel:

docker-compose logs -f app
🔹 2. Documentación OpenAPI (Swagger)
Si implementaste /docs, asegurate de acceder:
http://localhost:8000/docs

🔹 3. Test completo (flujo)
Este flujo simula un usuario real comprando una entrada:

Autenticarse:
- Petición a MS Usuarios: POST /api/login con email y password.
- Guardá el JWT.

Listar eventos:
GET /api/v1/events → debe traer eventos desde el MS Eventos.

Comprar ticket:
POST /api/v1/tickets con:
{
  "event_id": 1,
  "quantity": 2
}
Agregá Authorization: Bearer <token> en headers.

Confirmar pago:
POST /api/v1/payments/confirm con:
{
  "ticket_id": 1
}

Verificar notificación:
* En RabbitMQ: http://localhost:15672 (usuario y pass: guest/guest)
* Cola notifications debe haber recibido el mensaje.
* Si el MS de Notificaciones está activo, debe enviar el email.


RESUMEN FINAL
- Elemento	Estado
- EventController funcionando	
- TicketController funcionando	
- PaymentController funcionando	
- RabbitService funcionando	
- JWT funcionando (autenticación)	
- Comunicación con Eventos	 (por HTTP)
- Comunicación con Usuarios	 (JWT)
- Notificaciones integradas	 (via Rabbit)
- Documentación Swagger	 opcional