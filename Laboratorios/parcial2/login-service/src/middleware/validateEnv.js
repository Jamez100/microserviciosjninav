// src/middleware/validateEnv.js

function validateEnv() {
  const requiredEnvVars = [
    'DB_HOST',
    'DB_PORT',
    'DB_USER',
    'DB_PASSWORD',
    'DB_NAME',
    'JWT_SECRET',
    'JWT_EXPIRES_IN',
    'PORT'
  ];

  const missing = requiredEnvVars.filter((v) => !process.env[v]);
  if (missing.length > 0) {
    console.error(
      `❌ Faltan variables de entorno obligatorias: ${missing.join(', ')}`
    );
    process.exit(1);
  }
}

module.exports = { validateEnv };
