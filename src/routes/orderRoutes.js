const express = require('express');
const {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  markOrderAsCompleted,
  getOrdersByDateRange,
} = require('../controllers/orderController');

const router = express.Router();

router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.post('/', createOrder);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);
router.get('/user/:userId', getOrdersByUser);
router.put('/:orderId/complete', markOrderAsCompleted);
router.get('/date/:startDate/:endDate', getOrdersByDateRange);

module.exports = router;
