require('dotenv').config();

// Base API for Website 
const BASEURL = process.env.BASEURL || 'http://localhost:5000';

// Common Paths
const IMAGE_PATH = `${BASEURL}/api/image`;

// Helper function for image URLs
const getImageUrl = (id) => `${IMAGE_PATH}/${id}`;

// Assets 
const LOGO = getImageUrl("67210b13cf6136f012411478");
const BANNER = getImageUrl("671f7c6b1139c9d43848a9d8");

// Social Media Links
const INSTAGRAM = "https://www.instagram.com/bhanshaexpress";
const FACEBOOK = "https://www.facebook.com/BhanshaExpress";
const WHATSAPP = "https://wa.me/+9779867247262";
const GOOGLEMAP = "https://maps.app.goo.gl/13bcbjHbvk8z7TeC7";

// Location
const LOCATION = "Butwal";

// Social Media Icons
const INSTAGRAM_ICON = getImageUrl("67211686cf6136f01241147c");
const FACEBOOK_ICON = getImageUrl("672115e4cf6136f01241147a");
const WHATSAPP_ICON = getImageUrl("672116a5cf6136f01241147e");

// Status Images
const STATUS_IMAGES = {
  ON_DELIVERY: getImageUrl("6721d2697170de730f4be6df"),
  DELIVERED: getImageUrl("6721d3cc71209ca14a920d5d"),
  CANCELED: getImageUrl("6721d2237170de730f4be6c8"),
};

// Progress Icon Images
const PROGRESS_ICONS = {
  READY_TO_COOK: getImageUrl("6720af474d23b0f2c87b7e60"),
  ORDER_CONFIRM: getImageUrl("6720af404d23b0f2c87b7e5e"),
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
