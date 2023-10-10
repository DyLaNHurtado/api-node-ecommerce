require('dotenv').config();

const envConfig = {
  // Configuración para la base de datos
  database: {
    uri: process.env.DB_URI || 'mongodb://localhost:27017/tu_basededatos',
  },

  // Configuración para el servidor
  server: {
    port: process.env.PORT || 3000,
  },

  // Configuración para JWT
  jwt: {
    secretKey: process.env.JWT_SECRET || 'mySecretKey',
  },
};

module.exports = envConfig;