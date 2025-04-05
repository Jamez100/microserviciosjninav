# Utiliza una imagen base de Node.js
FROM node:14-alpine

# Define el directorio de trabajo
WORKDIR /app

# Copia los archivos de package para instalar dependencias (en este caso, solo express)
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . .

# Expone el puerto 3000
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]
