const jwt = require('jsonwebtoken');

const generateAuthToken = (userId) => {
  // Cambia la clave y tiempo de expiración según tus necesidades
  return jwt.sign({ userId }, 'mySecretKey', { expiresIn: '1h' });
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, 'mySecretKey'); // Verifica el token con la clave
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};