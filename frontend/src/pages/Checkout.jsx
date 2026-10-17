import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import WaterTile from '../components/WaterTile'
import Confetti from '../components/Confetti'
import toast from 'react-hot-toast'
import {
  MapPin, Phone, User, CreditCard, Smartphone, Wallet,
  CheckCircle, ChevronRight, ChevronLeft, Package, Star, Edit3
} from 'lucide-react'

const STEPS = ['Cart Review', 'Delivery', 'Payment', 'Confirmed']

const PAYMENT_METHODS = [
  { id: 'upi', label: 'UPI / QR Code', icon: '📱', sub: 'Pay via PhonePe, GPay, Paytm' },
  { id: 'card', label: 'Debit / Credit Card', icon: '💳', sub: 'Visa, Mastercard, RuPay' },
  { id: 'netbanking', label: 'Net Banking', icon: '🏦', sub: 'All major banks supported' },
  { id: 'cod', label: 'Cash on Delivery', icon: '💵', sub: 'Pay when your cake arrives' },
  { id: 'wallet', label: 'Wallet', icon: '👛', sub: 'Paytm, Amazon Pay, etc.' },
]

const UPI_APPS = [
  { name: 'PhonePe', emoji: '🟣', color: '#6739B7' },
  { name: 'Google Pay', emoji: '🟢', color: '#1A73E8' },
  { name: 'Paytm', emoji: '🔵', color: '#00BAF2' },
  { name: 'BHIM', emoji: '🇮🇳', color: '#138808' },
]

