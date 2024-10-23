const nodemailer = require('nodemailer');

// Utility function to format order details
const formatOrderDetails = (orderData) => {
  const { orderId, items, totalPrice, paymentMethod, user } = orderData;



  // Create a formatted string for the items
  const itemDetails = `
  <table style="width: 100%; border-collapse: collapse;">
    <thead>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Item</th>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Quantity</th>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Price (Rs.)</th>
      </tr>
    </thead>
    <tbody>
      ${items
      .map(
        item => `
            <tr>
              <td style="padding: 8px; border: 1px solid black;">${item.title}</td>
              <td style="padding: 8px; border: 1px solid black;">${item.quantity}</td>
              <td style="padding: 8px; border: 1px solid black;">Rs. ${item.price * item.quantity}</td>
            </tr>
          `
      )
      .join('')}
    </tbody>
  </table>
`;



  // Construct the final order details string for admin
  const orderDetailsForAdmin = `
  <div style="font-family: Arial, sans-serif; padding: 20px;">
    <h1 style="color:red;">A new order has been placed.</h1>
    
    <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Order ID</th>
        <td style="padding: 8px; border: 1px solid black;">${orderId}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Payment Method</th>
        <td style="padding: 8px; border: 1px solid black;">${paymentMethod}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Order Items</th>
        <td style="padding: 8px; border: 1px solid black;">${itemDetails}</td>
      </tr>
      <tr>
        <th style="text-align: left; padding: 8px; border: 1px solid black;">Total Price</th>
        <td style="padding: 8px; border: 1px solid black;">Rs. ${totalPrice}</td>
      </tr>
    </table>
    
    <br />
    <p>Thank you for reviewing the order.</p>
  </div>
`;


  // Construct the final order details string for user
  const orderDetailsForUser = `
  <div style="padding: 20px; font-family: Arial, sans-serif;">
  
  <h1 style="color:red;">Your order has been placed.</h1>
  
  <table style="width: 100%; border-collapse: collapse;">
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid black;">Order ID</th>
      <td style="padding: 8px; border: 1px solid black;">${orderId}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid black;">Payment Method</th>
      <td style="padding: 8px; border: 1px solid black;">${paymentMethod}</td>
    </tr>
    <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid black;">Order Items</th>
      <td style="padding: 8px; border: 1px solid black;">${itemDetails}</td>
    </tr>
      <tr>
      <th style="text-align: left; padding: 8px; border: 1px solid black;">Total Price</th>
      <td style="padding: 8px; border: 1px solid black;">Rs. ${totalPrice}</td>
    </tr>
  </table>

  <p>Thank you for your purchase.</p>

  <ul>

  <li>
  <strong>Follow:</strong>
  <a href="https://www.facebook.com/BhanshaExpress">
  <i> BhanshaExpress on Facebook</i>
  </a>
  </li>

  <li>
  <strong>Follow:</strong>
  <a href="https://www.instagram.com/BhanshaExpress">
  <i>BhanshaExpress on Instagram</i>
  </a>
  </li>

  <li>
  <strong>Follow:</strong>
  <a href="https://wa.me/+9779867247262">
  <i>BhanshaExpress on Whatsapp</i>
  </a>
  </li>

  </ul>
  

  <br />
  <a href="https://bhanshaexpress.com"><i>Visit www.bhanshaexpress.com</i></a>
  
  </div>
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
