# Dockerfile
FROM php:8.3-fpm

# Directorio de trabajo dentro del contenedor
WORKDIR /var/www

# Instalar dependencias del sistema y extensiones de PHP necesarias (pdo_mysql, exif, etc.)
RUN apt-get update && apt-get install -y \
    build-essential \
    default-mysql-client \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip \
    git \
    curl \
 && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd \
 && pecl install xdebug \
 && docker-php-ext-enable xdebug

# Instalar Composer globalmente
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Copiar todos los archivos del proyecto al contenedor
COPY . /var/www

# Establecer permisos (opcional, dependiendo de Windows/WSL config)
RUN chown -R www-data:www-data /var/www \
 && chmod -R 755 /var/www/storage

EXPOSE 9000

CMD ["php-fpm"]