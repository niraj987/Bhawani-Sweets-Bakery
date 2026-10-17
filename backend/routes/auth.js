const express = require('express')
const bcrypt  = require('bcryptjs')
const jwt     = require('jsonwebtoken')
const db      = require('../db')

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'bhawani_secret'

function makeToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    JWT_SECRET,
    { expiresIn: '7d' }
  )
}

function safeUser(u) {
  const { password, ...rest } = u
  return rest
}

// ── POST /api/auth/signup
router.post('/signup', (req, res) => {
  const { name, email, phone, password, birthday, anniversary } = req.body
  if (!name || !email || !phone || !password) {
    return res.status(400).json({ error: 'All required fields must be filled.' })
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password must be at least 6 characters.' })
  }

  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email)
  if (existing) return res.status(409).json({ error: 'Email already registered.' })

  const hash = bcrypt.hashSync(password, 10)
  const info = db.prepare(`
    INSERT INTO users (name, email, phone, password, birthday, anniversary)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(name, email, phone, hash, birthday || null, anniversary || null)

  const user = db.prepare('SELECT * FROM users WHERE id = ?').get(info.lastInsertRowid)
  const token = makeToken(user)
  res.json({ token, user: safeUser(user) })
})

// ── POST /api/auth/login
router.post('/login', (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Email and password required.' })

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email)
  if (!user) return res.status(401).json({ error: 'No account found with this email.' })

  const valid = bcrypt.compareSync(password, user.password)
  if (!valid) return res.status(401).json({ error: 'Incorrect password.' })

  const token = makeToken(user)
  res.json({ token, user: safeUser(user) })
})

// ── GET /api/auth/me  (requires token)
router.get('/me', (req, res) => {
  const auth = req.headers.authorization
  if (!auth || !auth.startsWith('Bearer ')) return res.status(401).json({ error: 'Unauthorized' })
  try {
    const payload = jwt.verify(auth.split(' ')[1], JWT_SECRET)
    const user = db.prepare('SELECT * FROM users WHERE id = ?').get(payload.id)
    if (!user) return res.status(404).json({ error: 'User not found' })
    res.json({ user: safeUser(user) })
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
})

module.exports = router
