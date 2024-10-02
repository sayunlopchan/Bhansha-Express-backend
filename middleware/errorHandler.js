// Centralized error handling middleware
const errorHandler = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: 'Internal server error',
    error: err.message || 'An error occurred',
  });
};

module.exports = errorHandler;

module.exports = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
};