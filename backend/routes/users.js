const express = require('express');
const router = express.Router();
const { get } = require('../models');
const bcrypt = require('bcrypt');
const { generateToken } = require('../auth');

// Login endpoint
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "username", message: "Username is required" } });
  if (!password) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "password", message: "Password is required" } });

  const user = await get('SELECT * FROM users WHERE username = ?', [username]);
  if (!user) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS" } });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: { code: "INVALID_CREDENTIALS" } });

  const token = generateToken(user);
  res.json({ token, user: { id: user.id, username: user.username, role: user.role } });
});

module.exports = router;