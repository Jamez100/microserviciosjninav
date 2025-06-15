

# Iniciar proyecto React
npx create-react-app .

# Instalar dependencias adicionales
npm install react-router-dom axios
npm install


# Comprueba que funcione localmente
npm run build


# Reconstruir y levantar
docker-compose build frontend-service
docker-compose up -d nginx-proxy frontend-service

# Abrir la app
http://localhost:8080
http://localhost
