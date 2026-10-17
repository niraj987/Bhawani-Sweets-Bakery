import { useRef, useCallback } from 'react'

// Water ripple effect on tile click/hover
function addRipple(e, el) {
  const rect = el.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const size = Math.max(rect.width, rect.height) * 2
  const ripple = document.createElement('span')
  ripple.className = 'ripple-circle'
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${x - size/2}px;top:${y - size/2}px;`
  el.appendChild(ripple)
  setTimeout(() => ripple.remove(), 750)
}

export default function WaterTile({ children, className = '', onClick, style = {}, id }) {
  const ref = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width * 100).toFixed(1)
    const y = ((e.clientY - rect.top) / rect.height * 100).toFixed(1)
    ref.current.style.setProperty('--mx', `${x}%`)
    ref.current.style.setProperty('--my', `${y}%`)
  }, [])

  const handleClick = useCallback((e) => {
    if (ref.current) addRipple(e, ref.current)
    if (onClick) onClick(e)
  }, [onClick])

  return (
    <div
      id={id}
      ref={ref}
      className={`water-tile ${className}`}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
      style={style}
    >
      {children}
    </div>
  )
}
