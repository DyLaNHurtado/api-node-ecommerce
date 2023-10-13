const Order = require('../models/orderModel');
const { handleError, CustomError, handleValidationError } = require('../middlewares/errorHandler');

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    handleError(error, res);
  }
};

const getOrderById = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new CustomError(404, 'Orden no encontrada.');
    }

    res.json(order);
  } catch (error) {
    handleError(error, res);
  }
};

const createOrder = async (req, res) => {
  const { products, totalPrice, user } = req.body;

  try {
    const order = new Order({ products, totalPrice, user });
    await order.save();

    res.json({ message: 'Orden creada exitosamente.' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

const updateOrder = async (req, res) => {
  const orderId = req.params.orderId;
  const { products, totalPrice, user } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { products, totalPrice, user },
      { new: true }
    );

    if (!updatedOrder) {
      throw new CustomError(404, 'Orden no encontrada.');
    }

    res.json({ message: 'Orden actualizada exitosamente.', updatedOrder });
  } catch (error) {
    if (error.name === 'ValidationError') {
      handleValidationError(error, res);
    } else {
      handleError(error, res);
    }
  }
};

const deleteOrder = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);

    if (!deletedOrder) {
      throw new CustomError(404, 'Orden no encontrada.');
    }

    res.json({ message: 'Orden eliminada exitosamente.', deletedOrder });
  } catch (error) {
    handleError(error, res);
  }
};

const getOrdersByUser = async (req, res) => {
  const userId = req.params.userId;

  try {
    const orders = await Order.find({ user: userId });
    res.json(orders);
  } catch (error) {
    handleError(error, res);
  }
};

const markOrderAsCompleted = async (req, res) => {
  const orderId = req.params.orderId;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { completed: true },
      { new: true }
    );

    if (!updatedOrder) {
      throw new CustomError(404, 'Orden no encontrada.');
    }

    res.json({ message: 'Orden marcada como completada.', updatedOrder });
  } catch (error) {
    handleError(error, res);
  }
};

const getOrdersByDateRange = async (req, res) => {
  const { startDate, endDate } = req.params;

  try {
    const orders = await Order.find({
      createdAt: { $gte: new Date(startDate), $lte: new Date(endDate) },
    });
    res.json(orders);
  } catch (error) {
    handleError(error, res);
  }
};


module.exports = {
  getAllOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUser,
  markOrderAsCompleted,
  getOrdersByDateRange
};
