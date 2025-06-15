const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const usuario = await User.findByPk(req.user.id, {
      attributes: ['id','nombre','email','role','created_at']
    });
    if (!usuario) return res.status(404).json({ mensaje: 'Usuario no encontrado.' });
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error en el servidor.' });
  }
};
