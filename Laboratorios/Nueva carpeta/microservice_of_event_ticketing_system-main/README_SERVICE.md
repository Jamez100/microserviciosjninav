# FUNCIONAMIENTO DE LOS 4 SERVICIOS

## 1: service autenticacion
### API DE SWAGGER:

http://localhost:8001/swagger/index.html

### API DE AUTH:

#### api de test:

GET http://localhost:8001/api/auth/test 

Respuesta:

El endpoint de autenticación está funcionando correctamente.

#### api de login:

POST http://localhost:8001/api/Auth/login

envio en el formulario:

{
  "email": "cesar@demo.com",
  "password": "123456"
}

respuesta:

{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIiLCJ1c2VybmFtZSI6ImNlc2FyIiwicm9sZSI6InVzZXIiLCJqdGkiOiJmZWY3M2MwMC01NzQ1LTQ0NDMtOTNjMC1kNGMyMGE4Y2I5Y2YiLCJleHAiOjE3NDgwMTM3ODIsImlzcyI6IkF1dGhTZXJ2aWNlIn0.pvwmCKvZKV_y0Qjvk44VTUfXGCUdTfdhSrpKvbZpbsI",
    "expiration": "2025-05-23T15:23:02Z"
}

#### api de autenticarme:

GET http://localhost:8001/api/Auth/me  {Bearer Token}

respuesta:

{
    "id": 2,
    "username": "cesar",
    "email": "cesar@demo.com",
    "role": "user"
}

### API DE USER:

#### api de user:

GET http://localhost:8001/api/User

Respuesta:

[
  {
    "id": 1,
    "username": "Marcelo Admin",
    "email": "marceloAdmin@demo.com",
    "password_Hash": "$2a$11$6xDrdmHK8wgNefKWnne8/eF1aNj.c5naAsOIgwAuGGjsrI9buv/DK",
    "role": "admin",
    "created_At": "2025-05-22T12:47:47.237283"
  },
  {
    "id": 2,
    "username": "cesar",
    "email": "cesar@demo.com",
    "password_Hash": "$2a$11$Enh/u3Rto9/JUXcEQa/7OePulq2pdkywMdTOH09FIxV5HYeD47OIG",
    "role": "user",
    "created_At": "2025-05-23T14:12:22.928966"
  }
]

#### api de registro de usuario:

POST http://localhost:8001/api/User/register

envio:

{
  "username": "alvaro",
  "email": "alvaro@gmail.com",
  "password_hash": "123456"
}

respuesta:

{
    "mensaje": "Usuario creado correctamente.",
    "id": 4,
    "username": "alvaro",
    "email": "alvaro@gmail.com",
    "role": "user"
}


#### api de crear admin:

POST http://localhost:8001/api/user/create-admin

envio:

{
  "username": "Marcelo Perez",
  "email": "marceloadmin@gmail.com",
  "password_hash": "123456"
}

respuesta:

{
    "mensaje": "Usuario administrador creado correctamente.",
    "id": 5,
    "username": "Marcelo Perez",
    "email": "marceloadmin@gmail.com",
    "role": "admin"
}

## 2: service events

### APIS DE EVENTOS

#### api de obtener todos los eventos

GET http://localhost:8082/api/v1/events  {Bearer Token}

respuesta:

[
    {
        "id": "682f2d88bc589fb1ad03d4ae",
        "name": "Concierto de Ejemplo",
        "description": "Un evento musical increíble",
        "date": "2023-12-31T20:00:00Z",
        "location": "Estadio Nacional",
        "capacity": 1000,
        "price": 50.99,
        "created_at": "2025-05-22T13:58:32.817Z",
        "is_active": true
    },
    {
        "id": "68315a4a88d8f7357b34b716",
        "name": "Espectaculo Foker",
        "description": "Un evento entretenimiento",
        "date": "2023-12-31T20:00:00Z",
        "location": "Estadio Nacional",
        "capacity": 1000,
        "price": 50.99,
        "created_at": "2025-05-24T05:34:02.773Z",
        "is_active": true
    }
]

#### api de crear nuevo evento:

POST http://localhost:8082/api/v1/events  {Bearer Token}

envio:

{
  "name": "Espectaculo Foker",
  "description": "Un evento entretenimiento",
  "date": "2023-12-31T20:00:00Z",
  "location": "Estadio Nacional",
  "capacity": 1000,
  "price": 50.99
}

