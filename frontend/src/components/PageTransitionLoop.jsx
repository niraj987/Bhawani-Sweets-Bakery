import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransitionLoop() {
  const [loading, setLoading] = useState(true)
  const location = useLocation()

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setLoading(false)
    }, 450)
    return () => clearTimeout(timer)
  }, [location.pathname])

  if (!loading) return null

  return (
    <div
      id="css3-infinite-loop-loader"
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#FAF8F5]/90 backdrop-blur-md transition-opacity duration-300 pointer-events-none"
    >
      <div className="relative flex flex-col items-center">
        {/* CSS3 Infinite Loop Graphic */}
        <div className="css3-infinite-loop-container">
          <div className="css3-loop-track" />
          <div className="css3-loop-orb" />
          <div className="css3-loop-orb-two" />
          <div className="css3-loop-center-icon">🎂</div>
        </div>

        {/* Brand Text */}
        <div className="mt-5 text-center">
          <div
            className="text-lg font-bold text-[#2C221E] tracking-wide"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Bhawani Sweets &amp; Bakery
          </div>
          <div className="text-xs uppercase tracking-widest text-[#8C7A6B] mt-0.5">
            Calm · Fresh · Handcrafted
          </div>
        </div>
      </div>
    </div>
  )
}
