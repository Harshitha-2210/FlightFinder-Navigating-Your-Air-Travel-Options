import jwt from 'jsonwebtoken';

const JWT_SECRET = 'mySuperSecretKey123';  // Same as used in login

// Middleware: Verify Token and Role
export const verifyAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied: Admins only' });
    }

    req.user = decoded;  // Pass user info to next middleware/controller
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};


// ✅ Verify User (For normal logged-in users)
export const verifyUser = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;  // ✅ You can access req.user.userId inside your controller
    next();

  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};



export const verifyOperator = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== 'flightoperator') {
      return res.status(403).json({ message: 'Access denied: Operators only' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, 'mySuperSecretKey123');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
};
