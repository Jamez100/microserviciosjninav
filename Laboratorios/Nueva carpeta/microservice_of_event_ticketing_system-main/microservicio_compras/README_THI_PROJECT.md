mservicio_compras/
├── docker-compose.yml
├── Dockerfile
├── .dockerignore
├── .env
├── .env.example
├── composer.json
├── composer.lock
├── artisan
├── app/
│   ├── Http/
│   │   ├── Controllers/
│   │   │   └── OrderController.php
│   │   ├── Middleware/
│   │   │   └── JwtMiddleware.php
│   │   └── Requests/
│   │       └── CreateOrderRequest.php
│   ├── Models/
│   │   └── Order.php
│   ├── Services/
│   │   ├── EventService.php
│   │   ├── JwtService.php
│   │   └── NotificationService.php
│   └── Exceptions/
│       └── Handler.php
├── bootstrap/
│   └── app.php
├── config/
│   ├── app.php
│   ├── database.php
│   └── cors.php
├── database/
│   └── migrations/
│       └── 2024_01_01_000000_create_orders_table.php
├── routes/
│   ├── web.php
│   └── api.php
└── public/
    └── index.php


Endpoints Disponibles

GET /api/orders - Listar órdenes del usuario autenticado
POST /api/orders - Crear nueva orden de compra
GET /api/orders/{id} - Obtener detalles de una orden
PUT /api/orders/{id}/pay - Confirmar pago de una orden
GET /api/health - Health check del servicio


# Crear orden
curl -X POST http://localhost:8003/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "event_id": 1,
    "quantity": 2
  }'

# Confirmar pago
curl -X PUT http://localhost:8003/api/orders/{order_id}/pay \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"




#!/bin/bash

# =============================================
# COMANDOS DE TESTING PARA EL SERVICIO DE COMPRAS
# =============================================

# Variables
BASE_URL="http://localhost:8003"
JWT_TOKEN="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJhdXRoLXNlcnZpY2UiLCJzdWIiOjEsInVzZXJfaWQiOjEsImVtYWlsIjoidXNlckBleGFtcGxlLmNvbSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzE2MjQwMDAwLCJleHAiOjE3MTYzMjY0MDB9.example-signature"

echo "🚀 Testing Servicio de Compras"
echo "================================"

# 1. Health Check
echo "1. Health Check:"
curl -X GET "$BASE_URL/api/health"
echo -e "\n"

# 2. Crear nueva orden
echo "2. Crear nueva orden:"
ORDER_RESPONSE=$(curl -s -X POST "$BASE_URL/api/orders" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $JWT_TOKEN" \
  -d '{
    "event_id": 1,
    "quantity": 2
  }')

echo "$ORDER_RESPONSE"
echo -e "\n"

# Extraer ORDER_ID de la respuesta (simplificado)
ORDER_ID=$(echo "$ORDER_RESPONSE" | grep -o '"id":"[^"]*' | cut -d'"' -f4)
echo "Order ID creado: $ORDER_ID"

# 3. Listar órdenes del usuario
echo "3. Listar órdenes del usuario:"
curl -s -X GET "$BASE_URL/api/orders" \
  -H "Authorization: Bearer $JWT_TOKEN"
echo -e "\n"

# 4. Obtener detalles de una orden específica
if [ ! -z "$ORDER_ID" ]; then
  echo "4. Obtener detalles de la orden $ORDER_ID:"
  curl -s -X GET "$BASE_URL/api/orders/$ORDER_ID" \
    -H "Authorization: Bearer $JWT_TOKEN"
  echo -e "\n"

  # 5. Pagar la orden
  echo "5. Confirmar pago de la orden $ORDER_ID:"
  curl -s -X PUT "$BASE_URL/api/orders/$ORDER_ID/pay" \
    -H "Authorization: Bearer $JWT_TOKEN"
  echo -e "\n"
fi

# 6. Test de error - sin token
echo "6. Test de error (sin token de autorización):"
curl -s -X GET "$BASE_URL/api/orders"
echo -e "\n"

# 7. Test de error - token inválido
echo "7. Test de error (token inválido):"
curl -s -X GET "$BASE_URL/api/orders" \
  -H "Authorization: Bearer invalid-token"
echo -e "\n"


## comandos para su ejecucion

Modificar el archivo .env

php artisan key:generate

php artisan migrate

php artisan serve --host=0.0.0.0 --port=8003

php artisan serve



# ejecucion en docker compose

# 1. Construir y ejecutar contenedores
docker-compose up -d --build

# 2. Instalar dependencias dentro del contenedor
docker-compose exec app composer install

# 3. Generar clave de aplicación
docker-compose exec app php artisan key:generate

# 4. Ejecutar migraciones
docker-compose exec app php artisan migrate

# Verificar logs
docker-compose logs -f app

# Parar servicios
docker-compose down