Respuesta:

{
    "id": "68315a4a88d8f7357b34b716",
    "name": "Espectaculo Foker",
    "description": "Un evento entretenimiento",
    "date": "2023-12-31T20:00:00Z",
    "location": "Estadio Nacional",
    "capacity": 1000,
    "price": 50.99,
    "created_at": "2025-05-24T01:34:02.77377884-04:00",
    "is_active": true
}

#### api de obtener evento por ID:

GET http://localhost:8082/api/v1/events/{event_id}

Respuesta:

{
    "id": "68315a4a88d8f7357b34b716",
    "name": "Espectaculo Foker",
    "description": "Un evento entretenimiento",
    "date": "2023-12-31T20:00:00Z",
    "location": "Estadio Nacional",
    "capacity": 1000,
    "price": 50.99,
    "created_at": "2025-05-24T05:34:02.773Z",
    "is_active": true
}

#### api de actualizar evento

PUT http://localhost:8082/api/v1/events/{event_id}

Envio:

{
  "name": "Concierto de Actualizado2",
  "description": "Un evento musical increíble",
  "date": "2023-12-31T20:00:00Z",
  "location": "Estadio Nacional",
  "capacity": 1000,
  "price": 50.99
}

Respuesta:

{
    "id": "68315a4a88d8f7357b34b716",
    "name": "Concierto de Actualizado2",
    "description": "Un evento musical increíble",
    "date": "2023-12-31T20:00:00Z",
    "location": "Estadio Nacional",
    "capacity": 1000,
    "price": 50.99,
    "created_at": "2025-05-24T05:34:02.773Z",
    "is_active": true
}

#### api de Eliminar evento:

DEL http://localhost:8082/api/v1/events/{event_id}  {Bearer Token}

Respuesta:

1


## 3: service ticket purchase

### API PARA OBTENER EVENTOS:

#### api de obtener evento desde el microservicio de Eventos.

GET http://localhost:8000/api/v1/events  {Bearer Token}

#### api de listar eventos

GET http://localhost:8000/api/v1/events  {Bearer Token} 

### API PARA PAGOS

#### api de Confirmar pago

POST http://localhost:8000/api/v1/pagar/{ticket_id}  {Bearer Token}

### API PARA TICKETS

#### api de listar mis tickets

GET http://localhost:8000/api/v1/tickets

#### api de comprar boletos

POST http://localhost:8000/api/v1/tickets  {Bearer Token}

Envio:

{
  "event_id": "dsfh5hty6uy7gh4",
  "quantity": 2,
  "price": 50
}

Respuesta:

{
  "id": 1,
  "user_id": 5,
  "event_id": 3,
  "quantity": 2,
  "total_price": 100,
  "status": "pendiente",
  "created_at": "2025-05-24T13:36:03.818Z",
  "updated_at": "2025-05-24T13:36:03.819Z"
}

#### api de mostrar detalle de un ticket

GET http://localhost:8000/api/v1/tickets/{ticket}

Respuesta:

{
  "id": 1,
  "user_id": 5,
  "event_id": 3,
  "quantity": 2,
  "total_price": 100,
  "status": "pendiente",
  "created_at": "2025-05-24T13:38:44.222Z",
  "updated_at": "2025-05-24T13:38:44.222Z"
}

#### api de actualizar un ticket

PUT http://localhost:8000/api/v1/tickets/{ticket}

Envio:

{
  "quantity": 2,
  "price": 50
}

Respuesta:

{
  "id": 1,
  "user_id": 5,
  "event_id": 3,
  "quantity": 2,
  "total_price": 100,
  "status": "pendiente",
  "created_at": "2025-05-24T13:40:06.102Z",
  "updated_at": "2025-05-24T13:40:06.102Z"
}


#### api de eliminar un ticker

DELETE http://localhost:8000/api/v1/tickets/{ticket}

Respuesta:

Ticket eliminado

## 4: APIS DE NOTIFICACIONES

### API PARA NOTIFICACION

#### api de recibir notificaciones de compras confirmadas

Envio:

{
  "userEmail": "usuario@ejemplo.com",
  "eventDetails": {
    "name": "Concierto Ejemplo",
    "date": "2025-12-25",
    "tickets": 2,
    "total": 100.00
  }
}


Respuesta:

json
{
  "status": "success",
  "message": "Notificación en proceso"
}