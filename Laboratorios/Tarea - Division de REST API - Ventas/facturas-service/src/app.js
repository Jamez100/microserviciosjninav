require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const conectarDB = require('./config/database');
const facturaRoutes = require('./routes/facturaRoutes');
const detalleRoutes = require('./routes/detalleRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

const app = express();
app.use(bodyParser.json());

conectarDB();

app.use('/api/facturas', facturaRoutes);
app.use('/api/detalles', detalleRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const PORT = process.env.PORT || 5003;
app.listen(PORT, () => console.log(`Facturas service running on port ${PORT}`));
