const express = require('express');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus,
  deleteOrder,
} = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders (admin only)
router.get('/', getAllOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Update an existing order status
router.put('/:id', updateOrderStatus); // This is your update status endpoint

// Remove an order (admin only)
router.delete('/:id', deleteOrder);

module.exports = router;
