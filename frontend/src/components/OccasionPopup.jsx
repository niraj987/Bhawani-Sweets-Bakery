import { useEffect, useState, useRef } from 'react'
import gsap from 'gsap'
import Confetti from './Confetti'
import { useAuth } from '../context/AuthContext'

const OCCASIONS = [
  { key: 'birthday', label: 'Happy Birthday!', emoji: '🎂🎉', msg: 'Wishing you a day as sweet as our cakes!', sub: 'Claim your 10% birthday discount today!', color: '#e8718a', gradient: 'from-pink-900 via-rose-800 to-pink-900' },
  { key: 'anniversary', label: 'Happy Anniversary! 💍', emoji: '💍❤️', msg: 'Celebrating your beautiful love story!', sub: 'Special anniversary cake awaits you!', color: '#d4a853', gradient: 'from-yellow-900 via-amber-800 to-yellow-900' },
  { key: 'diwali', label: 'Happy Diwali! 🪔', emoji: '🪔✨🎆', msg: 'May your life be filled with light and sweetness!', sub: 'Diwali special sweets & cakes available!', color: '#fb923c', gradient: 'from-orange-900 via-red-800 to-orange-900' },
  { key: 'christmas', label: 'Merry Christmas! 🎄', emoji: '🎄⭐🎁', msg: "Season's sweetest greetings from our family!", sub: 'Christmas special plum cakes available!', color: '#4ade80', gradient: 'from-green-900 via-emerald-800 to-green-900' },
  { key: 'newyear', label: 'Happy New Year! 🎆', emoji: '🎆✨🥂', msg: 'Sweet beginnings for a sweet new year!', sub: 'Ring in the New Year with our special cakes!', color: '#a78bfa', gradient: 'from-purple-900 via-violet-800 to-purple-900' },
  { key: 'valentine', label: "Happy Valentine's Day! ❤️", emoji: '❤️🌹💕', msg: 'Love is sweeter with Bhawani cakes!', sub: 'Heart-shaped cakes crafted just for you!', color: '#f43f5e', gradient: 'from-red-900 via-pink-800 to-red-900' },
]

function isBirthday(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  const now = new Date()
  return d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
}

function isAnniversary(dateStr) {
  if (!dateStr) return false
  const d = new Date(dateStr)
  const now = new Date()
  return d.getMonth() === now.getMonth() && d.getDate() === now.getDate()
}

function getCurrentOccasion() {
  const now = new Date()
  const month = now.getMonth() + 1
  const day = now.getDate()
  if (month === 10 && day >= 20 && day <= 31) return OCCASIONS.find(o => o.key === 'diwali')
  if (month === 12 && day >= 24 && day <= 26) return OCCASIONS.find(o => o.key === 'christmas')
  if (month === 1 && day <= 3) return OCCASIONS.find(o => o.key === 'newyear')
  if (month === 2 && day === 14) return OCCASIONS.find(o => o.key === 'valentine')
  return null
}

export default function OccasionPopup() {
  const { user } = useAuth()
  const [occasion, setOccasion] = useState(null)
  const [visible, setVisible] = useState(false)
  const popRef = useRef(null)

  useEffect(() => {
    const shownKey = 'bhawani_occasion_shown'
    const alreadyShown = sessionStorage.getItem(shownKey)
    if (alreadyShown) return

    let occ = null

    if (user) {
      if (isBirthday(user.birthday)) occ = OCCASIONS.find(o => o.key === 'birthday')
      else if (isAnniversary(user.anniversary)) occ = OCCASIONS.find(o => o.key === 'anniversary')
    }

    if (!occ) occ = getCurrentOccasion()

    if (occ) {
      setOccasion(occ)
      const timer = setTimeout(() => {
        setVisible(true)
        sessionStorage.setItem(shownKey, '1')
        setTimeout(() => {
          if (popRef.current) {
            gsap.fromTo(popRef.current,
              { scale: 0.5, opacity: 0, rotation: -8 },
              { scale: 1, opacity: 1, rotation: 0, duration: 0.7, ease: 'back.out(1.7)' }
            )
          }
        }, 50)
      }, 1800)
      return () => clearTimeout(timer)
    }
  }, [user])

  const handleClose = () => {
    if (popRef.current) {
      gsap.to(popRef.current, {
        scale: 0.8, opacity: 0, rotation: 8, duration: 0.4, ease: 'power2.in',
        onComplete: () => setVisible(false)
      })
    }
  }

  if (!visible || !occasion) return null

  return (
    <div className="popup-overlay" onClick={handleClose}>
      <Confetti active={visible} count={100} />
      <div
        ref={popRef}
        className="relative max-w-sm w-full mx-4 rounded-3xl overflow-hidden"
        style={{ border: `2px solid ${occasion.color}`, boxShadow: `0 0 60px ${occasion.color}55` }}
        onClick={e => e.stopPropagation()}
      >
        {/* Gradient background */}
        <div className={`absolute inset-0 bg-gradient-to-b ${occasion.gradient} opacity-95`} />

        <div className="relative z-10 p-8 text-center">
          {/* Emoji */}
          <div className="text-6xl mb-4 animate-bounce">{occasion.emoji}</div>

          <h2 className="text-2xl font-black text-white mb-3"
            style={{ fontFamily: "'Playfair Display', serif", textShadow: `0 0 20px ${occasion.color}` }}>
            {occasion.label}
          </h2>

          <p className="text-white/85 mb-2 text-base">{occasion.msg}</p>
          <p className="text-sm font-semibold mb-6" style={{ color: occasion.color }}>{occasion.sub}</p>

          {user && (
            <p className="text-white/60 text-sm mb-5">
              🎂 Special wishes for you, <span className="text-white font-semibold">{user.name.split(' ')[0]}</span>!
            </p>
          )}

          <div className="flex gap-3 justify-center">
            <a href="tel:+919876543210"
              className="px-6 py-3 rounded-full font-semibold text-sm text-white"
              style={{ background: occasion.color }}>
              Order Special Cake 🎂
            </a>
            <button onClick={handleClose}
              className="glass px-5 py-3 rounded-full text-white/70 hover:text-white text-sm transition-all">
              Maybe Later
            </button>
          </div>

          <button onClick={handleClose}
            className="absolute top-4 right-4 glass w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white text-sm transition-all">
            ✕
          </button>
        </div>
      </div>
    </div>
  )
}
