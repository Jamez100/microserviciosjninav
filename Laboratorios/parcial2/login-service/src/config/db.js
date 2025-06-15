// src/config/db.js

/**
 * En lugar de crear el pool dentro de connectDB, 
 * lo creamos aquí, en el momento de cargar el módulo.
 */
require('dotenv').config();  // Aseguramos que las variables de entorno se carguen en este módulo

const mysql = require('mysql2/promise');

const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME
} = process.env;

// Creamos el pool inmediatamente, usando las variables de entorno
const pool = mysql.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * connectDB() comprueba con una consulta dummy que la conexión funciona.
 * Podrías llamarlo desde index.js antes de arrancar el servidor,
 * pero el pool ya existe desde el require.
 */
async function connectDB() {
  try {
    await pool.query('SELECT 1');
    console.log('✅ Conexión a MySQL exitosa');
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err);
    throw err;
  }
}

module.exports = {
  pool,
  connectDB
};
