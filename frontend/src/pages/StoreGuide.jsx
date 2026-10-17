import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import {
  Store, MapPin, Clock, Phone, MessageCircle, Scale,
  ShieldCheck, Truck, Sparkles, ChevronRight, CheckCircle2, HelpCircle
} from 'lucide-react'

export default function StoreGuide() {
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
      <div className="w-full max-w-[1500px] mx-auto space-y-12">

        {/* ── HEADER ── */}
        <div ref={titleRef} className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-[#8A6321] px-5 py-2 rounded-full mb-3 border border-white/70 bg-white/80 backdrop-blur-md shadow-xs">
            <Store size={14} className="text-[#C5943B]" />
            <span className="font-semibold">Bhawani Sweets &amp; Bakery Store &amp; Delivery Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C221E] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="shimmer-text">Store Visit, Pickup</span>
            <span className="text-[#2C221E]"> &amp; Delivery Policy</span>
          </h1>
          <p className="text-[#73655D] text-sm md:text-base leading-relaxed">
            Everything you need to know about our handcrafted cakes delivered to your doorstep, and our daily in-store fresh dairy, sattu, and desi ghee sweets counter in Patna.
          </p>
        </div>

        {/* ── CORE POLICY BANNER ── */}
        <div className="cake-card p-7 sm:p-9 bg-white/90">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <Truck size={14} />
                <span>Home Delivery Available</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                🎂 Handcrafted Cakes (Delivered to Doorstep)
              </h2>
              <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                All celebration cakes (Birthday, Anniversary, Chocolate, Floral, Cute Bento) are delivered straight to your door across Patna.
              </p>
              <ul className="space-y-2 text-xs sm:text-sm text-[#4A3D34]">
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5943B] shrink-0" />
                  <span><strong>Exact Pound Sizing:</strong> Available in 1 Pound, 1.5 Pound, 2 Pound, 3 Pound, 4 Pound, and 5 Pound.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5943B] shrink-0" />
                  <span><strong>Standard Weight Ratio:</strong> 1 Pound = 0.45 kg.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5943B] shrink-0" />
                  <span><strong>Pricing:</strong> Transparent rates starting at ₹300 up to ₹2,000 max.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#C5943B] shrink-0" />
                  <span><strong>Complimentary Custom Text:</strong> Hand-piped in fresh cream on every cake.</span>
                </li>
              </ul>
              <div className="pt-2">
                <Link to="/menu" className="btn-primary text-xs px-6 py-3 font-bold inline-flex items-center gap-2">
                  <span>Browse Cake Menu</span>
                  <ChevronRight size={15} />
                </Link>
              </div>
            </div>

            <div className="space-y-4 md:border-l md:border-[#E8DFD5] md:pl-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                <Store size={14} />
                <span>In-Store Counter Exclusive</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                🍮 Sweets, Sudha Dairy &amp; Sattu (Store Pickup)
              </h2>
              <div className="p-4 rounded-2xl bg-amber-50/90 border border-amber-300 text-xs text-[#78350F] leading-relaxed">
                <strong>Important Notice:</strong> For purchase, please visit our store. Sudha dairy products, fresh roasted sattu, and traditional sweets are available exclusively for in-store pickup; only cakes will be delivered!
              </div>
              <p className="text-xs sm:text-sm text-[#5C4D42] leading-relaxed">
                To guarantee absolute freshness, chilled dairy integrity, and avoid damage in transit, our pure milk confections and cold-chain items are served directly across our counter.
              </p>
              <ul className="space-y-1.5 text-xs text-[#4A3D34]">
                <li>✦ <strong>Sudha Products:</strong> Chilled milk pouches, probiotic dahi, malai paneer, and cow ghee.</li>
                <li>✦ <strong>Stone-Ground Sattu:</strong> Slow-roasted Bengal gram and barley flour milled daily.</li>
                <li>✦ <strong>Desi Ghee Sweets:</strong> Gulab jamun, Kaju katli, Motichoor laddoos, and Chamcham.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── POUND WEIGHT & SERVING GUIDE (1 POUND = 0.45 KG) ── */}
        <div className="cake-card p-7 sm:p-9 bg-white/90">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-[#8A6321] uppercase tracking-wider mb-1">
                <Scale size={15} />
                <span>Cake Weight Conversion Guide</span>
              </div>
              <h2 className="text-2xl font-bold text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                How to Pick the Right Pound Weight
              </h2>
            </div>
            <div className="px-4 py-2 rounded-2xl bg-[#FAF4E8] border border-[#C5943B]/40 font-black text-[#8A6321] text-sm">
              📏 Standard Ratio: 1 Pound = 0.45 kg
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[#E8DFD5] text-[#8A7B70] uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">Pound Weight</th>
                  <th className="py-3 px-4">Exact kg Ratio</th>
                  <th className="py-3 px-4">Guest Servings</th>
                  <th className="py-3 px-4">Recommended Occasion</th>
                  <th className="py-3 px-4">Starting Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0EAE2] text-[#4A3D34]">
                <tr>
                  <td className="py-3 px-4 font-bold text-[#2C221E]">1 Pound</td>
                  <td className="py-3 px-4 font-bold text-[#A87828]">0.45 kg</td>
                  <td className="py-3 px-4">4 – 6 slices</td>
                  <td className="py-3 px-4">Intimate birthdays &amp; Bento snacks</td>
                  <td className="py-3 px-4 font-black text-[#A87828]">₹300 – ₹520</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#2C221E]">1.5 Pound</td>
                  <td className="py-3 px-4 font-bold text-[#A87828]">0.68 kg</td>
                  <td className="py-3 px-4">6 – 8 slices</td>
                  <td className="py-3 px-4">Small family dinner celebrations</td>
                  <td className="py-3 px-4 font-black text-[#A87828]">₹450 – ₹750</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#2C221E]">2 Pound</td>
                  <td className="py-3 px-4 font-bold text-[#A87828]">0.90 kg</td>
                  <td className="py-3 px-4">10 – 12 slices</td>
                  <td className="py-3 px-4">Standard celebration &amp; Anniversary party</td>
                  <td className="py-3 px-4 font-black text-[#A87828]">₹600 – ₹980</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#2C221E]">3 Pound</td>
                  <td className="py-3 px-4 font-bold text-[#A87828]">1.35 kg</td>
                  <td className="py-3 px-4">15 – 18 slices</td>
                  <td className="py-3 px-4">Milestone birthdays &amp; office gatherings</td>
                  <td className="py-3 px-4 font-black text-[#A87828]">₹900 – ₹1,420</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#2C221E]">4 Pound</td>
                  <td className="py-3 px-4 font-bold text-[#A87828]">1.80 kg</td>
                  <td className="py-3 px-4">20 – 24 slices</td>
                  <td className="py-3 px-4">Grand parties &amp; family banquets</td>
                  <td className="py-3 px-4 font-black text-[#A87828]">₹1,200 – ₹1,800</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold text-[#2C221E]">5 Pound</td>
                  <td className="py-3 px-4 font-bold text-[#A87828]">2.25 kg</td>
                  <td className="py-3 px-4">28 – 32 slices</td>
                  <td className="py-3 px-4">Grand wedding tiers &amp; festive celebrations</td>
                  <td className="py-3 px-4 font-black text-[#A87828]">Up to ₹2,000</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* ── STORE LOCATION & TIMINGS ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-7">
          <div className="cake-card p-7 bg-white/90 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4E8] text-[#C5943B] flex items-center justify-center">
              <Clock size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#2C221E]">Daily Store Timings</h3>
            <p className="text-xs text-[#5C4D42] leading-relaxed">
              Open 7 days a week for in-store pickup, fresh morning Sudha milk, and sweet boxes.
            </p>
            <div className="p-3 rounded-xl bg-white/80 border border-[#E8DFD5] text-xs font-bold text-[#8A6321]">
              ⏰ 7:00 AM – 10:30 PM (All 7 Days)
            </div>
          </div>

          <div className="cake-card p-7 bg-white/90 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4E8] text-[#5B8FB9] flex items-center justify-center">
              <MapPin size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#2C221E]">Store Location</h3>
            <p className="text-xs text-[#5C4D42] leading-relaxed">
              Main Market Road, Near Gandhi Maidan, Patna, Bihar. Easily accessible with parking.
            </p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#A87828] hover:underline"
            >
              <span>Get Directions on Google Maps →</span>
            </a>
          </div>

          <div className="cake-card p-7 bg-white/90 space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#FAF4E8] text-[#758A73] flex items-center justify-center">
              <Phone size={24} />
            </div>
            <h3 className="text-lg font-bold text-[#2C221E]">Order Inquiries</h3>
            <p className="text-xs text-[#5C4D42] leading-relaxed">
              Have a bulk festival sweet box order or custom wedding tier inquiry?
            </p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:underline"
            >
              <MessageCircle size={15} />
              <span>Chat with us on WhatsApp (+91 98765 43210)</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  )
}
