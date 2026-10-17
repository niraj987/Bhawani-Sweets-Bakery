import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import toast from 'react-hot-toast'
import { Sparkles, MessageCircle, X, Heart, Gift, ChevronDown, Check, ArrowRight } from 'lucide-react'

const CUTE_SPEECHES = [
  { text: '✨ Custom writing on any cake is 100% FREE! Type your message on the main page! ✍️', action: 'studio' },
  { text: '🎂 Fresh cakes starting from ₹300 up to ₹2,000 based on weight & design! 🐻', action: 'menu' },
  { text: '🎨 Have a custom cake design idea in mind? Let our pastry artists bake it! 🍰', action: 'studio' },
  { text: '🎁 Secret gift for you! Click me to unlock 10% OFF coupon code! 💝', action: 'coupon' },
  { text: '🥛 Fresh Sudha Milk & pure ghee sweets baked daily with love! 💖', action: 'about' },
]

export default function FloatingTeddyBear() {
  const [speechIdx, setSpeechIdx] = useState(0)
  const [showSpeech, setShowSpeech] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [isWaving, setIsWaving] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [copied, setCopied] = useState(false)
  const [hearts, setHearts] = useState([])
  const bearRef = useRef(null)
  const speechRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  // Cycle through speech tips
  useEffect(() => {
    const interval = setInterval(() => {
      setShowSpeech(false)
      setTimeout(() => {
        setSpeechIdx(prev => (prev + 1) % CUTE_SPEECHES.length)
        setShowSpeech(true)
      }, 500)
    }, 9000)
    return () => clearInterval(interval)
  }, [])

  // Floating bob animation with GSAP
  useEffect(() => {
    if (!bearRef.current) return
    const floatAnim = gsap.to(bearRef.current, {
      y: -14,
      rotation: 3,
      duration: 2.2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
    return () => floatAnim.kill()
  }, [isMinimized])

  const triggerWiggle = () => {
    setIsWaving(true)
    // Spawn floating heart particles
    const newHearts = Array.from({ length: 5 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 60,
      y: -20 - Math.random() * 40,
      color: ['#f43f5e', '#ec4899', '#f59e0b', '#d4a853'][Math.floor(Math.random() * 4)]
    }))
    setHearts(prev => [...prev, ...newHearts])
    setTimeout(() => {
      setHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)))
    }, 1500)

    if (bearRef.current) {
      gsap.fromTo(bearRef.current,
        { scale: 0.9, rotation: -12 },
        { scale: 1.15, rotation: 12, duration: 0.18, repeat: 3, yoyo: true, ease: 'power1.inOut', onComplete: () => {
          gsap.to(bearRef.current, { scale: 1, rotation: 0, duration: 0.3 })
          setIsWaving(false)
        }}
      )
    }
  }

  const handleBearClick = () => {
    triggerWiggle()
    setModalOpen(true)
  }

  const handleCopyCoupon = () => {
    navigator.clipboard.writeText('TEDDY10')
    setCopied(true)
    toast.success('Coupon TEDDY10 copied! Enjoy 10% off your custom cake!', { icon: '🐻' })
    setTimeout(() => setCopied(false), 3000)
  }

  const goToStudio = () => {
    setModalOpen(false)
    if (location.pathname !== '/') {
      navigate('/#custom-cake-studio')
    } else {
      const el = document.getElementById('custom-cake-studio')
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const goToMenu = () => {
    setModalOpen(false)
    navigate('/menu')
  }

  return (
    <>
      {/* Floating Container Fixed at Bottom-Right */}
      <div
        id="floating-teddy-mascot"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end select-none pointer-events-auto scale-90 sm:scale-100 origin-bottom-right"
        style={{ filter: 'drop-shadow(0 12px 28px rgba(0,0,0,0.45))' }}
      >
        {/* Floating Heart Particles */}
        {hearts.map(h => (
          <div
            key={h.id}
            className="absolute pointer-events-none text-base animate-ping"
            style={{
              bottom: '100px',
              right: '40px',
              transform: `translate(${h.x}px, ${h.y}px)`,
              color: h.color,
              transition: 'all 1.2s ease-out'
            }}
          >
            💖
          </div>
        ))}

        {/* Speech Bubble */}
        {!isMinimized && showSpeech && !modalOpen && (
          <div
            ref={speechRef}
            onClick={handleBearClick}
            className="mb-2 max-w-[210px] sm:max-w-[240px] glass-dark border border-amber-400/30 rounded-2xl p-3 text-xs text-white/90 shadow-xl cursor-pointer hover:border-amber-400 transition-all duration-300 transform origin-bottom-right animate-in fade-in slide-in-from-bottom-2"
          >
            <div className="flex items-start justify-between gap-1.5 mb-1">
              <span className="font-bold text-[11px] text-amber-400 flex items-center gap-1">
                <span>🐻</span> Barnaby Bear says:
              </span>
              <button
                onClick={(e) => { e.stopPropagation(); setShowSpeech(false) }}
                className="text-white/40 hover:text-white"
              >
                <X size={12} />
              </button>
            </div>
            <p className="leading-snug text-white/80 text-[11px]">
              {CUTE_SPEECHES[speechIdx].text}
            </p>
            {/* Bubble arrow pointing down to teddy */}
            <div className="absolute -bottom-1.5 right-8 w-3 h-3 bg-[#1a0805] border-r border-b border-amber-400/30 rotate-45" />
          </div>
        )}

        {/* Minimized Pill */}
        {isMinimized ? (
          <button
            onClick={() => setIsMinimized(false)}
            className="glass-dark border border-amber-400/40 rounded-full px-4 py-2 flex items-center gap-2 text-xs font-semibold text-amber-400 hover:scale-105 transition-all shadow-xl"
            title="Open Teddy Mascot"
          >
            <span>🐻</span>
            <span>Hi from Teddy!</span>
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          </button>
        ) : (
          /* Hovering Bear Body */
          <div className="relative group cursor-pointer" onClick={handleBearClick}>
            {/* Minimize button */}
            <button
              onClick={(e) => { e.stopPropagation(); setIsMinimized(true) }}
              className="absolute -top-2 -left-2 z-10 w-5 h-5 rounded-full glass border border-white/20 text-white/60 hover:text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              title="Minimize Teddy"
            >
              <ChevronDown size={12} />
            </button>

            {/* Glowing aura */}
            <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl scale-75 group-hover:scale-110 transition-transform duration-500 pointer-events-none" />

            {/* Bear SVG Mascot */}
            <div
              ref={bearRef}
              className="relative transition-transform duration-300 group-hover:scale-110"
              title="Click me for sweet cake ideas & special discount!"
            >
              <svg width="88" height="96" viewBox="0 0 100 110" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Ears */}
                <circle cx="22" cy="22" r="14" fill="#c87941" />
                <circle cx="22" cy="22" r="8" fill="#f3be8a" />
                <circle cx="78" cy="22" r="14" fill="#c87941" />
                <circle cx="78" cy="22" r="8" fill="#f3be8a" />

                {/* Head */}
                <circle cx="50" cy="42" r="30" fill="#d9823f" />

                {/* Chef Hat */}
                <path d="M38 18 C38 10, 44 8, 50 8 C56 8, 62 10, 62 18 Z" fill="#ffffff" />
                <ellipse cx="43" cy="12" rx="7" ry="6" fill="#ffffff" />
                <ellipse cx="50" cy="9" rx="8" ry="7" fill="#ffffff" />
                <ellipse cx="57" cy="12" rx="7" ry="6" fill="#ffffff" />
                <rect x="37" y="16" width="26" height="5" rx="2" fill="#d4a853" />

                {/* Face Inner Muzzle */}
                <ellipse cx="50" cy="47" rx="16" ry="14" fill="#f5caa1" />

                {/* Eyes with twinkling catchlights */}
                <circle cx="39" cy="38" r="5" fill="#1f1105" />
                <circle cx="61" cy="38" r="5" fill="#1f1105" />
                <circle cx="41" cy="36" r="1.8" fill="#ffffff" />
                <circle cx="63" cy="36" r="1.8" fill="#ffffff" />
                <circle cx="38" cy="40" r="0.8" fill="#ffffff" />
                <circle cx="60" cy="40" r="0.8" fill="#ffffff" />

                {/* Cute Nose */}
                <ellipse cx="50" cy="45" rx="4.5" ry="3" fill="#6d2e0f" />

                {/* Happy Smile */}
                <path d="M44 50 Q50 56 56 50" stroke="#6d2e0f" strokeWidth="2.2" strokeLinecap="round" fill="none" />

                {/* Rosy Blushing Cheeks */}
                <ellipse cx="32" cy="48" rx="5.5" ry="4" fill="#fb7185" opacity="0.6" />
                <ellipse cx="68" cy="48" rx="5.5" ry="4" fill="#fb7185" opacity="0.6" />

                {/* Body */}
                <ellipse cx="50" cy="85" rx="23" ry="21" fill="#c87941" />
                {/* Belly */}
                <ellipse cx="50" cy="87" rx="14" ry="13" fill="#f3be8a" />

                {/* Cute Red/Gold Bow Tie */}
                <polygon points="41,68 50,64 59,68 50,72" fill="#e11d48" />
                <circle cx="50" cy="68" r="3" fill="#fbbf24" />

                {/* Arms holding a tiny delicious cupcake / birthday cake */}
                <ellipse cx="23" cy="78" rx="10" ry="7" fill="#c87941" transform="rotate(-25 23 78)" />
                <ellipse cx="77" cy="78" rx="10" ry="7" fill="#c87941" transform="rotate(25 77 78)" />

                {/* Mini Birthday Cake in Paws */}
                <rect x="42" y="77" width="16" height="12" rx="3" fill="#f43f5e" />
                <rect x="40" y="74" width="20" height="4" rx="2" fill="#fde047" />
                {/* Candle */}
                <line x1="50" y1="74" x2="50" y2="69" stroke="#ffffff" strokeWidth="1.5" />
                <ellipse cx="50" cy="67" rx="2" ry="3" fill="#f97316" />
                <ellipse cx="50" cy="66.5" rx="1" ry="1.5" fill="#fef08a" />
              </svg>

              {/* Tag below bear */}
              <div className="text-[10px] text-center font-bold text-amber-300 bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-full border border-amber-400/30 -mt-2">
                Click me! 🎂
              </div>
            </div>

            {/* Hover Shadow underneath */}
            <div className="w-16 h-3 bg-black/40 rounded-full blur-sm mx-auto mt-1 animate-pulse" />
          </div>
        )}
      </div>

      {/* Interactive Mascot Dialog Modal */}
      {modalOpen && (
        <div className="popup-overlay z-50 p-4" onClick={() => setModalOpen(false)}>
          <div
            className="glass-dark border border-amber-400/40 rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Header banner */}
            <div className="relative p-6 bg-gradient-to-r from-amber-950/80 via-rose-950/60 to-amber-900/80 border-b border-amber-400/20 text-center">
              <button
                onClick={() => setModalOpen(false)}
                className="absolute top-4 right-4 glass w-8 h-8 rounded-full flex items-center justify-center text-white/60 hover:text-white"
              >
                ✕
              </button>

              <div className="text-5xl mb-2 animate-bounce">🐻🎂</div>
              <h3 className="text-2xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                Barnaby's Sweet Bakery Corner
              </h3>
              <p className="text-xs text-amber-300 mt-1">
                Your friendly Bhawani Sweets & Bakery Mascot
              </p>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-4">
              {/* Sweet highlight card */}
              <div className="glass rounded-2xl p-4 border border-amber-400/25 bg-amber-500/10 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-amber-400/20 text-amber-400 flex-shrink-0">
                  <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Free Custom Writing On Cake!</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    Personalize your celebration with names, dates, or sweet wishes piped in fresh frosting. Just type it on our main page studio!
                  </p>
                </div>
              </div>

              {/* Price guarantee card */}
              <div className="glass rounded-2xl p-4 border border-rose-400/25 bg-rose-500/10 flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-rose-400/20 text-rose-400 flex-shrink-0">
                  <Gift size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white text-sm">Cakes From ₹300 To ₹2,000</h4>
                  <p className="text-xs text-white/70 mt-1 leading-relaxed">
                    From 1 lb cute Bento cakes (₹300 - ₹450) up to 5 lb grand royal tier masterpieces (up to ₹2,000), crafted for every budget and taste.
                  </p>
                </div>
              </div>

              {/* Secret Discount Coupon */}
              <div className="glass-dark rounded-2xl p-4 border border-dashed border-amber-400/60 text-center space-y-2">
                <div className="text-xs uppercase tracking-wider text-amber-300 font-semibold">
                  🎁 Mascot Secret Discount
                </div>
                <div className="flex items-center justify-center gap-3">
                  <span className="font-mono text-xl font-black text-white bg-white/10 px-4 py-1.5 rounded-xl border border-white/20 tracking-widest">
                    TEDDY10
                  </span>
                  <button
                    onClick={handleCopyCoupon}
                    className="btn-primary text-xs px-4 py-2 flex items-center gap-1.5 rounded-xl"
                  >
                    {copied ? <Check size={14} /> : <Gift size={14} />}
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </div>
                <p className="text-[11px] text-white/50">
                  Get flat 10% OFF on any custom designer cake order!
                </p>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 pt-2">
                <button
                  onClick={goToStudio}
                  className="btn-primary text-xs py-3 rounded-2xl flex items-center justify-center gap-1.5 shadow-lg"
                >
                  <span>🎨 Custom Studio</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={goToMenu}
                  className="glass text-xs py-3 rounded-2xl text-amber-300 hover:bg-white/10 flex items-center justify-center gap-1.5 font-semibold"
                >
                  <span>🎂 Cake Menu (₹300+)</span>
                </button>
              </div>

              <div className="text-center pt-1">
                <a
                  href="https://wa.me/919876543210?text=Hi%20Barnaby!%20I%20want%20to%20order%20a%20custom%20cake%20from%20Bhawani%20Sweets"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-green-400 hover:underline"
                >
                  <MessageCircle size={14} /> Order directly with our baker on WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