export default function Checkout() {
  const { items, total, deliveryFee: fee, clearCart } = useCart()
  const deliveryFee = total > 500 ? 0 : 49
  const grandTotal = total + deliveryFee
  const { user } = useAuth()
  const navigate = useNavigate()

  const [step, setStep] = useState(0)
  const [confetti, setConfetti] = useState(false)
  const [orderId] = useState(() => 'BSB' + Date.now().toString().slice(-6))
  const stepRef = useRef(null)

  const [delivery, setDelivery] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: '',
    city: 'Patna',
    pincode: '',
    note: '',
    slot: 'ASAP (2-3 hrs)',
  })

  const [payment, setPayment] = useState({ method: 'upi', upiApp: 'PhonePe', upiId: '', cardNo: '', cardExp: '', cardCvv: '', cardName: '' })
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    if (items.length === 0 && step === 0) navigate('/menu')
  }, [items, step, navigate])

  const animateStep = (dir, cb) => {
    if (!stepRef.current) { cb(); return }
    gsap.to(stepRef.current, {
      x: dir * -40, opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => {
        cb()
        gsap.fromTo(stepRef.current, { x: dir * 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.35, ease: 'power3.out' })
      }
    })
  }

  const goNext = () => {
    if (step === 1) {
      if (!delivery.name || !delivery.phone || !delivery.address || !delivery.pincode) {
        toast.error('Please fill all delivery details')
        return
      }
    }
    if (step === 2) {
      handlePayment()
      return
    }
    animateStep(1, () => setStep(s => s + 1))
  }

  const goBack = () => animateStep(-1, () => setStep(s => s - 1))

  const handlePayment = async () => {
    if (payment.method === 'upi' && !payment.upiId && !payment.upiApp) {
      toast.error('Please select UPI app or enter UPI ID')
      return
    }
    if (payment.method === 'card' && (!payment.cardNo || !payment.cardExp || !payment.cardCvv || !payment.cardName)) {
      toast.error('Please fill all card details')
      return
    }

    setProcessing(true)
    // Simulate payment processing
    await new Promise(r => setTimeout(r, 2500))
    setProcessing(false)
    setConfetti(true)
    clearCart()
    animateStep(1, () => setStep(3))
    setTimeout(() => setConfetti(false), 5000)
  }

  // ── Step components ──────────────────────────────────────────

  const StepCartReview = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#2C221E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Review Your Order
      </h2>
      {items.map(item => {
        const itemKey = item.cartKey || item.id
        return (
          <div key={itemKey} className="bg-[#FAF8F5] border border-[#E8DFD5] rounded-2xl p-4 flex gap-4 items-center">
            <img src={item.img} alt={item.name}
              className="w-16 h-16 rounded-xl object-cover flex-shrink-0 border border-[#E0D5C7]"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=100&q=60' }} />
            <div className="flex-1 min-w-0">
              <h4 className="text-[#2C221E] font-bold text-sm truncate">{item.name}</h4>
              <p className="text-[#73655D] text-xs">{item.weight || '1 Pound'} × {item.qty} {item.flavor ? `• ${item.flavor}` : ''}</p>
              {item.customWriting && (
                <p className="text-[#A87828] text-xs italic mt-0.5 font-medium">✍️ Custom message: "{item.customWriting}"</p>
              )}
            </div>
            <span className="text-[#A87828] font-bold">₹{(item.price * item.qty).toLocaleString()}</span>
          </div>
        )
      })}

      {/* Order summary */}
      <div className="bg-[#FAF8F5] border border-[#E0D5C7] rounded-2xl p-5 space-y-3 mt-4">
        <div className="flex justify-between text-sm text-[#73655D]"><span>Subtotal</span><span className="font-semibold text-[#2C221E]">₹{total.toLocaleString()}</span></div>
        <div className="flex justify-between text-sm"><span className={deliveryFee === 0 ? 'text-emerald-700 font-medium' : 'text-[#73655D]'}>Delivery</span>
          <span className={deliveryFee === 0 ? 'text-emerald-700 font-bold' : 'text-[#2C221E] font-medium'}>{deliveryFee === 0 ? 'FREE' : `₹${deliveryFee}`}</span>
        </div>
        <div className="border-t border-[#E8DFD5] pt-3 flex justify-between font-bold text-base">
          <span className="text-[#2C221E]">Grand Total</span>
          <span className="text-[#A87828] text-xl font-black">₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>
    </div>
  )

  const StepDelivery = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#2C221E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Delivery Details
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <div className="col-span-2">
          <label className="text-xs text-[#5C4D42] font-semibold mb-1 block">Full Name *</label>
          <div className="relative">
            <User size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A87828]" />
            <input id="del-name" className="fancy-input pl-9" placeholder="Your name"
              value={delivery.name} onChange={e => setDelivery(d => ({ ...d, name: e.target.value }))} />
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-xs text-[#5C4D42] font-semibold mb-1 block">Phone Number *</label>
          <div className="relative">
            <Phone size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#A87828]" />
            <input id="del-phone" className="fancy-input pl-9" placeholder="+91 98765 43210" type="tel"
              value={delivery.phone} onChange={e => setDelivery(d => ({ ...d, phone: e.target.value }))} />
          </div>
        </div>

        <div className="col-span-2">
          <label className="text-xs text-[#5C4D42] font-semibold mb-1 block">Delivery Address *</label>
          <div className="relative">
            <MapPin size={14} className="absolute left-3.5 top-4 text-[#A87828]" />
            <textarea id="del-address" rows={2} className="fancy-input pl-9 resize-none" placeholder="House no, Street, Area"
              value={delivery.address} onChange={e => setDelivery(d => ({ ...d, address: e.target.value }))} />
          </div>
        </div>

        <div>
          <label className="text-xs text-[#5C4D42] font-semibold mb-1 block">City</label>
          <input id="del-city" className="fancy-input" value={delivery.city}
            onChange={e => setDelivery(d => ({ ...d, city: e.target.value }))} />
        </div>

        <div>
          <label className="text-xs text-[#5C4D42] font-semibold mb-1 block">Pincode *</label>
          <input id="del-pincode" className="fancy-input" placeholder="800001" maxLength={6}
            value={delivery.pincode} onChange={e => setDelivery(d => ({ ...d, pincode: e.target.value }))} />
        </div>
      </div>

      {/* Delivery slot */}
      <div>
        <label className="text-xs text-[#5C4D42] font-semibold mb-2 block">Delivery Slot</label>
        <div className="grid grid-cols-2 gap-2">
          {['ASAP (2-3 hrs)', 'Evening (5-8 PM)', 'Tomorrow Morning', 'Custom Date'].map(slot => (
            <button key={slot} id={`slot-${slot}`}
              type="button"
              onClick={() => setDelivery(d => ({ ...d, slot }))}
              className={`py-2.5 px-3 rounded-xl text-xs font-semibold transition-all border ${
                delivery.slot === slot ? 'btn-primary text-white border-transparent' : 'bg-[#FAF8F5] border-[#E0D5C7] text-[#5C4D42] hover:bg-white'
              }`}>
              {slot}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="text-xs text-[#5C4D42] font-semibold mb-1 block">Special Instructions</label>
        <textarea id="del-note" rows={2} className="fancy-input resize-none"
          placeholder="Custom message, design preferences..."
          value={delivery.note} onChange={e => setDelivery(d => ({ ...d, note: e.target.value }))} />
      </div>
    </div>
  )

  const StepPayment = () => (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[#2C221E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
        Choose Payment
      </h2>

      {/* Payment method list */}
      <div className="space-y-2">
        {PAYMENT_METHODS.map(m => (
          <button key={m.id} id={`pay-${m.id}`}
            type="button"
            onClick={() => setPayment(p => ({ ...p, method: m.id }))}
            className={`w-full flex items-center gap-4 p-4 rounded-2xl text-left transition-all border ${
              payment.method === m.id
                ? 'border-2 border-[#C5943B] bg-[#FAF4E8]'
                : 'bg-[#FAF8F5] border-[#E8DFD5] hover:bg-white'
            }`}>
            <div className="text-2xl">{m.icon}</div>
            <div className="flex-1">
              <div className="font-bold text-[#2C221E] text-sm">{m.label}</div>
              <div className="text-xs text-[#73655D]">{m.sub}</div>
            </div>
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
              payment.method === m.id ? 'border-[#C5943B] bg-[#C5943B]' : 'border-[#C5943B]/40'
            }`}>
              {payment.method === m.id && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </button>
        ))}
      </div>

      {/* UPI options */}
      {payment.method === 'upi' && (
        <div className="bg-[#FAF8F5] border border-[#E0D5C7] rounded-2xl p-4 space-y-3">
          <p className="text-xs text-[#73655D] font-bold">Select App:</p>
          <div className="grid grid-cols-4 gap-2">
            {UPI_APPS.map(app => (
              <button key={app.name}
                type="button"
                onClick={() => setPayment(p => ({ ...p, upiApp: app.name }))}
                className={`p-2.5 rounded-xl text-center text-xs transition-all border ${
                  payment.upiApp === app.name ? 'border-[#C5943B] bg-[#FAF4E8] font-bold' : 'bg-white border-[#E0D5C7]'
                }`}>
                <div className="text-xl mb-1">{app.emoji}</div>
                <div className="text-[#2C221E] text-[10px] font-semibold">{app.name}</div>
              </button>
            ))}
          </div>
          <p className="text-xs text-[#73655D] font-medium">Or enter UPI ID:</p>
          <input id="upi-id" className="fancy-input text-sm" placeholder="yourname@upi"
            value={payment.upiId} onChange={e => setPayment(p => ({ ...p, upiId: e.target.value }))} />
        </div>
      )}

      {/* Card details */}
      {payment.method === 'card' && (
        <div className="bg-[#FAF8F5] border border-[#E0D5C7] rounded-2xl p-4 space-y-3">
          <input id="card-name" className="fancy-input" placeholder="Cardholder Name"
            value={payment.cardName} onChange={e => setPayment(p => ({ ...p, cardName: e.target.value }))} />
          <input id="card-no" className="fancy-input" placeholder="Card Number"
            maxLength={19} value={payment.cardNo}
            onChange={e => setPayment(p => ({ ...p, cardNo: e.target.value.replace(/\D/g,'').replace(/(.{4})/g,'$1 ').trim() }))} />
          <div className="grid grid-cols-2 gap-3">
            <input id="card-exp" className="fancy-input" placeholder="MM/YY"
              maxLength={5} value={payment.cardExp}
              onChange={e => setPayment(p => ({ ...p, cardExp: e.target.value }))} />
            <input id="card-cvv" className="fancy-input" placeholder="CVV" type="password"
              maxLength={3} value={payment.cardCvv}
              onChange={e => setPayment(p => ({ ...p, cardCvv: e.target.value }))} />
          </div>
          {/* Card visual */}
          <div className="rounded-2xl p-4 mt-2 relative overflow-hidden shadow-md"
            style={{ background: 'linear-gradient(135deg, #C5943B, #CB766F)', minHeight: 90 }}>
            <div className="text-white/80 text-xs mb-2 font-bold">BHAWANI SWEETS & BAKERY CARD</div>
            <div className="text-white font-mono tracking-widest text-sm font-bold">
              {payment.cardNo || '•••• •••• •••• ••••'}
            </div>
            <div className="flex justify-between mt-3 font-medium">
              <div className="text-white/90 text-xs">{payment.cardName || 'YOUR NAME'}</div>
              <div className="text-white/90 text-xs">{payment.cardExp || 'MM/YY'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Net banking */}
      {payment.method === 'netbanking' && (
        <div className="bg-[#FAF8F5] border border-[#E0D5C7] rounded-2xl p-4">
          <select className="fancy-input appearance-none bg-white">
            {['Select Your Bank', 'State Bank of India', 'HDFC Bank', 'ICICI Bank', 'Axis Bank', 'Punjab National Bank', 'Bank of Baroda', 'Canara Bank', 'Union Bank'].map(b => (
              <option key={b}>{b}</option>
            ))}
          </select>
        </div>
      )}

      {/* COD info */}
      {payment.method === 'cod' && (
        <div className="rounded-2xl p-4 border border-emerald-300 bg-emerald-50 text-emerald-800 text-sm font-semibold">
          ✅ You'll pay <strong>₹{grandTotal.toLocaleString()}</strong> in cash when your fresh cake arrives.
        </div>
      )}

      {/* Amount to pay */}
      <div className="bg-[#FAF8F5] border border-[#E0D5C7] rounded-2xl p-4 flex justify-between items-center">
        <span className="text-[#73655D] text-sm font-medium">Total to Pay</span>
        <span className="text-[#A87828] font-black text-2xl">₹{grandTotal.toLocaleString()}</span>
      </div>
    </div>
  )

  const StepConfirmed = () => (
    <div className="text-center py-8">
      <div className="text-7xl mb-4 animate-bounce">🎂</div>
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-emerald-100 border-2 border-emerald-500 flex items-center justify-center">
        <CheckCircle size={40} className="text-emerald-600" />
      </div>
      <h2 className="text-2xl font-black text-[#2C221E] mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
        Order Placed! 🎉
      </h2>
      <p className="text-[#73655D] mb-1 text-sm">Your order ID is</p>
      <p className="text-[#A87828] font-mono text-2xl font-black mb-4">#{orderId}</p>
      <p className="text-[#73655D] text-sm mb-6 max-w-xs mx-auto">
        Your delicious cake is being handcrafted with love. Estimated delivery: <strong className="text-[#2C221E]">{delivery.slot}</strong>
      </p>
      <div className="bg-[#FAF8F5] border border-[#E0D5C7] rounded-2xl p-4 text-left space-y-2 mb-6 text-xs sm:text-sm">
        <div className="flex justify-between"><span className="text-[#73655D]">Delivery to</span><span className="text-[#2C221E] font-bold">{delivery.name}</span></div>
        <div className="flex justify-between"><span className="text-[#73655D]">Address</span><span className="text-[#2C221E] text-right max-w-[200px]">{delivery.address}, {delivery.city}</span></div>
        <div className="flex justify-between"><span className="text-[#73655D]">Payment</span><span className="text-emerald-700 font-bold">
          {PAYMENT_METHODS.find(m => m.id === payment.method)?.label}
        </span></div>
        <div className="flex justify-between font-bold pt-1 border-t border-[#E8DFD5]">
          <span className="text-[#2C221E]">Total Paid</span>
          <span className="text-[#A87828] text-base font-black">₹{grandTotal.toLocaleString()}</span>
        </div>
      </div>
      <div className="flex gap-3">
        <button onClick={() => navigate('/menu')} className="flex-1 bg-white border border-[#D5C2B0] py-3 rounded-full text-[#4A3D34] hover:bg-[#FAF4E8] transition-all text-sm font-bold shadow-xs">
          Order More 🎂
        </button>
        <button onClick={() => navigate('/')} className="flex-1 btn-primary py-3">
          Go Home
        </button>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen water-bg pt-24 pb-20 px-4">
      <Confetti active={confetti} count={120} />
      <div className="max-w-2xl mx-auto">

        {/* Step indicator */}
        {step < 3 && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {STEPS.slice(0, 3).map((s, i) => (
              <div key={s} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-400 ${
                  step >= i ? 'bg-gradient-to-br from-[#C5943B] to-[#CB766F] text-white shadow-sm' : 'bg-white border border-[#D5C2B0] text-[#8A7B70]'
                }`}>{i + 1}</div>
                <span className={`hidden sm:block text-xs font-bold transition-colors ${step === i ? 'text-[#A87828]' : 'text-[#8A7B70]'}`}>{s}</span>
                {i < 2 && <ChevronRight size={14} className="text-[#C5943B]/40" />}
              </div>
            ))}
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-3xl overflow-hidden border border-[#D5C2B0] shadow-xl">
          <div ref={stepRef} className="p-6 md:p-8">
            {step === 0 && <StepCartReview />}
            {step === 1 && <StepDelivery />}
            {step === 2 && <StepPayment />}
            {step === 3 && <StepConfirmed />}
          </div>

          {/* Nav buttons */}
          {step < 3 && (
            <div className="px-6 md:px-8 pb-6 flex gap-3">
              {step > 0 && (
                <button onClick={goBack} id="checkout-back-btn"
                  className="glass flex-shrink-0 px-5 py-3.5 rounded-full text-[#4A3D34] hover:text-[#2C221E] transition-all flex items-center gap-2 text-sm border border-[#D5C2B0]">
                  <ChevronLeft size={16} /> Back
                </button>
              )}
              <button
                onClick={goNext}
                id="checkout-next-btn"
                disabled={processing}
                className="btn-primary flex-1 py-3.5 text-base flex items-center justify-center gap-2"
              >
                {processing ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing Payment...
                  </>
                ) : step === 0 ? (
                  <>Confirm Order <ChevronRight size={18} /></>
                ) : step === 1 ? (
                  <>Choose Payment <ChevronRight size={18} /></>
                ) : (
                  <>🎂 Pay ₹{grandTotal.toLocaleString()}</>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Trust badges */}
        {step < 3 && (
          <div className="flex justify-center gap-6 mt-6 text-[#8A7B70] text-xs font-medium">
            <span>🔒 100% Secure Payment</span>
            <span>🚚 Express Delivery</span>
            <span>🎂 Handcrafted Freshness</span>
          </div>
        )}
      </div>
    </div>
  )
}
