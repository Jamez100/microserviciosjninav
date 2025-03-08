// app.js
const express = require('express');
const connection = require('./db');

const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las solicitudes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta para crear un nuevo registro
app.post('/agenda', (req, res) => {
  const { nombres, apellidos, direccion, telefono } = req.body;
  const query = 'INSERT INTO agenda (nombres, apellidos, direccion, telefono) VALUES (?, ?, ?, ?)';
  connection.execute(query, [nombres, apellidos, direccion, telefono], (err, result) => {
    if (err) {
      console.error('Error al insertar el registro:', err);
      res.status(500).send('Error al insertar el registro.');
      return;
    }
    res.status(201).send('Registro insertado correctamente.');
  });
});

// Ruta para obtener todos los registros
app.get('/agenda', (req, res) => {
  const query = 'SELECT * FROM agenda';
  connection.execute(query, (err, results) => {
    if (err) {
      console.error('Error al obtener los registros:', err);
      res.status(500).send('Error al obtener los registros.');
      return;
    }
    res.json(results);
  });
});

// Ruta para obtener un registro por ID
app.get('/agenda/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM agenda WHERE id = ?';
  connection.execute(query, [id], (err, results) => {
    if (err) {
      console.error('Error al obtener el registro:', err);
      res.status(500).send('Error al obtener el registro.');
      return;
    }
    if (results.length === 0) {
      res.status(404).send('Registro no encontrado.');
      return;
    }
    res.json(results[0]);
  });
});

// Ruta para actualizar un registro
app.put('/agenda/:id', (req, res) => {
  const { id } = req.params;
  const { nombres, apellidos, direccion, telefono } = req.body;
  const query = 'UPDATE agenda SET nombres = ?, apellidos = ?, direccion = ?, telefono = ? WHERE id = ?';
  connection.execute(query, [nombres, apellidos, direccion, telefono, id], (err, result) => {
    if (err) {
      console.error('Error al actualizar el registro:', err);
      res.status(500).send('Error al actualizar el registro.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Registro no encontrado.');
      return;
    }
    res.send('Registro actualizado correctamente.');
  });
});

// Ruta para eliminar un registro
app.delete('/agenda/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM agenda WHERE id = ?';
  connection.execute(query, [id], (err, result) => {
    if (err) {
      console.error('Error al eliminar el registro:', err);
      res.status(500).send('Error al eliminar el registro.');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('Registro no encontrado.');
      return;
    }
    res.send('Registro eliminado correctamente.');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
