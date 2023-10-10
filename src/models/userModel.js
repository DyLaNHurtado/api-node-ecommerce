const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    street: { type: String, trim: true },
    city: { type: String, trim: true },
    state: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    country: { type: String, trim: true },
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
  paymentMethod: {
    type: String,
    trim: true,
    enum: ['CreditCard', 'Paypal', 'Other'],
  },
  creditCardInfo: {
    cardNumber: { type: String, trim: true },
    expirationDate: { type: String, trim: true },
    cvv: { type: String, trim: true },
  },
  paypalInfo: {
    email: { type: String, trim: true },
  },
  // Lista de pedidos asociados a este usuario
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;