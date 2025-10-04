-- Users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    password TEXT,
    role TEXT CHECK(role IN ('user', 'agent', 'admin'))
);

INSERT INTO users (username, password, role) VALUES
('alice', '$2b$10$RmY/JZoaldq0fgj/aFxEdOG6wuYTEY2EEE5gp9nmKz3xZqZ6eVzji', 'user'),      -- password: password
('bob',   '$2b$10$RmY/JZoaldq0fgj/aFxEdOG6wuYTEY2EEE5gp9nmKz3xZqZ6eVzji', 'agent'),     -- password: password
('admin', '$2b$10$RmY/JZoaldq0fgj/aFxEdOG6wuYTEY2EEE5gp9nmKz3xZqZ6eVzji', 'admin');     -- password: password

-- Tickets
DROP TABLE IF EXISTS tickets;
CREATE TABLE tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    description TEXT,
    status TEXT CHECK(status IN ('open', 'in_progress', 'closed')) DEFAULT 'open',
    created_by INTEGER,
    assigned_to INTEGER,
    sla_deadline DATETIME,
    updated_at DATETIME,
    version INTEGER DEFAULT 1,
    FOREIGN KEY(created_by) REFERENCES users(id),
    FOREIGN KEY(assigned_to) REFERENCES users(id)
);

-- Comments
DROP TABLE IF EXISTS comments;
CREATE TABLE comments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER,
    user_id INTEGER,
    text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    parent_id INTEGER,
    FOREIGN KEY(ticket_id) REFERENCES tickets(id),
    FOREIGN KEY(user_id) REFERENCES users(id),
    FOREIGN KEY(parent_id) REFERENCES comments(id)
);

-- Timeline
DROP TABLE IF EXISTS timeline;
CREATE TABLE timeline (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ticket_id INTEGER,
    action TEXT,
    user_id INTEGER,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(ticket_id) REFERENCES tickets(id),
    FOREIGN KEY(user_id) REFERENCES users(id)
);

-- Seed tickets
INSERT INTO tickets (title, description, created_by, assigned_to, sla_deadline, updated_at)
VALUES
('Sample Ticket 1', 'My computer does not start.', 1, 2, DATETIME('now', '+1 day'), DATETIME('now')),
('Sample Ticket 2', 'Need access to system.', 1, 2, DATETIME('now', '+2 day'), DATETIME('now'));