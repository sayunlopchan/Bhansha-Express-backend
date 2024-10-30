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
 
<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
  </head>

  <body
    style="font-family: Arial, sans-serif; background-color: white;  max-width: 600px; min-width: 300px; margin: auto; padding: 10px;">

    

    <div style="margin: auto; padding: 10px; border-radius: 10px; background-color: #ECF1FB; text-align: center;">

      <div
        style="height: 100px; width: 100px; display: flex; justify-content: center; align-items: center; margin: auto; overflow: hidden; border-radius: 100%;">
        <img src="https://bhansha-express-backend.onrender.com/api/image/67210b13cf6136f012411478"
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
          <img src="https://bhansha-express-backend.onrender.com/api/image/6720af404d23b0f2c87b7e5e"
            alt="Order Confirmed" style="height: 30px; width: 30px;" />
          <p style="color: blue;">Order Confirmed</p>
        </span>

        <p>&</p>

        <span style="text-align: center;">
          <img src="https://bhansha-express-backend.onrender.com/api/image/6720af474d23b0f2c87b7e60" alt="Ready to Cook"
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
        <p style="margin: 0px; font-size: smaller;">Loaction: <a href="https://www.google.com/maps/place/27%C2%B039'47.7%22N+83%C2%B027'27.9%22E/@27.663239,83.45775,17z/data=!3m1!4b1!4m4!3m3!8m2!3d27.663239!4d83.45775?entry=ttu&g_ep=EgoyMDI0MTAyNy4wIKXMDSoASAFQAw%3D%3D">Butwal</a></p>
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
          <a href="https://www.instagram.com/bhanshaexpress" style="display: inline-block; margin: 0 10px;">
            <img src="https://bhansha-express-backend.onrender.com/api/image/67211686cf6136f01241147c" alt="instagram"
              width="25px">
          </a>
          <a href="https://www.facebook.com/BhanshaExpress" style="display: inline-block; margin: 0 10px;">
            <img src="https://bhansha-express-backend.onrender.com/api/image/672115e4cf6136f01241147a" alt="facebook"
              width="25px">
          </a>
          <a href="https://wa.me/+9779867247262" style="display: inline-block; margin: 0 10px;">
            <img src="https://bhansha-express-backend.onrender.com/api/image/672116a5cf6136f01241147e" alt="whatsapp"
              width="25px">
          </a>
        </div>
      </div>


      <a href="https://www.bhanshaexpress.com">
        <img src="https://bhansha-express-backend.onrender.com/api/image/671f7c6b1139c9d43848a9d8"
          alt="bhansha express offer banner" width="100%" height="100%" style="border-radius: 20px;">
      </a>

    </div>

    </div>

    <footer>
      <p style="font-size: smaller; text-align: center; color: #888;">© 2024 All Rights Reserved.</p>
    </footer>

  </body>


</html>
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
