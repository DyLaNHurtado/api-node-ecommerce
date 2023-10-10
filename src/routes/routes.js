const express = require('express');
const orderRouter = require('./orderRoutes');
const productRoutes = require('./productRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

// Ruta principal
router.get('/', (req, res) => {
  res.send('Ruta principal de la aplicación');
});

// Asociación de las rutas relacionadas con órdenes
router.use('/orders', orderRouter);
router.use('/product', productRoutes);
router.use('/user', userRoutes);

module.exports = router;