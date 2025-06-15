# 🚀 Servicio de Notificaciones - Microservicio

**Parte del Sistema de Venta de Entradas a Eventos con Autenticación JWT**

## 📌 Descripción
Microservicio encargado de enviar notificaciones por email cuando:
- Se confirma una compra de entradas
- Hay actualizaciones de eventos
- Ocurren cambios relevantes para el usuario

## 🔧 Tecnologías
- **Lenguaje**: Ruby 3.2
- **Framework**: Sinatra
- **Email**: SMTP (Gmail/SendGrid/Mailgun)
- **Mensajería**: RabbitMQ (opcional)
- **Contenedores**: Docker + Docker Compose

## 📋 Endpoints Principales

### POST `/notify`
Recibe notificaciones de compras confirmadas

**Request**:
```json
{
  "to": "loaizarodrigo19@gmail.com",
  "subject": "Prueba desde Postman",
  "body": "Este correo fue enviado desde la API en Sinatra"
}
Response:

json
{
  "status": "success",
  "message": "Notificación en proceso"
}
🚀 Instalación
Con Docker (recomendado)
bash
docker-compose up --build
Sin Docker
bash
bundle install
bundle exec rackup -p 3000

microservice_of_event_ticketing_system\mservicio_notificaciones\public\deepseek_mermaid_20250521_3e8b9e.svg

🔄 Integración con Otros Servicios
Servicio de Compras envía notificaciones via:

Webhook HTTP (POST a /notify)

O mediante RabbitMQ (cola payment_confirmed)
🛠 Troubleshooting
Error al enviar emails:

Verificar credenciales SMTP

Probar en modo desarrollo con MailCatcher:

bash
docker-compose -f docker-compose.dev.yml up
Acceder a: http://localhost:1080

📜 Licencia
MIT License - [COM600] Universidad USFX
