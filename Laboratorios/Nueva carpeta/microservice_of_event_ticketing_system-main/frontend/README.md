This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.





# Frontend - Next.js

Una aplicación frontend simple para interactuar con servicios de ticketing a través de un reverse proxy.

## Características

- 🎫 Gestión de eventos y tickets
- 🔐 Autenticación de usuarios
- 📱 Diseño responsive con Tailwind CSS
- 🔔 Sistema de notificaciones
- ⚡ Arquitectura simple y eficiente

## Servicios Integrados

La aplicación se conecta a los siguientes endpoints a través del reverse proxy:

- `http://localhost/api/auth/*` - Autenticación
- `http://localhost/api/v1/events/*` - Gestión de eventos  
- `http://localhost/api/v1/tickets/*` - Gestión de tickets
- `http://localhost/api/v1/notifications/*` - Notificaciones

## Instalación y Configuración

### 1. Crear el proyecto

```bash
npx create-next-app@latest ticketing-frontend --src-dir --app --tailwind --eslint
cd ticketing-frontend
```

### 2. Instalar dependencias adicionales

```bash
npm install axios
```

### 3. Configurar variables de entorno

Crear archivo `.env.local`:

```bash
NEXT_PUBLIC_API_URL=http://localhost
```

### 4. Reemplazar archivos

Copiar todos los archivos proporcionados en sus respectivas ubicaciones según la estructura del proyecto.

## Scripts Disponibles

```bash
# Desarrollo
npm run dev

# Producción  
npm run build
npm start

# Linting
npm run lint

# Ejecutar en puerto específico
npm run dev -- -p 3001
```

## Estructura de Páginas

- `/` - Página principal con navegación
- `/login` - Inicio de sesión
- `/events` - Lista de eventos disponibles
- `/events/[id]` - Detalle y compra de evento
- `/tickets` - Tickets del usuario
- `/notifications` - Notificaciones del usuario

## Componentes Principales

- `Navbar` - Navegación principal
- `EventCard` - Tarjeta de evento
- `TicketCard` - Tarjeta de ticket
- `NotificationItem` - Item de notificación

## Funcionalidades

### Autenticación
- Login/logout
- Persistencia de sesión con token
- Protección de rutas

### Eventos
- Lista de eventos disponibles
- Detalle de evento con información completa
- Compra de tickets

### Tickets
- Vista de tickets comprados
- Estados de tickets (activo, usado, cancelado)
- Códigos QR

### Notificaciones
- Lista de notificaciones
- Marcar como leído
- Eliminar notificaciones
- Diferentes tipos con iconos

## Tecnologías Utilizadas

- **Next.js 14** - Framework React
- **Tailwind CSS** - Estilos
- **Axios** - Cliente HTTP
- **React Hooks** - Gestión de estado

## Notas de Desarrollo

- El proyecto usa el App Router de Next.js
- Todos los componentes son funcionales con hooks
- Se incluye manejo de errores básico
- El diseño es responsive y moderno
- Los tokens se almacenan en localStorage

## Personalización

Para adaptar la aplicación a tus necesidades:

1. Modifica los endpoints en `src/lib/api.js`
2. Ajusta los estilos en los componentes
3. Añade nuevas páginas en `src/app/`
4. Extiende los hooks según sea necesario