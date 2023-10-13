const express = require('express');
const {
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
} = require('../controllers/userController');

const router = express.Router();

router.get('/', getUsers);
router.get('/:userId', getUserById);
router.post('/register', register);  // Added registration route
router.post('/login', login);  // Added login route
router.post('/', createUser);
router.put('/:userId', updateUser);
router.delete('/:userId', deleteUser);
router.put('/:userId/change-password', changePassword);  // Added route for changing password
router.put('/:userId/payment-info', updatePaymentInfo);  // Added route for updating payment info
router.delete('/:userId/payment-info', deletePaymentInfo);  // Added route for deleting payment info
router.post('/:userId/payment-info', addPaymentInfo);  // Added route for adding payment info
router.get('/auth', getAuthenticatedUserDetails);  // Added route for getting authenticated user details
router.post('/:userId/orders', addOrderToUserHistory);  // Added route for adding order to user history

module.exports = router;
