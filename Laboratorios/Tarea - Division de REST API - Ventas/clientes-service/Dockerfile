# Dockerfile para clientes-service
FROM node:20-alpine

WORKDIR /app

# Copiar archivos de dependencias e instalar
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

EXPOSE 5001
CMD ["npm", "start"]
