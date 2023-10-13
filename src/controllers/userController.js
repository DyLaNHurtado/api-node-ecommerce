const bcrypt = require('bcrypt');
const envConfig = require('../../config/envConfig')
const User = require('../models/userModel');
const { handleError, CustomError, handleValidationError } = require('../middlewares/errorHandler');

const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    handleError(error, res);
  }
};
// Obtener un usuario por su ID
const getUserById = async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    res.json(user);
  } catch (error) {
    handleError(error, res);
  }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(400, 'El correo electrónico ya está registrado.');
    }

    // Hash de la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear usuario
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generar token de autenticación
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: envConfig.jwt.time });

    res.status(201).json({ user, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

// Iniciar sesión
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      throw new CustomError(401, 'Credenciales incorrectas.');
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      throw new CustomError(401, 'Credenciales incorrectas.');
    }

    // Generar token de autenticación
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: envConfig.jwt.time });

    res.json({ user, token });
  } catch (error) {
    handleError(error, res);
  }
};

const register = async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // Verify if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new CustomError(400, 'Email is already registered.');
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    // Generate authentication token
    const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });

    res.status(201).json({ user, token });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const updates = req.body;

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });

    if (!updatedUser) {
      throw new CustomError(404, 'User not found.');
    }

    res.json({ message: 'User updated successfully.', updatedUser });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

// Eliminar un usuario
const deleteUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      throw new CustomError(404, 'User not found.');
    }

    res.json({ message: 'User deleted successfully.' });
  } catch (error) {
    handleError(error, res);
  }
};

// Obtener detalles del usuario autenticado
const getAuthenticatedUserDetails = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'Usuario no encontrado.');
    }

    res.json(user);
  } catch (error) {
    handleError(error, res);
  }
};

const changePassword = async (req, res) => {
  const userId = req.params.userId;
  const { oldPassword, newPassword } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found.');
    }

    const passwordMatch = await bcrypt.compare(oldPassword, user.password);
    if (!passwordMatch) {
      throw new CustomError(401, 'Current password is incorrect.');
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: 'Password updated successfully.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

const addOrderToUserHistory = async (req, res) => {
  const userId = req.params.userId;
  const orderId = req.body.orderId;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'User not found.');
    }

    user.orders.push(orderId);
    await user.save();

    res.json({ message: 'Order added to user history.' });
  } catch (error) {
    handleError(error, res);
  }
};

const updatePaymentInfo = async (req, res) => {
  const userId = req.params.userId;
  const { cardNumber, expirationDate, cvv } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'Usuario no encontrado.');
    }

    user.creditCardInfo = { cardNumber, expirationDate, cvv };
    await user.save();

    res.json({ message: 'Información de pago actualizada exitosamente.', user });
  } catch (error) {
    handleError(error, res);
  }
};

const deletePaymentInfo = async (req, res) => {
  const userId = req.params.userId;

  try {
    const user = await User.findByIdAndUpdate(userId, { $unset: { creditCardInfo: 1 } }, { new: true });

    if (!user) {
      throw new CustomError(404, 'Usuario no encontrado.');
    }

    res.json({ message: 'Información de pago eliminada exitosamente.', user });
  } catch (error) {
    handleError(error, res);
  }
};

const addPaymentInfo = async (req, res) => {
  const userId = req.params.userId;
  const { cardNumber, expirationDate, cvv } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      throw new CustomError(404, 'Usuario no encontrado.');
    }

    user.creditCardInfo = { cardNumber, expirationDate, cvv };
    await user.save();

    res.json({ message: 'Información de pago agregada exitosamente.', user });
  } catch (error) {
    handleError(error, res);
  }
};



module.exports = {
  getUsers,
  getUserById,
  createUser,
  login,
  register,
  updateUser,
  deleteUser,
  getAuthenticatedUserDetails,
  changePassword,
  addOrderToUserHistory,
  updatePaymentInfo,
  deletePaymentInfo,
  addPaymentInfo
};
