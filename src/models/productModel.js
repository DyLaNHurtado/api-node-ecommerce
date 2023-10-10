const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: {
    type: String,
    trim: true,
  },
  size: {
    type: String,
    enum: ['S', 'M', 'L', 'XL'], // Tallas posibles para camisetas
  },
  color: {
    type: String,
    trim: true,
  },
  // Otros atributos relevantes para la venta de camisetas
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;