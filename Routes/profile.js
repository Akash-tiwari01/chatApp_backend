const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Secret key
const JWT_SECRET = 'your_jwt_secret_key';

// Middleware
const authenticate = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = decoded;
    next();
  });
};

// Profile route
router.get('/profile', authenticate, (req, res) => {
  res.json({ message: 'This is your profile', user: req.user });
});

module.exports = router;