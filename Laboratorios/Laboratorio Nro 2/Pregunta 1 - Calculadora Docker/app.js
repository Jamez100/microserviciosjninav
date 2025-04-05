// server.js
const express = require('express');
const app = express();
const port = process.env.PORT || 8080; // Usamos el puerto 8080

// Ruta para mostrar el formulario de la calculadora
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Calculadora Web Básica</title>
      </head>
      <body>
        <h1>Calculadora Web</h1>
        <form action="/calculate" method="get">
          <label for="a">Valor de a:</label>
          <input type="number" name="a" id="a" step="any" required><br><br>
          
          <label for="b">Valor de b:</label>
          <input type="number" name="b" id="b" step="any" required><br><br>
          
          <label for="operacion">Operación:</label>
          <select name="operacion" id="operacion">
            <option value="sumar">Sumar</option>
            <option value="restar">Restar</option>
            <option value="multiplicar">Multiplicar</option>
            <option value="dividir">Dividir</option>
          </select><br><br>
          
          <button type="submit">Calcular</button>
        </form>
      </body>
    </html>
  `);
});

// Ruta para procesar el formulario y realizar el cálculo
app.get('/calculate', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  const operacion = req.query.operacion;
  let resultado;

  // Realiza la operación según lo seleccionado
  switch (operacion) {
    case 'sumar':
      resultado = a + b;
      break;
    case 'restar':
      resultado = a - b;
      break;
    case 'multiplicar':
      resultado = a * b;
      break;
    case 'dividir':
      if (b === 0) {
        return res.send(`
          <html>
            <head>
              <meta charset="utf-8">
              <title>Error</title>
            </head>
            <body>
              <h1>Error: División por cero no es permitida.</h1>
              <a href="/">Volver</a>
            </body>
          </html>
        `);
      }
      resultado = a / b;
      break;
    default:
      resultado = 'Operación no válida';
  }

  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Resultado</title>
      </head>
      <body>
        <h1>Resultado de la operación</h1>
        <p>El resultado es: ${resultado}</p>
        <a href="/">Volver</a>
      </body>
    </html>
  `);
});

// Inicia el servidor en el puerto definido
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
