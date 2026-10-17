import { useState, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { Eye, EyeOff, Mail, Lock, User, Calendar, Phone, Cake } from 'lucide-react'

function FloatingLabel({ label, icon, children }) {
  return (
    <div className="relative group">
      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-amber-400/70 group-focus-within:text-amber-400 transition-colors z-10">
        {icon}
      </div>
      <div className="pl-11">{children}</div>
    </div>
  )
}

export default function Signup() {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [step, setStep] = useState(1)
  const formRef = useRef(null)
  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', birthday: '', anniversary: ''
  })

  useEffect(() => {
    gsap.fromTo(formRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.5)' }
    )
  }, [])

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleNext = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.phone) {
      toast.error('Please fill all required fields')
      return
    }
    gsap.to(formRef.current, {
      x: -30, opacity: 0, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        setStep(2)
        gsap.fromTo(formRef.current, { x: 30, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power2.out' })
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.password || form.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }
    setLoading(true)
    try {
      const user = await signup(form)
      toast.success(`Welcome, ${user.name}! 🎂`, { duration: 3000 })
      navigate('/')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Signup failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen water-bg flex items-center justify-center px-6 py-24">
      {/* Background cake images blur */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <img src="/images/annie-spratt-_4iLsr5p-dY-unsplash.jpg" alt=""
          className="w-full h-full object-cover" style={{ filter: 'blur(20px)' }} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🎂</div>
          <h1 className="section-title shimmer-text" style={{ fontFamily: "'Playfair Display', serif", fontSize: '2rem' }}>
            Join Bhawani Family
          </h1>
          <p className="text-[#73655D] text-sm mt-2 font-medium">Create your account for exclusive offers &amp; surprises</p>
        </div>

        {/* Step indicator */}
        <div className="flex items-center gap-3 mb-8 justify-center">
          {[1, 2].map(s => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-500 ${
                step >= s ? 'bg-gradient-to-br from-amber-400 to-rose-500 text-white' : 'glass text-[#5C4D42]'
              }`}>{s}</div>
              {s === 1 && <div className={`h-0.5 w-12 transition-all duration-500 ${step >= 2 ? 'bg-[#C5943B]' : 'bg-[#D5C2B0]'}`} />}
            </div>
          ))}
        </div>

        <form ref={formRef} onSubmit={step === 1 ? handleNext : handleSubmit}
          className="glass-dark rounded-3xl p-8 space-y-5"
          style={{ border: '1px solid rgba(212,168,83,0.25)' }}>

          {step === 1 ? (
            <>
              <h2 className="text-lg font-semibold text-amber-400 mb-4">Personal Details</h2>

              <FloatingLabel label="Full Name" icon={<User size={16} />}>
                <input id="signup-name" name="name" type="text" placeholder="Your full name"
                  className="fancy-input" value={form.name} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel label="Email" icon={<Mail size={16} />}>
                <input id="signup-email" name="email" type="email" placeholder="your@email.com"
                  className="fancy-input" value={form.email} onChange={handleChange} required />
              </FloatingLabel>

              <FloatingLabel label="Phone" icon={<Phone size={16} />}>
                <input id="signup-phone" name="phone" type="tel" placeholder="+91 98765 43210"
                  className="fancy-input" value={form.phone} onChange={handleChange} required />
              </FloatingLabel>

              <button type="submit" className="btn-primary w-full py-3.5 mt-2">
                Continue →
              </button>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold text-amber-400 mb-4">Account & Occasions 🎉</h2>

              <FloatingLabel label="Password" icon={<Lock size={16} />}>
                <div className="relative">
                  <input id="signup-password" name="password" type={showPass ? 'text' : 'password'}
                    placeholder="Min 6 characters" className="fancy-input pr-12"
                    value={form.password} onChange={handleChange} required />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                    onClick={() => setShowPass(!showPass)}>
                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </FloatingLabel>

              <FloatingLabel label="Birthday" icon={<Cake size={16} />}>
                <input id="signup-birthday" name="birthday" type="date" className="fancy-input"
                  value={form.birthday} onChange={handleChange}
                  title="We'll surprise you on your birthday! 🎂" />
              </FloatingLabel>
              <p className="text-xs text-amber-400/70 -mt-3 ml-2">🎂 We'll send you a birthday surprise!</p>

              <FloatingLabel label="Anniversary" icon={<Calendar size={16} />}>
                <input id="signup-anniversary" name="anniversary" type="date" className="fancy-input"
                  value={form.anniversary} onChange={handleChange}
                  title="We'll celebrate your anniversary! 💍" />
              </FloatingLabel>
              <p className="text-xs text-rose-400/70 -mt-3 ml-2">💍 Get special anniversary offers!</p>

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={() => setStep(1)}
                  className="glass flex-1 py-3.5 rounded-full text-white/70 hover:text-white transition-all">
                  ← Back
                </button>
                <button type="submit" id="signup-submit-btn"
                  className="btn-primary flex-1 py-3.5" disabled={loading}>
                  {loading ? '🎂 Creating...' : 'Create Account 🎉'}
                </button>
              </div>
            </>
          )}

          <div className="text-center text-sm text-white/50 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-400 hover:text-amber-300 font-medium">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
