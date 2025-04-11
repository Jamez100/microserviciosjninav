const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const libro = require('./models/libro');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/libro_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión a MongoDB:", err));

// Endpoint: GET /libro → Obtener todos los libros
app.get('/libro', async (req, res) => {
  try {
    const libro = await libro.find();
    res.json(libro);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: POST /libro → Crear una nueva libro
app.post('/libro', async (req, res) => {
  const { titulo, autor, editorial, año, descripcion, numpagina, estado } = req.body;
  try {
    const nuevalibro = new libro({ titulo, autor, editorial, año, descripcion, numpagina, estado });
    const libroGuardada = await nuevalibro.save();
    res.status(201).json(libroGuardada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: PUT /libro/:id → Actualizar el estado de una libro
app.put('/libro/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const libroActualizada = await libro.findByIdAndUpdate(id, { estado }, { new: true });
    if (!libroActualizada) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(libroActualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: DELETE /libro/:id → Eliminar una libro
app.delete('/libro/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const libroEliminada = await libro.findByIdAndDelete(id);
    if (!libroEliminada) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor API corriendo en http://localhost:${port}`);
});
