const jwt = require('jsonwebtoken');

const checkAdmin = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).send('Access denied. No token provided.');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to request

    if (!decoded.admin) {
      return res.status(403).send('Access denied. Not an admin.');
    }

    next();
  } catch (error) {
    return res.status(400).send('Invalid token.');
  }
};

module.exports = checkAdmin;
