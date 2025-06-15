# --- Etapa 1: Build con npm ---
FROM node:20-alpine AS builder
WORKDIR /app

# Copiamos sólo lo necesario para instalar
COPY package.json package-lock.json ./

# Instalamos dependencias (incluye react-scripts)
RUN npm install

# Copiamos el resto del código y hacemos el build
COPY . .
RUN npm run build

# --- Etapa 2: Servir con Nginx ---
FROM nginx:alpine
# Copiamos el build estático
COPY --from=builder /app/build /usr/share/nginx/html

# Opcional: si quieres tu propio default.conf de Nginx, agrégalo aquí
# COPY nginx/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
