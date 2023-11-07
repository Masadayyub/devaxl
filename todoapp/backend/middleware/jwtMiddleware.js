const jwt = require('jsonwebtoken');

// Middleware function to authenticate JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization;
  console.log(token);

  // Check for the presence of a token
  if (!token) {
    return res.status(401).json({ message: 'Access denied, token missing' });
  }

  // Verify the token and decode the user information
  jwt.verify(token.split(' ')[1], process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    console.log(req.user);
    next();
  });
};

module.exports = authenticateToken;
