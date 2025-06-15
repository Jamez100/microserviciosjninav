// src/models/userModel.js

const { pool } = require('../config/db');

async function findUserByEmail(correo) {
  const sql = 'SELECT id, correo, password FROM usuarios WHERE correo = ? LIMIT 1';
  const [rows] = await pool.execute(sql, [correo]);
  return rows.length > 0 ? rows[0] : null;
}

module.exports = { findUserByEmail };
