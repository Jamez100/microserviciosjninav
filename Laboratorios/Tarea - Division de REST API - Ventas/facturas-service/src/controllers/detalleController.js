const Detalle = require('../entities/Detalle');

exports.crearDetalle = async (req, res) => {
  try {
    const nuevoDetalle = new Detalle(req.body);
    await nuevoDetalle.save();
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerDetallesPorFactura = async (req, res) => {
  try {
    const detalles = await Detalle.find({ facturaId: req.params.facturaId }).populate('productoId');
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarDetalle = async (req, res) => {
  try {
    const detalle = await Detalle.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(detalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarDetalle = async (req, res) => {
  try {
    await Detalle.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
