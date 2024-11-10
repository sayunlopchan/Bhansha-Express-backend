require('dotenv').config();

// Base API for Website 
const BASEURL = process.env.BASEURL || 'http://localhost:5000';

// Assets 
const LOGO = "https://bhanshaexpress.com/assets/email/logo.jpg";
const BANNER = "https://bhanshaexpress.com/assets/email/banner.png";

// Social Media Links
const INSTAGRAM = "https://www.instagram.com/bhanshaexpress";
const FACEBOOK = "https://www.facebook.com/BhanshaExpress";
const WHATSAPP = "https://wa.me/+9779867247262";
const GOOGLEMAP = "https://maps.app.goo.gl/13bcbjHbvk8z7TeC7";

// Location
const LOCATION = "Butwal";

// Social Media Icons
const INSTAGRAM_ICON = "https://bhanshaexpress.com/assets/email/instagram.png";
const FACEBOOK_ICON = "https://bhanshaexpress.com/assets/email/facebook.png";
const WHATSAPP_ICON = "https://bhanshaexpress.com/assets/email/whatsapp.png";

// Status Images
const STATUS_IMAGES = {
  ON_DELIVERY: "https://bhanshaexpress.com/assets/email/shipping.jpg",
  DELIVERED: "https://bhanshaexpress.com/assets/email/complete.png",
  CANCELED: "https://bhanshaexpress.com/assets/email/cancelled.png",
};

// Progress Icon Images
const PROGRESS_ICONS = {
  READY_TO_COOK: "https://bhanshaexpress.com/assets/email/cooking.png",
  ORDER_CONFIRM: "https://bhanshaexpress.com/assets/email/confirmation.png",
};

// Export the configuration
module.exports = {
  BASEURL,
  LOGO,
  BANNER,
  INSTAGRAM,
  FACEBOOK,
  WHATSAPP,
  GOOGLEMAP,
  LOCATION,
  INSTAGRAM_ICON,
  FACEBOOK_ICON,
  WHATSAPP_ICON,
  STATUS_IMAGES,
  PROGRESS_ICONS,
};
