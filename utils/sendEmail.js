const nodemailer = require('nodemailer');

// Utility function to format order details
const formatOrderDetails = (orderData) => {
  const { orderId, items, totalPrice, paymentMethod, takeoutLocation } = orderData;

  // Create a formatted string for the items
  const itemDetails = items
    .map(item => `${item.title} (Qty: ${item.quantity}) - Rs. ${item.price * item.quantity}`)
    .join('<br>'); // Using <br> for line breaks in the email

  // Construct the final order details string for admin
  const orderDetailsForAdmin = `
  <h1 style="color:red;">A new order has been placed.</h1>
  <br>
  <strong>Order ID:</strong> ${orderId} 
  <br>
  <strong>Payment Method:</strong> <span style="">${paymentMethod}</span>
  <br>
  <strong>Total Price:</strong> Rs.${totalPrice}
  <br>
  ${takeoutLocation ? `<strong>Takeout Location:</strong> ${takeoutLocation}
  <br>` :
      ''}
  <strong>Order Items:</strong>
  <br>
  ${itemDetails}
  <br />
  
  `;

  // Construct the final order details string for user
  const orderDetailsForUser = `
     <h1 style="color:red;">Your order has been placed.</h1>
    <br>
    <strong>Order ID:</strong> ${orderId}<br>
    <strong>Payment Method:</strong> ${paymentMethod}<br>
    <strong>Total Price:</strong> Rs. ${totalPrice}<br>
    ${takeoutLocation ? `<strong>Takeout Location:</strong> ${takeoutLocation}<br>` : ''}
    <strong>Order Items:</strong><br>
    ${itemDetails}<br>
    Thank you for your purchase.<br>
    #BhanshaExpress
  `;

  return { orderDetailsForAdmin: orderDetailsForAdmin.trim(), orderDetailsForUser: orderDetailsForUser.trim() };
};

// Email Sending Function
const sendOrderEmail = async (customerEmail, orderData) => {
  try {
    // Configuring transporter with email service
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    // Format order details
    const { orderDetailsForAdmin, orderDetailsForUser } = formatOrderDetails(orderData);

    // Email To The Customer 
    const customerMailOptions = {
      from: process.env.EMAIL,
      to: customerEmail,
      subject: 'Order Confirmation',
      html: orderDetailsForUser
    };

    // Email To The Admin
    const adminMailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Order Received!',
      html: orderDetailsForAdmin
    };

    // Send email to the customer
    await transporter.sendMail(customerMailOptions);

    // Send email to the admin
    await transporter.sendMail(adminMailOptions);

    console.log("Emails sent successfully");

  } catch (error) {
    console.error('Error sending emails:', error.message || error);
    throw new Error('Failed to send order emails.');
  }
};

module.exports = sendOrderEmail;
