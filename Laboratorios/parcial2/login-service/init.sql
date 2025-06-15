-- init.sql
CREATE DATABASE IF NOT EXISTS login_db;
USE login_db;

-- Tabla usuarios: id (PK), correo (unique), password (hashed)
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  correo VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL
);

-- Insertamos un usuario de ejemplo (password: "usuario123" -> hashed con bcrypt)
-- Hashea con bcrypt en tu máquina local o usa un hash pre-calculado
-- Ejemplo de hash bcrypt (salt rounds 10) para "usuario123":
-- $2b$10$OayQtHY08o0IhsT3PXqbaeSxI9WZUA6.2akft8onNXLlHSJYXb3P6

INSERT INTO usuarios (correo, password) VALUES
('test@example.com', '$2a$10$gJD9vRfLMHshulNhFXpjquXMo07oBC73cAfmb.LAWpt3jOPTbHtfi');
('admin@example.com', '$2a$10$gJD9vRfLMHshulNhFXpjquXMo07oBC73cAfmb.LAWpt3jOPTbHtfi');
('jamez@example.com', '$2a$10$gJD9vRfLMHshulNhFXpjquXMo07oBC73cAfmb.LAWpt3jOPTbHtfi');
