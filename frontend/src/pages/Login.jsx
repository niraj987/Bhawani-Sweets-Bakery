import { useState, useRef, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock } from 'lucide-react'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: '', password: '' })
  const formRef = useRef(null)
  const cakeRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { y: 60, opacity: 0, scale: 0.92 },
      { y: 0, opacity: 1, scale: 1, duration: 0.9, ease: 'back.out(1.5)' }
    )
    // Cake spin
    gsap.to(cakeRef.current, {
      rotation: 360,
      duration: 20,
      repeat: -1,
      ease: 'none',
    })
  }, [])

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email || !form.password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    try {
      const user = await login(form.email, form.password)
      toast.success(`Welcome back, ${user.name}! 🎂`, { duration: 3000 })
      // Confetti burst on login
      gsap.fromTo(formRef.current,
        { scale: 1 },
        { scale: 1.03, duration: 0.15, yoyo: true, repeat: 3, ease: 'power1.inOut',
          onComplete: () => navigate('/') }
      )
    } catch (err) {
      gsap.to(formRef.current, { x: -10, duration: 0.06, yoyo: true, repeat: 8, ease: 'power1.inOut' })
      toast.error(err.response?.data?.error || 'Invalid credentials')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen water-bg flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* BG blur */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <img src="/images/jason-leung-fXAuCMEYGY4-unsplash.jpg" alt=""
          className="w-full h-full object-cover" style={{ filter: 'blur(20px)' }} />
      </div>

      {/* Decorative circles */}
      <div className="fixed -top-32 -right-32 w-96 h-96 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #d4a853, transparent)' }} />
      <div className="fixed -bottom-32 -left-32 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #e8718a, transparent)' }} />

      <div className="relative z-10 w-full max-w-md">
        {/* Animated cake icon */}
        <div className="text-center mb-8">
          <div ref={cakeRef} className="inline-block text-6xl mb-3 select-none">🎂</div>
          <h1 className="section-title shimmer-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.2rem' }}>
            Welcome Back!
          </h1>
          <p className="text-[#73655D] text-sm mt-2 font-medium">Sign in to your Bhawani account</p>
        </div>

        <form ref={formRef} onSubmit={handleSubmit}
          className="glass-dark rounded-3xl p-8 space-y-5"
          style={{ border: '1px solid rgba(212,168,83,0.25)' }}>

          {/* Email */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/70 group-focus-within:text-amber-400 transition-colors z-10">
              <Mail size={16} />
            </div>
            <input id="login-email" name="email" type="email" placeholder="your@email.com"
              className="fancy-input pl-11" value={form.email} onChange={handleChange} required />
          </div>

          {/* Password */}
          <div className="relative group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/70 group-focus-within:text-amber-400 transition-colors z-10">
              <Lock size={16} />
            </div>
            <input id="login-password" name="password" type={showPass ? 'text' : 'password'}
              placeholder="Your password" className="fancy-input pl-11 pr-12"
              value={form.password} onChange={handleChange} required />
            <button type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              onClick={() => setShowPass(!showPass)}>
              {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>

          <div className="flex justify-end">
            <button type="button" className="text-xs text-amber-400/70 hover:text-amber-400 transition-colors">
              Forgot password?
            </button>
          </div>

          <button type="submit" id="login-submit-btn"
            className="btn-primary w-full py-3.5 text-base" disabled={loading}>
            {loading ? '🎂 Signing in...' : 'Sign In 🎉'}
          </button>

          <div className="text-center text-sm text-white/50 pt-2">
            New to Bhawani?{' '}
            <Link to="/signup" className="text-amber-400 hover:text-amber-300 font-medium">
              Create account
            </Link>
          </div>
        </form>

        {/* Demo creds hint */}
        <div className="mt-4 glass rounded-2xl p-4 text-center text-xs text-[#73655D]">
          <span className="text-[#A87828] font-bold">Demo:</span> test@bhawani.com / password123
        </div>
      </div>
    </div>
  )
}
