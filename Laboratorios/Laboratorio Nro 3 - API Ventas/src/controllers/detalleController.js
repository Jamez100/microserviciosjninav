const DetalleFactura = require('../entities/DetalleFactura');

exports.crearDetalle = async (req, res) => {
  try {
    const detalle = new DetalleFactura(req.body);
    const nuevoDetalle = await detalle.save();
    res.status(201).json(nuevoDetalle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerDetallesPorFactura = async (req, res) => {
  try {
    const detalles = await DetalleFactura.find({ factura_id: req.params.facturaId }).populate('producto_id');
    res.json(detalles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarDetalle = async (req, res) => {
  try {
    const actualizado = await DetalleFactura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarDetalle = async (req, res) => {
  try {
    const eliminado = await DetalleFactura.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'Detalle no encontrado' });
    res.json({ message: 'Detalle eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
