const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
  
    // Si es un error de validación (por ejemplo, un error de Mongoose)
    if (err.name === 'ValidationError') {
      return res.status(400).json({ error: err.message });
    }
  
    // Si es un error 404 (recurso no encontrado)
    if (err.status === 404) {
      return res.status(404).json({ error: err.message });
    }
  
    // Otros errores
    res.status(500).json({ error: 'Algo salió mal' });
  };
  
  module.exports =  errorHandler ;