// controllers/orderController.js
const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, user } = req.body;

    // Validate order data
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Items are required and must be a non-empty array.' });
    }

    if (totalPrice <= 0) {
      return res.status(400).json({ message: 'Total price must be greater than 0.' });
    }

    if (!user || !user.firstName || !user.lastName || !user.email || !user.phoneNumber || !user.location) {
      return res.status(400).json({ message: 'User data is incomplete.' });
    }

    // Create and save new order
    const newOrder = new Order({ items, totalPrice, user });
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find(); // Fetch all orders from the database
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get order by ID
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params; // Extract ID from request parameters
    const order = await Order.findById(id); // Fetch order by ID

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Edit an existing order
exports.editOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body; // Get the updates from the request body

    // Validate updates
    if (!updates) {
      return res.status(400).json({ message: 'No updates provided.' });
    }

    const order = await Order.findByIdAndUpdate(id, updates, { new: true });

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order updated successfully', order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Remove an order
exports.removeOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByIdAndDelete(id);

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.status(200).json({ message: 'Order removed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
