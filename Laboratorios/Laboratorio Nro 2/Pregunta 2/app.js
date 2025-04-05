const express = require('express');
const bodyParser = require('body-parser');
const bd = require('./bd.js');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true })); // Para leer datos del formulario
app.set('view engine', 'ejs'); // Configurar EJS como motor de plantillas
app.use(express.static('public')); // Configurar carpeta pública

// Página principal: muestra el bienvenido.html desde la carpeta public
app.get('/', (req, res) => {
  res.sendFile('bienvenido.html', { root: path.join(__dirname, 'public') });
});

// Ruta para listar usuarios (página principal de usuarios)
app.get('/usuarios', (req, res) => {
  bd.query('SELECT * FROM usuarios', (error, usuarios) => {
    if (error) {
      console.log('Error al obtener los usuarios');
      return;
    }
    res.render('index', { usuarios });
  });
});

// Formulario para agregar un nuevo usuario
app.get('/agregar', (req, res) => {
  res.render('agregar');
});

// Agregar usuario
app.post('/agregar', (req, res) => {
  const { nombre, correo } = req.body;
  bd.query('INSERT INTO usuarios (nombre, correo) VALUES (?, ?)', [nombre, correo], (error, resultado) => {
    if (error) {
      console.log('Error al agregar el usuario');
      return;
    }
    res.redirect('/usuarios');
  });
});

// Eliminar usuario
app.get('/eliminar/:id', (req, res) => {
  const id = req.params.id;
  bd.query('DELETE FROM usuarios WHERE id = ?', [id], (error, resultado) => {
    if (error) {
      console.log('Error al eliminar el usuario');
      return;
    }
    res.redirect('/usuarios');
  });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});
