const Factura = require('../entities/Factura');

exports.crearFactura = async (req, res) => {
  try {
    const factura = new Factura(req.body);
    const nuevaFactura = await factura.save();
    res.status(201).json(nuevaFactura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFacturas = async (req, res) => {
  try {
    const facturas = await Factura.find().populate('cliente_id');
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFactura = async (req, res) => {
  try {
    const factura = await Factura.findById(req.params.id).populate('cliente_id');
    if (!factura) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(factura);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.obtenerFacturasPorCliente = async (req, res) => {
  try {
    const facturas = await Factura.find({ cliente_id: req.params.clienteId }).populate('cliente_id');
    res.json(facturas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.actualizarFactura = async (req, res) => {
  try {
    const actualizado = await Factura.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json(actualizado);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.eliminarFactura = async (req, res) => {
  try {
    const eliminado = await Factura.findByIdAndDelete(req.params.id);
    if (!eliminado) return res.status(404).json({ message: 'Factura no encontrada' });
    res.json({ message: 'Factura eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
