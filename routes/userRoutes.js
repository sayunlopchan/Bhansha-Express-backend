const express = require('express');
const router = express.Router();
const { loginUser, signupUser, getAllUsers } = require('../controllers/userController');
const checkAdmin = require('../middleware/checkAdmin');

// Login route
router.post('/login', loginUser);

// Signup route
router.post('/signup', signupUser);

// Get all users route (with admin check)
router.get('/', checkAdmin, getAllUsers);

module.exports = router;
