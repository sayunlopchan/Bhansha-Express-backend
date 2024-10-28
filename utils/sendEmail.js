const nodemailer = require('nodemailer');

// Utility function to format order details
const formatOrderDetails = (orderData) => {
  const { orderId, items, totalPrice, paymentMethod } = orderData;

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

  // Construct the final order details string for the user with the banner image
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
      <li><strong>Follow:</strong> <a href="https://www.facebook.com/BhanshaExpress">BhanshaExpress on Facebook</a></li>
      <li><strong>Follow:</strong> <a href="https://www.instagram.com/BhanshaExpress">BhanshaExpress on Instagram</a></li>
      <li><strong>Follow:</strong> <a href="https://wa.me/+9779867247262">BhanshaExpress on Whatsapp</a></li>
    </ul>

    <a href="https://bhanshaexpress.com">Visit www.bhanshaexpress.com</a>

    <!-- Banner Image -->
    <div style="margin-top: 20px; text-align: center;">
      <img src="https://bhansha-express-backend.onrender.com/api/image/671f7c6b1139c9d43848a9d8" 
           alt="Thank You Banner" 
           style="max-width: 100%; height: auto;" />
    </div>
  </div>
`;

  return { orderDetailsForUser: orderDetailsForUser.trim() };
};

// Email Sending Function
const sendOrderEmail = async (customerEmail, orderData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    const { orderDetailsForUser } = formatOrderDetails(orderData);

    const customerMailOptions = {
      from: process.env.EMAIL,
      to: customerEmail,
      subject: 'Order Confirmation',
      html: orderDetailsForUser
    };

    await transporter.sendMail(customerMailOptions);

    console.log("Email sent successfully");

  } catch (error) {
    console.error('Error sending email:', error.message || error);
    throw new Error('Failed to send email.');
  }
};

module.exports = sendOrderEmail;
