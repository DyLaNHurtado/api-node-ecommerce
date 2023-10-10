const express = require('express');

const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

router.post('/', createOrder);
router.get('/', getAllOrders);
router.get('/:orderId', getOrderById);
router.put('/:orderId', updateOrder);
router.delete('/:orderId', deleteOrder);


module.exports = router;