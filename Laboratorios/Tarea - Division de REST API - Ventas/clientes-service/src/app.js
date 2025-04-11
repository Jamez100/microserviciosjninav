const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/database');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const clienteRoutes = require('./routes/clienteRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

connectDB();

app.use(express.json());
app.use('/api/clientes', clienteRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get('/', (req, res) => {
  res.send('Bienvenido al Microservicio de Clientes');
});

// Manejador de rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' });
});

app.listen(PORT, () => {
  console.log(`Clientes-Service corriendo en http://localhost:${PORT}`);
});
