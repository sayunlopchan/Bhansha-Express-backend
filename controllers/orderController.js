const Order = require('../models/Order');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, user, paymentMethod, takeoutLocation } = req.body;

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

    // Create and save new order, including payment method and takeout location
    const newOrder = new Order({ items, totalPrice, user, paymentMethod, takeoutLocation });
    await newOrder.save();

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Retrieve all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
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
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
