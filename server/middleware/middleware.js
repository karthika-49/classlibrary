const jwt = require('jsonwebtoken');
const dotenv = require("dotenv").config({path:"../.env"})
const JWT_SECRET =  process.env.JWT_SECRET;// Make sure this matches the secret used to sign the token
module.exports = {
  auth: (req, res, next) => {
    const authHeader = req.headers['authorization'];
    
    if (!authHeader) {
      return res.status(403).json({ error: 'Missing auth header' });
    }

    const tokenParts = authHeader.split(' ');
    
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
      return res.status(403).json({ error: 'Invalid auth header format' });
    }

    const token = tokenParts[1];

    try {
      const decoded = jwt.verify(token, JWT_SECRET);

      if (decoded && decoded.id) {
        req.userId = decoded.id;
        next();
      } else {
        return res.status(403).json({ error: 'Invalid token' });
      }
    } catch (error) {
      console.error('JWT Verification Error:', error.message);
      return res.status(403).json({ error: 'Invalid token' });
    }
  },
};
