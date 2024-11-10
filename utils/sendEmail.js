const path = require('../constant/path')

const nodemailer = require('nodemailer');

// Utility function to format order details
const formatOrderDetails = (orderData) => {
  const { orderId, items, totalPrice, paymentMethod } = orderData;

  // Create a formatted string for the items
  const itemDetails = `
      <div style="background-color: white; border-radius: 5px; padding: 10px;">
        ${items.map((item) => `
        <div
          style="display: flex; justify-content: space-around; align-items: center; margin-top: 5px; margin-bottom: 5px; border-bottom: 1px solid gray;">

          <div style="width: 100%; padding: 5px 0px;">
            <h5>${item.title}</h5>
            <p style="font-size: 10px;">Qty ${item.quantity}</p>
          </div>

          <p style="font-size: smaller;"><span>Rs.</span><span>${item.price}</span> </p>
        </div>
        `
  )
      .join("")}
      </div>
`;

  // Construct the final order details string for the user with the banner image
  const orderDetailsForUser = `
  <div style="font-family: Arial, sans-serif; background-color: white;  max-width: 600px; min-width: 300px; margin: auto; padding: 10px;">

    

    <div style="margin: auto; padding: 10px; border-radius: 10px; background-color: #ECF1FB; text-align: center;">

      <div
        style="height: 100px; width: 100px; display: flex; justify-content: center; align-items: center; margin: auto; overflow: hidden; border-radius: 100%;">
        <img src="${path.LOGO}"
          alt="bhansha express logo" width="100%" height="100%" style="object-fit: cover;">
      </div>

      <div style="text-align: center;">
        <h1 style="font-size: 20px;">Thanks for the Order</h1>
        <p>Great news! Your order is all set to hit the kitchen. We're preparing it with care, and it will be on its way to you in no time.</p>
      </div>
    </div>


    <div style=" margin: auto; font-size: small; ">
      <div style=" text-align: center; margin: auto; margin-top: 20px; ">
        <span style="text-align: center;">
          <img src="${path.PROGRESS_ICONS.ORDER_CONFIRM}"
            alt="Order Confirmed" style="height: 30px; width: 30px;" />
          <p style="color: blue;">Order Confirmed</p>
        </span>

        <p>&</p>

        <span style="text-align: center;">
          <img src="${path.PROGRESS_ICONS.READY_TO_COOK}" alt="Ready to Cook"
            style="height: 30px; width: 30px;" />
          <p style="color: red;">Ready to Cook</p>
        </span>
      </div>
    </div>




    <div style="background-color: #ECF1FB; padding: 10px; border-radius: 10px;">

      <div style="text-align: center; padding: 0px; margin: 10px 0px;">
        <h4 style="margin: 0px; font-size: 24px;">Your item in this order</h4>
        <p style="font-weight: lighter; margin: 0px;">Order number: ${orderId}</p>
      </div>



      <div style="background-color: white; margin-top: 5px; padding: 10px;  border-radius: 5px;">


      ${itemDetails}
        
          <span style=" font-weight: 500;">
            Subtotal
          </span>
          <span style="float: right;">
            Rs. ${totalPrice}
          </span>
        

        <div style=" margin-top: 20px; width: 100%;">
          <span style="text-align: center; font-weight: 500;">
            Standard Delivery
          </span>
          <span style="float: right;">
            N/A
          </span>
        </div>

      </div>


       <div style="background-color: white; margin-top: 5px; padding: 10px;  border-radius: 5px;">
          <span style=" font-weight: 500;">
            Total
          </span>
          <span style="float: right;">
            Rs. ${totalPrice}
          </span>
      </div>


      <div style="margin-top: 20px;">
        <h5 style="margin: 0px;">Takeout Address</h5>
        <hr>
        <p style="margin: 0px; font-size: smaller;">Loaction: <a href="${path.GOOGLEMAP}">${path.LOCATION}</a></p>
      </div>

      <div style="margin-top: 20px;">
        <h5 style="margin: 0px;">Payment Method</h5>
        <hr>
        <p style="margin: 0px; font-size: smaller;">Type: ${paymentMethod === "Takeout" ? "Takeout" : "Cash on delivery"}</p>
      </div>

    </div>


    <div style="background-color: #ECF1FB; border-radius: 20px; padding: 10px; margin-top: 20px;">

      <div style="margin-top: 10px; width: 100%;">
        <h5 style="text-align: center; margin: 0px;">Connect with us !!</h5>

        <div style="margin-top: 10px; text-align: center;">
          <a href="${path.INSTAGRAM}" style="display: inline-block; margin: 0 10px;">
            <img src="${path.INSTAGRAM_ICON}" alt="instagram"
              width="25px">
          </a>
          <a href="${path.FACEBOOK}" style="display: inline-block; margin: 0 10px;">
            <img src="${path.FACEBOOK_ICON}" alt="facebook"
              width="25px">
          </a>
          <a href="${path.WHATSAPP}" style="display: inline-block; margin: 0 10px;">
            <img src="${path.WHATSAPP_ICON}" alt="whatsapp"
              width="25px">
          </a>
        </div>
      </div>


      <a href="${path.BASEURL}">
        <img src="${path.BANNER}"
          alt="bhansha express offer banner" width="100%" height="100%" style="border-radius: 20px;">
      </a>

    </div>

    </div>

    <footer>
      <p style="font-size: smaller; text-align: center; color: #888;">© 2024 All Rights Reserved.</p>
    </footer>

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
