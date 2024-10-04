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
    sentDate: { type: Date, default: Date.now }
  },
  status: { type: String, enum: ['Not Set', 'Cooking', 'On Delivery', 'Delivery Complete', 'Order Cancel'], default: 'Not Set' },
  paymentMethod: { type: String, enum: ['Cash on Delivery', 'Takeout'], required: true },
  takeoutLocation: { type: String, default: null },
  // Add sentDate field
}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema);
