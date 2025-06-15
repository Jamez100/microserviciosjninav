// src/controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const { findUserByEmail } = require('../models/userModel');

async function login(req, res) {
  try {
    const { correo, password } = req.body;

    if (!correo || !password) {
      return res.status(400).json({ message: 'Correo y contraseña son obligatorios.' });
    }

    // 1) Buscamos el usuario en la base de datos
    const user = await findUserByEmail(correo);
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 2) Comparamos contraseña con bcryptjs.compare
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Credenciales inválidas.' });
    }

    // 3) Si coincide, generamos JWT
    const payload = { id: user.id, correo: user.correo };
    const token   = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN || '1h'
    });

    return res.status(200).json({ token });
  } catch (error) {
    console.error('Error en login:', error);
    return res.status(500).json({ message: 'Error interno del servidor.' });
  }
}

module.exports = { login };
