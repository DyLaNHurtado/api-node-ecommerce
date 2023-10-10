const authService = require('../services/authService');

const authMiddleware = (req, res, next) => {
  const authToken = req.header('Authorization');

  if (!authToken) {
    return res.status(401).json({ error: 'Token de autenticación no proporcionado' });
  }

  try {
    // Verifica el token utilizando el servicio de autenticación
    const decodedToken = authService.verifyAuthToken(authToken);
    req.userId = decodedToken.userId; // Agrega el ID de usuario a la solicitud para su uso posterior
    next(); // Continúa con la siguiente función en la ruta
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticación inválido o expirado' });
  }
};

module.exports = authMiddleware;