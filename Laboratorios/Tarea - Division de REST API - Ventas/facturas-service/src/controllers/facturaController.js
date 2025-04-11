const Factura = require('../entities/Factura');

exports.crearFactura = async (req, res) => {
  try {
    const nuevaFactura = new Factura(req.body);
    await nuevaFactura.save();
    res.status(201).json(nuevaFactura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find().populate('clienteId');
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFactura = async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id).populate('clienteId');
    if (!factura) return res.status(404).json({ mensaje: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarFactura = async (req, res) => {
  try {
    const factura = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarFactura = async (req, res) => {
  try {
    await Factura.findByIdAndDelete(req.params.id);
    res.json({ mensaje: 'Factura eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
