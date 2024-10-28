const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const errorHandler = require('./middleware/errorHandler'); // Create this middleware if needed
const userRoutes = require('./routes/userRoutes'); // Assuming you have user routes
const orderRoutes = require('./routes/orderRoutes'); // Assuming you have order routes
const contactRoutes = require('./routes/contact'); // Assuming you have contact routes
const imageRoutes = require('./routes/imageRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Use routes
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api', contactRoutes);
app.use('/api', imageRoutes);

// Home route
app.get('/', (req, res) => {
  res.send('Welcome to the Bhansha Express');
});

// Error handling middleware
app.use(errorHandler); // Implement this middleware to handle errors

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
