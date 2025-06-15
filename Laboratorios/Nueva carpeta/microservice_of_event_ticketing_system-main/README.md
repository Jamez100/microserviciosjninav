# Sistema de Venta de Entradas a Eventos con Microservicios, Autenticación JWT y Notificación por Email

Este proyecto implementa un sistema de venta de entradas a eventos, diseñado bajo la arquitectura de microservicios. Cada microservicio es independiente, utiliza su propia base de datos y está desarrollado en un lenguaje de programación diferente, promoviendo la diversidad tecnológica y el desacoplamiento. La comunicación entre servicios se realiza mediante APIs REST y mensajería asíncrona para notificaciones.

## Contexto General

El sistema permite a los usuarios registrarse, autenticarse, consultar eventos, comprar entradas y recibir notificaciones por correo electrónico tras la confirmación del pago. La autenticación y autorización se gestionan mediante JWT (JSON Web Token), asegurando la protección de los endpoints sensibles.

### Arquitectura de Microservicios

El sistema está compuesto por los siguientes microservicios:

1. **Servicio de Usuarios (Autenticación y Autorización)**
2. **Servicio de Eventos (Gestión de Eventos)**
3. **Servicio de Compras (Compra de Entradas)**
4. **Servicio de Notificaciones (Notificación por Email)**

Cada microservicio es autónomo, con su propia base de datos y lógica de negocio.

---

## Descripción de los Microservicios

### 1. Servicio de Usuarios (Autenticación y Autorización)

- **Responsabilidad:** Gestiona el registro, autenticación y autorización de los usuarios.
- **Características:**
  - Registro de nuevos usuarios.
  - Autenticación de usuarios existentes.
  - Generación de tokens JWT que incluyen información relevante (ID, rol, vigencia).
  - Validación de tokens para acceder a servicios protegidos.
- **Tecnologías:** [Indicar lenguaje y framework utilizado]
- **Endpoints principales:**
  - `POST /register` — Registro de usuario.
  - `POST /login` — Autenticación y generación de JWT.
  - `GET /profile` — Consulta de perfil (requiere JWT).

---

### 2. Servicio de Eventos (Gestión de Eventos)

- **Responsabilidad:** Permite a los administradores gestionar los eventos disponibles para la venta.
- **Características:**
  - Creación, actualización y eliminación de eventos (solo administradores).
  - Consulta de eventos disponibles (usuarios autenticados).
  - Cada evento contiene: nombre, fecha, lugar, capacidad y precio por entrada.
- **Tecnologías:** [Indicar lenguaje y framework utilizado]
- **Endpoints principales:**
  - `POST /events` — Crear evento.
  - `PUT /events/{id}` — Actualizar evento.
  - `DELETE /events/{id}` — Eliminar evento.
  - `GET /events` — Listar eventos disponibles.

---

### 3. Servicio de Compras (Compra de Entradas)

- **Responsabilidad:** Gestiona la compra de entradas por parte de los usuarios.
- **Características:**
  - Consulta de eventos disponibles para compra.
  - Registro de compras: evento, cantidad de entradas, usuario.
  - Simulación de confirmación de pago mediante endpoint `/pagar`.
  - Al confirmar el pago, se notifica al servicio de notificaciones.
- **Tecnologías:** [Indicar lenguaje y framework utilizado]
- **Endpoints principales:**
  - `GET /purchases` — Listar compras del usuario.
  - `POST /purchases` — Realizar compra de entradas.
  - `POST /purchases/{id}/pagar` — Confirmar pago de la compra.

---

### 4. Servicio de Notificaciones (Notificación por Email)

- **Responsabilidad:** Envía notificaciones por correo electrónico a los usuarios tras la confirmación de pago.
- **Características:**
  - Escucha eventos de confirmación de pago (por cola de mensajes o webhook).
  - Envía emails de confirmación de compra al usuario.
  - Funciona de forma desacoplada del resto de servicios.
- **Tecnologías:** [Indicar lenguaje y framework utilizado]
- **Integración:** RabbitMQ, webhook o similar para recibir eventos de compra pagada.

---

## Características Técnicas

- **JWT:** Protección de endpoints sensibles, especialmente los de compra.
- **Microservicios:** Independientes, comunicación vía HTTP (REST) o mensajería.
- **Persistencia:** Base de datos independiente por servicio (patrón base de datos por servicio).
- **Desacoplamiento:** Notificaciones mediante mensajería asíncrona.
- **Diversidad tecnológica:** Cada microservicio desarrollado en un lenguaje diferente.

---

## Instalación y Ejecución

Cada microservicio cuenta con su propio README para instrucciones específicas de instalación y ejecución. Se recomienda utilizar contenedores (Docker) para facilitar el despliegue y la integración entre servicios.

1. Clonar este repositorio.
2. Seguir las instrucciones de cada microservicio en sus respectivas carpetas.
3. Configurar las variables de entorno necesarias (bases de datos, claves JWT, SMTP, etc.).
4. Levantar los servicios y la infraestructura de mensajería (si aplica).

---

## Ejemplo de Flujo de Usuario

1. El usuario se registra y obtiene un JWT tras autenticarse.
2. Consulta los eventos disponibles.
3. Realiza la compra de entradas para un evento.
4. Confirma el pago de la compra.
5. Recibe un email de confirmación de su compra.

---

## Contribución

Las contribuciones son bienvenidas. Por favor, revisa las guías de cada microservicio para contribuir en el lenguaje correspondiente.

---

## Autores y Reconocimientos

Desarrollado por el grupo de Microservicios (COM600).  
Agradecimientos a los docentes y colaboradores del curso.


## puertos de los servicios:

```
1: servicio de autenticacion:
c# -> 8001
mysql -> 3309

2: servicio de eventos:
go -> 8082
mongo -> 27020

3: servicio de compras:
php -> 8000
mysql -> 3306

4: servicio de notificacion:
Ruby -> 3000
mongo -> 27017
```



esto es una prueb
a
tambien estoy aqui