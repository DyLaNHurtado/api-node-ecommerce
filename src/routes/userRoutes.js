const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const errorHandler = require('../middlewares/errorHandler');
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require('../controllers/userController');

const router = express.Router();

// Aplica el middleware de autenticación a todas las rutas de usuarios
router.use(authMiddleware);

router.get('/', getAllUsers);
router.get('/:userId', getUserById);
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);

// Aplica el middleware de manejo de errores
router.use(errorHandler);

module.exports = router;
