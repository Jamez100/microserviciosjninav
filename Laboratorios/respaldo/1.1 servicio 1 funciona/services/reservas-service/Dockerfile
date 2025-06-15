FROM php:8.2-fpm-alpine

# Instala dependencias del sistema
RUN apk add --no-cache \
    bash \
    git \
    curl \
    libpq \
    postgresql-dev \
    oniguruma-dev \
    zip \
    unzip

# Habilita extensiones PHP
RUN docker-php-ext-install pdo pdo_pgsql mbstring

WORKDIR /var/www

# Copia Composer (multi-stage) y todo el código de Laravel
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
COPY . .

# Instala dependencias PHP, ya con artisan presente
RUN composer install --no-dev --no-interaction --optimize-autoloader

# Publica configuración de JWT y Swagger-Lume (si lo usas)
RUN php artisan vendor:publish --provider="Tymon\JWTAuth\Providers\LaravelServiceProvider" \
    && php artisan vendor:publish --provider="L5Swagger\L5SwaggerServiceProvider" --tag=public

# Genera la clave de aplicación
RUN php artisan key:generate

EXPOSE 8000

CMD ["php","artisan","serve","--host=0.0.0.0","--port=8000"]
