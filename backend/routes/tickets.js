const express = require('express');
const router = express.Router();
const { authenticateToken } = require('../auth');
const { run, all, get } = require('../models');

// Helper: calculate SLA
function getDeadline() {
  return new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(); // 1 day
}

// Create Ticket
router.post('/', authenticateToken, async (req, res) => {
  const { title, description, assigned_to } = req.body;
  if (!title) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "title", message: "Title is required" } });
  if (!description) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "description", message: "Description is required" } });

  // Idempotency support
  const idemKey = req.headers['idempotency-key'];
  if (idemKey) {
    const exist = await get('SELECT * FROM tickets WHERE title = ? AND description = ?', [title, description]);
    if (exist) return res.json({ ticket: exist });
  }

  const deadline = getDeadline();
  const created = await run(
    'INSERT INTO tickets (title, description, created_by, assigned_to, sla_deadline, updated_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
    [title, description, req.user.id, assigned_to || null, deadline]
  );
  const ticket = await get('SELECT * FROM tickets WHERE id = ?', [created.lastID]);
  res.json({ ticket });
});

// List + Search Tickets
router.get('/', authenticateToken, async (req, res) => {
  const { limit = 10, offset = 0, q = '' } = req.query;
  let where = '';
  let params = [];
  if (q) {
    where = `WHERE title LIKE ? OR description LIKE ?`;
    params = [`%${q}%`, `%${q}%`];
  }
  const items = await all(`SELECT * FROM tickets ${where} ORDER BY updated_at DESC LIMIT ? OFFSET ?`, [...params, limit, offset]);
  const next_offset = items.length === Number(limit) ? Number(offset) + Number(limit) : null;
  res.json({ tickets: items, next_offset }); // <-- Use 'tickets' for frontend compatibility
});

// Get Ticket detail
router.get('/:id', authenticateToken, async (req, res) => {
  const t = await get('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
  if (!t) return res.status(404).json({ error: { code: "NOT_FOUND" } });
  res.json({ ticket: t });
});

// PATCH ticket (optimistic locking)
router.patch('/:id', authenticateToken, async (req, res) => {
  const { title, description, status, assigned_to, version } = req.body;
  const t = await get('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
  if (!t) return res.status(404).json({ error: { code: "NOT_FOUND" } });

  if (t.version !== version) {
    return res.status(409).json({ error: { code: "STALE_PATCH", message: "Ticket version mismatch" } });
  }

  await run(
    `UPDATE tickets SET
      title = COALESCE(?, title),
      description = COALESCE(?, description),
      status = COALESCE(?, status),
      assigned_to = COALESCE(?, assigned_to),
      updated_at = CURRENT_TIMESTAMP,
      version = version + 1
      WHERE id = ?`,
    [title, description, status, assigned_to, req.params.id]
  );
  const updated = await get('SELECT * FROM tickets WHERE id = ?', [req.params.id]);
  res.json({ ticket: updated });
});

// --- COMMENTS ENDPOINTS ---

// List comments for a ticket
router.get('/:id/comments', authenticateToken, async (req, res) => {
  const comments = await all('SELECT * FROM comments WHERE ticket_id = ?', [req.params.id]);
  res.json({ comments });
});

// Add comment to a ticket
router.post('/:id/comments', authenticateToken, async (req, res) => {
  const { text, parent_id } = req.body;
  if (!text) return res.status(400).json({ error: { code: "FIELD_REQUIRED", field: "text", message: "Text is required" } });
  const created = await run(
    'INSERT INTO comments (ticket_id, user_id, text, parent_id, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
    [req.params.id, req.user.id, text, parent_id || null]
  );
  const comment = await get('SELECT * FROM comments WHERE id = ?', [created.lastID]);
  res.json({ comment });
});

module.exports = router;