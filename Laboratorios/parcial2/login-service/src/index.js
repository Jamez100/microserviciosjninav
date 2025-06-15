// src/index.js

require('dotenv').config();
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger/swagger.json');
const { connectDB } = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const { validateEnv } = require('./middleware/validateEnv');

const app = express();

// 1) Validamos variables de entorno
validateEnv();

// 2) Middlewares
app.use(express.json());

// 3) Rutas
app.use('/api/auth', authRoutes);

// 4) Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// 5) Conectar a la base de datos, luego arrancar el servidor
connectDB()
  .then(() => {
    const PORT = process.env.PORT || 3001;
    app.listen(PORT, () => {
      console.log(`🚀 Login Service ejecutándose en puerto ${PORT}`);
      console.log(`📖 Swagger UI disponible en http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((err) => {
    console.error('Error al inicializar la base de datos, cerrando servidor...', err);
    process.exit(1);
  });
