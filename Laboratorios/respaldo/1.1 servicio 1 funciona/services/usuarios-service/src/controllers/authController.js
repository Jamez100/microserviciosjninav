const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
require('dotenv').config();

exports.register = async (req, res) => {
  const { nombre, email, password, role } = req.body;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const usuario = await User.create({ nombre, email, password: hash, role });
    res.status(201).json({ id: usuario.id, email: usuario.email, role: usuario.role });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al registrar usuario.', error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await User.findOne({ where: { email } });
    if (!usuario) return res.status(400).json({ mensaje: 'Credenciales inválidas.' });

    const valido = await bcrypt.compare(password, usuario.password);
    if (!valido) return res.status(400).json({ mensaje: 'Credenciales inválidas.' });

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email, role: usuario.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
