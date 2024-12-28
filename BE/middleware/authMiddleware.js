// Middleware untuk autentikasi
const jwt = require('jsonwebtoken');
const jwt_secret = 'jhbacbjbkadlkbkackjbkasjcnlkbkjsbckjbkjsdcb'

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Authorization token missing' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, jwt_secret);
    req.userId = decoded.id; // Menambahkan userId ke request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};
