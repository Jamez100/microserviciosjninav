const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const productoRoutes = require('./routes/productoRoutes');
const swaggerUI = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/productos', productoRoutes);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Servidor de productos corriendo en puerto ${PORT}`);
});
