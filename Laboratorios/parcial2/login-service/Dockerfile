# ───> Dockerfile <───

# 1) Partimos de Node 18 en Alpine
FROM node:18-alpine

# 2) Establecemos directorio de trabajo
WORKDIR /usr/src/app

# 3) Copiamos package.json y package-lock.json
COPY package.json package-lock.json ./

# 4) Instalamos dependencias (bcryptjs no necesita compilación nativa)
RUN npm ci --omit=dev

# 5) Copiamos el resto del código al contenedor
COPY . .

# 6) Exponemos el puerto en que corre la app (mismo que en .env)
EXPOSE 3001

# 7) Comando por defecto
CMD ["npm", "start"]
