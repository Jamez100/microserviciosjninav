# Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias e instalar
COPY package.json .
COPY package-lock.json .
RUN npm install

# Copiar el resto de los archivos de la aplicación
COPY public/ public/
COPY views/ views/
COPY . .

EXPOSE 3000

CMD ["node", "app.js"]
