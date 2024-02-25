const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  // Check if token exists
  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  // Verify token
  jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
           return res.status(401).json({ message: 'Failed to authenticate token' });
      }
      req.userId = decoded;
      next();
  });
};

 