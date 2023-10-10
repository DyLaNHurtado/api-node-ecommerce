const mongoose = require('mongoose');

const databaseConfig = {
  connect: async () => {
    try {
      // Conéctate a la base de datos
      await mongoose.connect('mongodb://localhost:27017/tu_basededatos', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true
      });
      console.log('Conexión a la base de datos exitosa');
    } catch (error) {
      console.error('Error al conectar a la base de datos:', error);
      process.exit(1); // Termina la aplicación en caso de error
    }
  }
};

module.exports = databaseConfig;
