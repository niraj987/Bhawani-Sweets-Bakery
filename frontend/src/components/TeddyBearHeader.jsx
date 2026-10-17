import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'

// ── Inline SVG Teddy Bear
function TeddyBearSVG({ size = 72 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Ears */}
      <circle cx="22" cy="22" r="14" fill="#c87941" />
      <circle cx="22" cy="22" r="8" fill="#e8a96a" />
      <circle cx="78" cy="22" r="14" fill="#c87941" />
      <circle cx="78" cy="22" r="8" fill="#e8a96a" />
      {/* Head */}
      <circle cx="50" cy="42" r="30" fill="#d4884a" />
      {/* Face inner */}
      <circle cx="50" cy="46" r="16" fill="#e8a96a" />
      {/* Eyes */}
      <circle cx="40" cy="38" r="5" fill="#1a0a00" />
      <circle cx="60" cy="38" r="5" fill="#1a0a00" />
      <circle cx="41.5" cy="36.5" r="1.5" fill="#fff" />
      <circle cx="61.5" cy="36.5" r="1.5" fill="#fff" />
      {/* Nose */}
      <ellipse cx="50" cy="47" rx="5" ry="3.5" fill="#7b3a1a" />
      {/* Smile */}
      <path d="M43 53 Q50 60 57 53" stroke="#7b3a1a" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      {/* Cheeks */}
      <circle cx="35" cy="50" r="6" fill="#e8718a" opacity="0.5" />
      <circle cx="65" cy="50" r="6" fill="#e8718a" opacity="0.5" />
      {/* Body */}
      <ellipse cx="50" cy="88" rx="22" ry="20" fill="#c87941" />
      {/* Belly */}
      <ellipse cx="50" cy="90" rx="13" ry="12" fill="#e8a96a" />
      {/* Arms */}
      <ellipse cx="22" cy="80" rx="10" ry="7" fill="#c87941" transform="rotate(-30 22 80)" />
      <ellipse cx="78" cy="80" rx="10" ry="7" fill="#c87941" transform="rotate(30 78 80)" />
      {/* Bow tie */}
      <polygon points="42,72 50,68 58,72 50,76" fill="#e8718a" />
      <circle cx="50" cy="72" r="3" fill="#c0496a" />
    </svg>
  )
}

const OCCASIONS = [
  { emoji: '🎂', label: 'Happy Birthday!', msg: 'May your day be as sweet as our cakes!', color: '#e8718a', bg: 'from-pink-900 to-rose-900' },
  { emoji: '💍', label: 'Happy Anniversary!', msg: 'Celebrating love, one slice at a time!', color: '#d4a853', bg: 'from-yellow-900 to-amber-900' },
  { emoji: '✨', label: 'Happy New Year!', msg: 'Sweet beginnings await you!', color: '#a78bfa', bg: 'from-purple-900 to-violet-900' },
  { emoji: '🪔', label: 'Happy Diwali!', msg: 'Light up your celebrations with sweetness!', color: '#fb923c', bg: 'from-orange-900 to-red-900' },
  { emoji: '🎄', label: 'Merry Christmas!', msg: 'Season\'s sweetest greetings!', color: '#4ade80', bg: 'from-green-900 to-emerald-900' },
  { emoji: '❤️', label: 'Happy Valentine\'s Day!', msg: 'Sweet love for your sweetest person!', color: '#f43f5e', bg: 'from-red-900 to-pink-900' },
]

export default function TeddyBearHeader() {
  const [showBubble, setShowBubble] = useState(false)
  const [occasion, setOccasion] = useState(null)
  const [hasGreeted, setHasGreeted] = useState(false)
  const bearRef = useRef(null)
  const bubbleRef = useRef(null)

  useEffect(() => {
    // Auto greet on first load after 2s
    const timer = setTimeout(() => {
      if (!hasGreeted) {
        const rand = OCCASIONS[Math.floor(Math.random() * OCCASIONS.length)]
        setOccasion(rand)
        setShowBubble(true)
        setHasGreeted(true)
        if (bubbleRef.current) {
          gsap.fromTo(bubbleRef.current,
            { scale: 0, opacity: 0, y: 20 },
            { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
          )
        }
        setTimeout(() => setShowBubble(false), 5000)
      }
    }, 2000)
    return () => clearTimeout(timer)
  }, [hasGreeted])

  const handleClick = () => {
    const rand = OCCASIONS[Math.floor(Math.random() * OCCASIONS.length)]
    setOccasion(rand)
    setShowBubble(true)
    if (bearRef.current) {
      gsap.to(bearRef.current, { rotation: 15, duration: 0.15, yoyo: true, repeat: 5, ease: 'power1.inOut' })
    }
    if (bubbleRef.current) {
      gsap.fromTo(bubbleRef.current,
        { scale: 0, opacity: 0, y: 20 },
        { scale: 1, opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }
    setTimeout(() => setShowBubble(false), 4500)
  }

  return (
    <div className="relative inline-flex items-start gap-2">
      {/* Speech bubble */}
      {showBubble && occasion && (
        <div
          ref={bubbleRef}
          className={`absolute bottom-full right-0 mb-3 glass rounded-2xl px-4 py-3 min-w-[200px] text-center`}
          style={{ border: `2px solid ${occasion.color}`, boxShadow: `0 0 20px ${occasion.color}66` }}
        >
          <div className="text-2xl mb-1">{occasion.emoji}</div>
          <div className="font-bold text-sm" style={{ color: occasion.color }}>{occasion.label}</div>
          <div className="text-xs text-white/75 mt-1">{occasion.msg}</div>
          {/* Arrow */}
          <div className="absolute -bottom-2 right-6 w-4 h-4 rotate-45"
            style={{ background: 'rgba(255,255,255,0.08)', borderRight: `2px solid ${occasion.color}`, borderBottom: `2px solid ${occasion.color}` }} />
        </div>
      )}

      {/* Bear */}
      <div
        ref={bearRef}
        className="bear-anim teddy-container select-none"
        onClick={handleClick}
        title="Click me for a surprise!"
        id="teddy-bear-header"
      >
        <TeddyBearSVG size={68} />
        <div className="text-[9px] text-center text-white/50 mt-0.5 font-medium">Click me! 🎉</div>
      </div>
    </div>
  )
}
