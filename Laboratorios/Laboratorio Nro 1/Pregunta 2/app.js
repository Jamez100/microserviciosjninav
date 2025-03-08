const express = require('express');
const app = express();
const path = require('path');
const port = 3000;

// Configurar EJS como motor de plantillas
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Ruta para mostrar el formulario
app.get('/', (req, res) => {
  res.render('index');
});

// Ruta para procesar el formulario y generar la tabla
app.get('/generar', (req, res) => {
  const operacion = req.query.operacion;
  const numero = parseFloat(req.query.numero);
  const inicio = parseInt(req.query.inicio);
  const fin = parseInt(req.query.fin);
  let tabla = [];
  let simboloOperacion = '';

  if (!operacion || isNaN(numero) || isNaN(inicio) || isNaN(fin)) {
    return res.send("Por favor, ingresa valores válidos.");
  }

  for (let i = inicio; i <= fin; i++) {
    let resultado;
    switch (operacion) {
      case 'suma':
        resultado = numero + i;
        simboloOperacion = '+';
        break;
      case 'resta':
        resultado = numero - i;
        simboloOperacion = '-';
        break;
      case 'multiplicacion':
        resultado = numero * i;
        simboloOperacion = '×';
        break;
      case 'division':
        simboloOperacion = '/';
        resultado = i !== 0 ? (numero / i).toFixed(2) : 'Indefinido';
        break;
      default:
        return res.send("Operación no válida.");
    }
    tabla.push({ numero, simboloOperacion, i, resultado });
  }

  res.render('resultado', { tabla });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
