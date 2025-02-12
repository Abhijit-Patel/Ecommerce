const { verifyToken } = require('../config/jwt');
const redisClient = require('../config/redis');

const authMiddleware = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ error: 'Access denied' });
  const isBlacklisted = await redisClient.get(`blacklist:${token}`);
  if (isBlacklisted) return res.status(401).json({ message: 'User is sign out' });

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

module.exports = authMiddleware;