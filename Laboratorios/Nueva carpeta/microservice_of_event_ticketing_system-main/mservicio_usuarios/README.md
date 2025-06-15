# Microservicio de Autenticación - ASP.NET Core

Este microservicio proporciona funcionalidades de autenticación (login, registro, generación y validación de tokens JWT) para aplicaciones basadas en .NET. Forma parte de una arquitectura de microservicios, y puede ejecutarse de forma local o en contenedores Docker.

---

## Características

- Autenticación de usuarios con JWT  
- Encriptación de contraseñas con **BCrypt**  
- Configuración flexible con archivo `.env`  
- Integración con **Swagger** para pruebas  
- Soporte para **MySQL** mediante Entity Framework Core  

## Requisitos Previos

- [.NET 8.0 SDK](https://dotnet.microsoft.com/en-us/download/dotnet/8.0) o superior  
- MySQL instalado (o acceso a un servidor MySQL)  
- Visual Studio, VS Code o editor compatible  
- Git  


## Instalación

1. **Clona el repositorio:**

2. **Restaura los paquetes NuGet:**

   ```
   dotnet restore
   ```

3. **Crea el archivo `.env` en la raíz del proyecto con el siguiente contenido:**

   ```env
   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=mservice_users_auth
   DB_USER=root
   DB_PASSWORD=
   ```

4. **Configura el archivo `appsettings.json` si es necesario:**

   ```json
   {
     "Jwt": {
       "Key": "clave-secreta-super-segura-con-mucha-y-mucha-seguridad",
       "Issuer": "AuthService"
     },
     "ConnectionStrings": {
       "DefaultConnection": ""
     },
     "Logging": {
       "LogLevel": {
         "Default": "Information"
       }
     },
     "AllowedHosts": "*"
   }
   ```

## Ejecución


### Local

```bash
dotnet run
```

```bash
comenta esta linea en program.cs si ya tienes la base de datos en local:
//db.Database.Migrate();  // se comenta para evitar migraciones automáticas // si ya existe la base de datos en local
```

* Swagger disponible en: [http://localhost:5246/swagger]

### Docker
```bash
quita la barra de comentario en esta linea en program.cs
db.Database.Migrate();  // se comenta para evitar migraciones automáticas // si ya existe la base de datos en local
```

Asegúrate de tener un `Dockerfile` y configuración para levantar la base de datos (por ejemplo, con `docker-compose`). Luego:

```bash
docker-compose up --build
```

* Swagger disponible en: [http://localhost:8001/swagger]


##  Seguridad

* Las contraseñas se almacenan con hash seguro (BCrypt)
* Los tokens JWT están firmados con una clave secreta definida en configuración