import { useEffect, useState } from 'react'

export default function AmbientBackground() {
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 })

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Get percentage across viewport for smooth glow follow
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePos({ x, y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
      {/* 1. Base Subtle Warm Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#F9F5EC]" />

      {/* 2. Interactive Mouse Cursor Glow (Shows through 0.5 opacity glass) */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] opacity-40 transition-transform duration-700 ease-out pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(197, 148, 59, 0.45) 0%, rgba(203, 118, 111, 0.25) 50%, transparent 75%)',
          left: `${mousePos.x}%`,
          top: `${mousePos.y}%`,
          transform: 'translate(-50%, -50%)',
        }}
      />

      {/* 3. Floating Organic Ambient Blobs */}
      <div
        className="absolute top-10 left-10 w-[500px] h-[500px] rounded-full blur-[140px] opacity-35 animate-pulse"
        style={{
          background: 'radial-gradient(circle, #E8BC6E 0%, #D8827B 50%, transparent 70%)',
          animationDuration: '8s',
        }}
      />
      <div
        className="absolute bottom-20 right-10 w-[550px] h-[550px] rounded-full blur-[150px] opacity-30 animate-pulse"
        style={{
          background: 'radial-gradient(circle, #CB766F 0%, #C5943B 50%, transparent 70%)',
          animationDuration: '10s',
        }}
      />
      <div
        className="absolute top-1/2 left-1/3 w-[450px] h-[450px] rounded-full blur-[130px] opacity-25"
        style={{
          background: 'radial-gradient(circle, #758A73 0%, #E8BC6E 60%, transparent 75%)',
        }}
      />

      {/* 4. Elegant Ambient Floating Sparkles / Particles */}
      <div className="ambient-sparkles">
        {Array.from({ length: 14 }).map((_, i) => (
          <div
            key={i}
            className="ambient-sparkle-dot"
            style={{
              left: `${(i * 7.5 + 4) % 100}%`,
              animationDelay: `${i * 0.9}s`,
              animationDuration: `${12 + (i % 6) * 3}s`,
              width: `${4 + (i % 3) * 3}px`,
              height: `${4 + (i % 3) * 3}px`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
