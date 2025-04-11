const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, { 
      useNewUrlParser: true, 
      useUnifiedTopology: true 
    });
    console.log('Clientes-Service: Conectado a MongoDB');
  } catch (error) {
    console.error('Clientes-Service: Error al conectarse a MongoDB:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
