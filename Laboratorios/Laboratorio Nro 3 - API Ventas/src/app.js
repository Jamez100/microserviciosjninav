const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();
const PORT = process.env.PORT || 5000;

// Conectar a MongoDB
connectDB();

// Middlewares
app.use(express.json());

// Montar rutas
app.use('/api/productos', require('./routes/productoRoutes'));
app.use('/api/clientes', require('./routes/clienteRoutes'));
app.use('/api/facturas', require('./routes/facturaRoutes'));
app.use('/api/detalles', require('./routes/detalleRoutes'));

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Ruta raíz
app.get('/', (req, res) => {
  res.send('Bienvenido al Sistema de Ventas API');
});

// Manejo de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
