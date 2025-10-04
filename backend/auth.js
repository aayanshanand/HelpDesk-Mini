const jwt = require('jsonwebtoken');
const db = require('./db');
const { get } = require('./models');
const secret = process.env.JWT_SECRET;

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ error: { code: "UNAUTHORIZED" } });
  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: { code: "UNAUTHORIZED" } });

  jwt.verify(token, secret, async (err, user) => {
    if (err) return res.status(403).json({ error: { code: "FORBIDDEN" } });
    const dbUser = await get('SELECT * FROM users WHERE id = ?', [user.id]);
    if (!dbUser) return res.status(403).json({ error: { code: "FORBIDDEN" } });
    req.user = dbUser;
    next();
  });
}

function generateToken(user) {
  return jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '7d' });
}

module.exports = { authenticateToken, generateToken };