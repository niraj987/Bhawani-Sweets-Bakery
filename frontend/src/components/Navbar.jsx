import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import gsap from 'gsap'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import CartSidebar from './CartSidebar'
import { ShoppingBag, User, LogOut, Menu, X, Sparkles } from 'lucide-react'

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/menu', label: 'Cakes & Sweets' },
  { to: '/gallery', label: 'Gallery' },
  { to: '/store-guide', label: 'Store & Guide' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const { user, logout } = useAuth()
  const { count } = useCart()
  const location = useLocation()
  const navRef = useRef(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    gsap.fromTo(navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Bounce cart badge when count changes
  const badgeRef = useRef(null)
  useEffect(() => {
    if (count > 0 && badgeRef.current) {
      gsap.fromTo(badgeRef.current, { scale: 1.5 }, { scale: 1, duration: 0.35, ease: 'back.out(2)' })
    }
  }, [count])

  return (
    <>
      <nav
        ref={navRef}
        id="main-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#E8DFD5]/80 py-3.5 shadow-sm'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="w-full max-w-[1600px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group" id="nav-logo">
            <div className="text-3xl select-none group-hover:scale-110 transition-transform duration-300">🎂</div>
            <div>
              <div
                className="font-bold text-xl sm:text-2xl leading-tight text-[#2C221E] group-hover:text-[#A87828] transition-colors"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Bhawani Sweets
              </div>
              <div className="text-[10px] text-[#73655D] tracking-widest uppercase font-semibold">
                &amp; Artisan Bakery · Sudha Milk · Sattu
              </div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-10">
            {LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                className={`nav-link text-sm font-semibold transition-colors relative py-1 ${
                  location.pathname === l.to
                    ? 'text-[#A87828] font-bold after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-gradient-to-r after:from-[#C5943B] after:to-[#D8827B] after:rounded-full'
                    : 'text-[#4A3D34] hover:text-[#A87828]'
                }`}
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Cart button */}
            <button
              id="cart-toggle-btn"
              onClick={() => setCartOpen(true)}
              className="relative bg-white/60 backdrop-blur-md p-2.5 rounded-full text-[#4A3D34] hover:text-[#C5943B] hover:bg-white transition-all border border-[#D5C2B0]/80 shadow-xs hover:shadow-sm"
              title="View Cart"
            >
              <ShoppingBag size={18} />
              {count > 0 && (
                <span
                  ref={badgeRef}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #C5943B, #CB766F)' }}
                >
                  {count}
                </span>
              )}
            </button>

            {/* Aesthetic Login / User Profile Capsule */}
            {user ? (
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2.5 bg-white/60 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-[#D5C2B0]/80 shadow-xs">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#C5943B] to-[#CB766F] text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                    {user.name ? user.name[0].toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold text-[#2C221E] hidden sm:inline">{user.name.split(' ')[0]}</span>
                </div>
                <button
                  id="logout-btn"
                  onClick={logout}
                  className="p-2 rounded-full text-[#73655D] hover:text-red-500 hover:bg-white/80 transition-all border border-[#D5C2B0]/60 shadow-xs"
                  title="Logout"
                >
                  <LogOut size={15} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2.5">
                <Link
                  to="/login"
                  id="nav-login-btn"
                  className="group relative flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/60 backdrop-blur-md border border-[#D5C2B0]/80 hover:border-[#C5943B] transition-all shadow-xs hover:shadow-md"
                  title="Sign in to your account"
                >
                  <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C5943B] via-[#D8827B] to-[#E5B562] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <User size={14} className="stroke-[2.5]" />
                  </div>
                  <span className="text-xs font-bold text-[#3B2C24] pr-1">Sign In</span>
                </Link>
                <Link
                  to="/signup"
                  id="nav-signup-btn"
                  className="hidden sm:inline-flex btn-primary text-xs px-4 py-2 rounded-full font-bold shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}

            {/* Mobile hamburger */}
            <button
              className="md:hidden bg-white/60 backdrop-blur-md p-2 rounded-full border border-[#D5C2B0]/80 shadow-xs"
              onClick={() => setMobileOpen(!mobileOpen)}
              id="mobile-menu-btn"
            >
              {mobileOpen ? <X size={20} className="text-[#2C221E]" /> : <Menu size={20} className="text-[#2C221E]" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-xl border border-[#E8DFD5] mt-3 mx-4 rounded-2xl p-4 flex flex-col gap-2 shadow-xl animate-in fade-in slide-in-from-top-2">
            {LINKS.map(l => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setMobileOpen(false)}
                className={`text-sm py-2 px-3 rounded-xl transition-all font-semibold ${
                  location.pathname === l.to ? 'text-[#C5943B] bg-[#FAF4E8]' : 'text-[#4A3D34] hover:bg-[#FAF6F0]'
                }`}
              >
                {l.label}
              </Link>
            ))}

            <div className="pt-2 mt-1 border-t border-[#E8DFD5] flex flex-col gap-2">
              {user ? (
                <div className="flex items-center justify-between p-2 bg-[#FAF4E8] rounded-xl">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#C5943B] to-[#CB766F] text-white flex items-center justify-center text-xs font-bold">
                      {user.name ? user.name[0].toUpperCase() : 'U'}
                    </div>
                    <span className="text-xs font-bold text-[#2C221E]">{user.name}</span>
                  </div>
                  <button
                    onClick={() => { logout(); setMobileOpen(false) }}
                    className="text-xs text-red-600 font-bold px-2 py-1 rounded-lg hover:bg-white transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className="text-center py-2 px-3 rounded-xl text-xs font-bold border border-[#D5C2B0] text-[#2C221E] hover:bg-[#FAF6F0]"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    onClick={() => setMobileOpen(false)}
                    className="btn-primary text-center py-2 px-3 rounded-xl text-xs font-bold"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>

      {/* Cart Sidebar */}
      <CartSidebar open={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  )
}
