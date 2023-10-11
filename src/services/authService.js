const jwt = require('jsonwebtoken');
const envConfig = require('../../config/envConfig');
const secretKey = envConfig.jwt.secretKey;
const generateAuthToken = (userId) => {
  // Cambia la clave y tiempo de expiración según tus necesidades
  return jwt.sign({ userId }, secretKey, { expiresIn: envConfig.jwt.time });
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey); // Verifica el token con la clave
    return decoded;
  } catch (error) {
    throw new Error('Token inválido o expirado');
  }
};

module.exports = {
  generateAuthToken,
  verifyAuthToken,
};