require('dotenv').config();

// Base API for Website 
const BASEURL = process.env.BASEURL || 'http://localhost:5000';

// Common Paths
const IMAGE_PATH = `${BASEURL}/assets/email`;

// Helper function for image URLs
const getImageUrl = (name) => `${IMAGE_PATH}/${name}`;

// Assets 
const LOGO = getImageUrl("logo.png");
const BANNER = getImageUrl("banner.png");

// Social Media Links
const INSTAGRAM = "https://www.instagram.com/bhanshaexpress";
const FACEBOOK = "https://www.facebook.com/BhanshaExpress";
const WHATSAPP = "https://wa.me/+9779867247262";
const GOOGLEMAP = "https://maps.app.goo.gl/13bcbjHbvk8z7TeC7";

// Location
const LOCATION = "Butwal";

// Social Media Icons
const INSTAGRAM_ICON = getImageUrl("instagram.png");
const FACEBOOK_ICON = getImageUrl("facebook.png");
const WHATSAPP_ICON = getImageUrl("whatsapp.png");

// Status Images
const STATUS_IMAGES = {
  ON_DELIVERY: getImageUrl("shipping.png"),
  DELIVERED: getImageUrl("complete.png"),
  CANCELED: getImageUrl("cancelled.png"),
};

// Progress Icon Images
const PROGRESS_ICONS = {
  READY_TO_COOK: getImageUrl("cooking.png"),
  ORDER_CONFIRM: getImageUrl("confirmation.png"),
};

// Export the configuration
module.exports = {
  BASEURL,
  IMAGE_PATH,
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
