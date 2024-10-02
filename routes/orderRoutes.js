// routes/orderRoutes.js
const express = require('express');
const { createOrder, getOrders, getOrderById, editOrder, removeOrder } = require('../controllers/orderController');

const router = express.Router();

// Create a new order
router.post('/', createOrder);

// Get all orders
router.get('/', getOrders);

// Get a specific order by ID
router.get('/:id', getOrderById);

// Edit an existing order
router.put('/:id', editOrder);

// Remove an order
router.delete('/:id', removeOrder);

module.exports = router;
