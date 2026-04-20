const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  // 1. Check if token exists in the header
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extract just the token part (removes "Bearer ")
      token = req.headers.authorization.split(' ')[1];
      
      // 2. Verify the token using your secret key
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // 3. Find the user in database (excluding the password for security)
      req.user = await User.findById(decoded.id).select('-password');
      
      // 4. Move to the actual API route
      next();
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }
  
  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token provided' });
  }
};

module.exports = { protect };