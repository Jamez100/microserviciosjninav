
mkdir especialidades-agenda-service
cd especialidades-agenda-service

# Inicializar npm y crear package.json
npm init -y



# Ejecutar el servicio
Arranca solo la base de datos y espera a que esté lista:

docker-compose up -d especialidades-db


# Construye tu imagen del servicio (sin usar caché para asegurarte de que todo se reinstala):
docker-compose build --no-cache especialidades-service

# Levanta el servicio:
docker-compose up -d especialidades-service





# Reconstruir la imagen

docker-compose build especialidades-service



# Arrancar el servicio en segundo plano
docker-compose up -d especialidades-service

docker-compose ps









