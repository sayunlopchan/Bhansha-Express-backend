// models/Order.js

const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  items: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  user: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
  },
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
