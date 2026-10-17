const Database = require('better-sqlite3')
const path = require('path')

const dbPath = path.join(__dirname, 'bhawani.db')
const db = new Database(dbPath)

// Enable WAL for better performance
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// ── Create tables
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    NOT NULL UNIQUE,
    phone       TEXT    NOT NULL,
    password    TEXT    NOT NULL,
    birthday    TEXT,
    anniversary TEXT,
    role        TEXT    DEFAULT 'customer',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id     INTEGER REFERENCES users(id),
    cake_name   TEXT    NOT NULL,
    price       INTEGER NOT NULL,
    status      TEXT    DEFAULT 'pending',
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`)

// ── Seed demo user if not exists
const bcrypt = require('bcryptjs')
const existing = db.prepare('SELECT id FROM users WHERE email = ?').get('test@bhawani.com')
if (!existing) {
  const hash = bcrypt.hashSync('password123', 10)
  db.prepare(`
    INSERT INTO users (name, email, phone, password, birthday, anniversary)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run('Demo User', 'test@bhawani.com', '+91 99999 00000', hash, '2000-10-17', '2020-10-17')
  console.log('✅ Demo user seeded: test@bhawani.com / password123')
}

module.exports = db
