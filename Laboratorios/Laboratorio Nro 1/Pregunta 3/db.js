// bd.js
const mysql = require('mysql2');

// Configurar la conexión a la base de datos
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'usuarios_db'
});

// Conectar a la base de datos
connection.connect((error) => {
  if (error) {
    console.log('Error al conectarse a la base de datos');
    return;
  }
  console.log('Conectado a la base de datos');
});

module.exports = connection;
