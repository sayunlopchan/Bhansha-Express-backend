const express = require('express');
const multer = require('multer');
const path = require('path');
const { addProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/productController');
const authenticateToken = require('../middleware/authMiddleware'); // Middleware to protect routes

const router = express.Router();

// Configure file storage for product images
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Routes for product management
router.post('/add-product', authenticateToken, upload.single('image'), addProduct);
router.get('/products', getProducts);
router.put('/edit-product/:id', authenticateToken, upload.single('image'), updateProduct);
router.delete('/delete-product/:id', authenticateToken, deleteProduct);

module.exports = router;
