const sendOrderEmail = require('../utils/sendEmail');
const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, user, paymentMethod } = req.body;

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

    // Generate unique orderId with "BE" prefix followed by a random 8-digit number
    const orderId = `BE${Math.floor(10000000 + Math.random() * 90000000)}`;

    // Create and save new order
    const newOrder = new Order({ orderId, items, totalPrice, user, paymentMethod });
    await newOrder.save();

    // Send email notifications to customer and admin
    await sendOrderEmail(user.email, { orderId, items, totalPrice, paymentMethod });

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message || error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Retrieve all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error.message || error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Retrieve a specific order by ID
exports.getOrderById = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error("Error retrieving specific order:", error.message || error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Update an order status (admin only)
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({ message: 'Order status updated successfully.', order: updatedOrder });
  } catch (error) {
    console.error("Error updating order status:", error.message || error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

// Delete an order (admin only)
exports.deleteOrder = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOrder = await Order.findByIdAndDelete(id);
    if (!deletedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }
    res.status(200).json({ message: 'Order deleted successfully.' });
  } catch (error) {
    console.error("Error deleting order:", error.message || error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
