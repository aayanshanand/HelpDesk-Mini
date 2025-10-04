const express = require('express');
const router = express.Router({ mergeParams: true });
const { authenticateToken } = require('../auth');
const { run, all, get } = require('../models');

// Add comment
router.post('/', authenticateToken, async (req, res) => {
  const { text, parent_id } = req.body;
  if (!text) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "text", message: "Comment text required" } });

  await run(
    'INSERT INTO comments (ticket_id, user_id, text, parent_id) VALUES (?, ?, ?, ?)',
    [req.params.id, req.user.id, text, parent_id || null]
  );
  res.json({ success: true });
});

// Get comments thread
router.get('/', authenticateToken, async (req, res) => {
  const comments = await all('SELECT * FROM comments WHERE ticket_id = ? ORDER BY created_at ASC', [req.params.id]);
  res.json({ comments });
});

module.exports = router;