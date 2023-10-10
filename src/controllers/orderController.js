const Order = require('../models/orderModel');

const createOrder = async (req, res) => {
  const { products, totalPrice } = req.body;
  const { _id: userId } = req.user; // ID del usuario obtenido desde la autenticación

  try {
    const order = new Order({
      products,
      totalPrice,
      user: userId,
    });
    const savedOrder = await order.save();
    res.json(savedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el pedido' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('products.product').populate('user');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los pedidos' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId).populate('products.product').populate('user');
    if (!order) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener el pedido' });
  }
};

const updateOrder = async (req, res) => {
  const { products, totalPrice } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params.orderId,
      { products, totalPrice },
      { new: true }
    ).populate('products.product').populate('user');

    if (!updatedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el pedido' });
  }
};

const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await Order.findByIdAndDelete(req.params.orderId);

    if (!deletedOrder) {
      return res.status(404).json({ error: 'Pedido no encontrado' });
    }

    res.json(deletedOrder);
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el pedido' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
};