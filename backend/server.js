require('dotenv').config()
const express = require('express')
const cors    = require('cors')
const path    = require('path')

// Initialize DB first (creates tables + seeds)
require('./db')

const authRoutes = require('./routes/auth')

const app  = express()
const PORT = process.env.PORT || 5000

// ── Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// ── API Routes
app.use('/api/auth', authRoutes)

// ── Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', shop: 'Bhawani Sweets & Bakery', time: new Date().toISOString() })
})

// ── Serve React build in production
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, '../frontend/dist')
  app.use(express.static(buildPath))
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildPath, 'index.html'))
  })
}

app.listen(PORT, () => {
  console.log(`\n🎂 Bhawani Sweets & Bakery Backend`)
  console.log(`   ✅ Server running on http://localhost:${PORT}`)
  console.log(`   📦 Database: SQLite (bhawani.db)`)
  console.log(`   🔐 JWT auth enabled\n`)
})

module.exports = app
