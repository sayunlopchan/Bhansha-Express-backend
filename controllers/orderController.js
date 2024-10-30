const sendOrderEmail = require('../utils/sendEmail');
const Order = require('../models/Order');
const {
  orderConfirmationTemplate,
  adminOrderNotificationTemplate,
  onDeliveryTemplate,
  deliveredTemplate,
  canceledTemplate,
  onCookingTemplate,
} = require('../templates/emailTemplates');

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { items, totalPrice, user, paymentMethod } = req.body;
    const orderId = `BE${Math.floor(10000000 + Math.random() * 90000000)}`;

    const newOrder = new Order({ orderId, items, totalPrice, user, paymentMethod });
    await newOrder.save();

    // Send confirmation email to the customer
    const subjectForCustomer = `Order Confirmation - ${orderId}`;
    const customerTemplate = orderConfirmationTemplate(user, orderId, items, totalPrice, paymentMethod);

    await sendOrderEmail(user.email, { subject: subjectForCustomer, template: customerTemplate });

    // Notify admin (if email is configured)
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      const subjectForAdmin = `New Order Placed - ${orderId}`;
      const adminTemplate = adminOrderNotificationTemplate(user, orderId, items, totalPrice, paymentMethod);
      await sendOrderEmail(adminEmail, { subject: subjectForAdmin, template: adminTemplate });
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    console.error("Error creating order:", error.message || error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Update order status
exports.updateOrderStatus = async (req, res) => {
  const { id } = req.params;
  const { status, notifyUser } = req.body;

  try {
    const updatedOrder = await Order.findByIdAndUpdate(id, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    if (notifyUser) {
      const { user, orderId, items, totalPrice, paymentMethod } = updatedOrder; // Extract additional fields

      let subject, template;

      switch (status) {
        case 'Cooking':
          subject = `Order ${orderId} - Your Order is Cooking!`;
          template = onCookingTemplate(user, orderId, items, totalPrice, paymentMethod); // Pass all parameters
          break;
        case 'On Delivery':
          subject = `Order ${orderId} - Your Order is on the Way!`;
          template = onDeliveryTemplate(user, orderId, items, totalPrice, paymentMethod);
          break;
        case 'Delivery Complete':
          subject = `Order ${orderId} - Your Order Has Been Delivered!`;
          template = deliveredTemplate(user, orderId, items, totalPrice, paymentMethod);
          break;
        case 'Order Cancel':
          subject = `Order ${orderId} - Your Order Has Been Canceled`;
          template = canceledTemplate(user, orderId, items, totalPrice, paymentMethod);
          break;
        default:
          break;
      }

      try {
        await sendOrderEmail(user.email, { subject, template });
      } catch (emailError) {
        console.error('Failed to send status update email:', emailError.message);
      }
    }

    res.status(200).json({ message: 'Order status updated successfully.', order: updatedOrder });
  } catch (error) {
    console.error('Error updating order status:', error.message || error);
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
    res.status(500).json({ message: 'Internal server error' });
  }
};




// Get all orders (admin only)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error.message || error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// Get a specific order by ID
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
    res.status(500).json({ message: 'Internal server error' });
  }
};

