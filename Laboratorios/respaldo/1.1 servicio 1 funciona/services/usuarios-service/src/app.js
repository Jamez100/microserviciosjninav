const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger/swagger.json');
const sequelize = require('./config/db');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/users');

const app = express();
app.use(express.json());

// Swagger UI en /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Conexión DB y arranque
sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado a MySQL');
    return sequelize.sync();
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`🚀 Usuarios-Service corriendo en puerto ${process.env.PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error al conectar a la BD:', err);
  });
