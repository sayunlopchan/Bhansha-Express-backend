const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config();

const receiveContactMessage = async (contactData) => {
  try {
    const { firstname, lastname, email, phone, message } = contactData;

    // Configure transporter with email service
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      }
    });

    // Email content for the admin
    const contactMailOptions = {
      from: process.env.EMAIL,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL,
      subject: `New Contact Message from ${firstname} ${lastname}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>New Contact Message Received</h2>
          <p><strong>Name:</strong> ${firstname} ${lastname}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
      `
    };

    // Send contact message email to admin
    await transporter.sendMail(contactMailOptions);
    console.log("Contact message sent successfully");
  } catch (error) {
    console.error('Error sending contact message email:', error.message || error);
    throw new Error('Failed to send contact message.');
  }
};

module.exports = receiveContactMessage;
