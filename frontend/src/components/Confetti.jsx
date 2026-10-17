import { useEffect, useState } from 'react'

const COLORS = ['#d4a853','#e8718a','#a78bfa','#4ade80','#fb923c','#f43f5e','#60a5fa','#fde68a']

function randomBetween(min, max) { return Math.random() * (max - min) + min }

export default function Confetti({ active, count = 80 }) {
  const [pieces, setPieces] = useState([])

  useEffect(() => {
    if (!active) { setPieces([]); return }
    const arr = Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${randomBetween(0, 100)}%`,
      width: `${randomBetween(6, 14)}px`,
      height: `${randomBetween(10, 20)}px`,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      duration: `${randomBetween(1.8, 3.5)}s`,
      delay: `${randomBetween(0, 1.2)}s`,
    }))
    setPieces(arr)
    const t = setTimeout(() => setPieces([]), 4000)
    return () => clearTimeout(t)
  }, [active, count])

  return (
    <>
      {pieces.map(p => (
        <div
          key={p.id}
          className="confetti-piece"
          style={{
            left: p.left,
            width: p.width,
            height: p.height,
            background: p.color,
            animationDuration: p.duration,
            animationDelay: p.delay,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
          }}
        />
      ))}
    </>
  )
}
