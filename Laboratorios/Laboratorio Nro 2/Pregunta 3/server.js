const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Tarea = require('./models/tarea');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(bodyParser.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://mongo:27017/tareas_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log("Conectado a MongoDB"))
  .catch(err => console.error("Error de conexión a MongoDB:", err));

// Endpoint: GET /tareas → Obtener todas las tareas
app.get('/tareas', async (req, res) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: POST /tareas → Crear una nueva tarea
app.post('/tareas', async (req, res) => {
  const { titulo, descripcion, estado } = req.body;
  try {
    const nuevaTarea = new Tarea({ titulo, descripcion, estado });
    const tareaGuardada = await nuevaTarea.save();
    res.status(201).json(tareaGuardada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: PUT /tareas/:id → Actualizar el estado de una tarea
app.put('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  const { estado } = req.body;
  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(id, { estado }, { new: true });
    if (!tareaActualizada) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json(tareaActualizada);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Endpoint: DELETE /tareas/:id → Eliminar una tarea
app.delete('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const tareaEliminada = await Tarea.findByIdAndDelete(id);
    if (!tareaEliminada) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Servidor API corriendo en http://localhost:${port}`);
});
