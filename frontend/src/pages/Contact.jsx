import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import WaterTile from '../components/WaterTile'
import { Phone, MapPin, Clock, Mail, Share2, MessageCircle } from 'lucide-react'

export default function Contact() {
  const titleRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
  }, [])

  return (
    <div className="min-h-screen water-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef} className="text-center mb-12">
          <h1 className="section-title mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="shimmer-text">Contact</span>
            <span className="text-[#2C221E]"> Us</span>
          </h1>
          <p className="text-[#73655D]">We'd love to hear from you — drop by our parlour or reach out directly!</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Info */}
          <div className="space-y-5">
            {[
              { icon: <Phone size={22} />, label: 'Phone', val: '+91 98765 43210', color: '#4ade80', href: 'tel:+919876543210' },
              { icon: <MessageCircle size={22} />, label: 'WhatsApp', val: 'Chat on WhatsApp', color: '#25D366', href: 'https://wa.me/919876543210' },
              { icon: <MapPin size={22} />, label: 'Address', val: 'Main Market Road, Patna, Bihar – 800001', color: '#60a5fa' },
              { icon: <Clock size={22} />, label: 'Hours', val: 'Mon–Sun: 7:00 AM – 10:00 PM', color: '#fb923c' },
              { icon: <Mail size={22} />, label: 'Email', val: 'bhawanisweets@gmail.com', color: '#e8718a', href: 'mailto:bhawanisweets@gmail.com' },
            ].map(item => (
              <WaterTile key={item.label} className="glass rounded-2xl p-5">
                <a href={item.href || '#'} className="flex items-center gap-4 group">
                  <div className="p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform shadow-xs"
                    style={{ background: `${item.color}20`, color: item.color }}>
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-xs text-[#8A7B70] font-semibold mb-0.5">{item.label}</div>
                    <div className="text-[#2C221E] font-bold text-sm">{item.val}</div>
                  </div>
                </a>
              </WaterTile>
            ))}

            <div className="flex gap-4">
              {[
                {
                  icon: (
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
                    </svg>
                  ),
                  color: '#e1306c',
                  href: '#',
                  label: 'Instagram'
                },
                { icon: <Share2 size={22} />, color: '#1877f2', href: '#', label: 'Facebook' },
              ].map(s => (
                <WaterTile key={s.label} className="glass rounded-2xl p-4 flex-1">
                  <a href={s.href} className="flex items-center justify-center gap-2 group">
                    <span style={{ color: s.color }} className="group-hover:scale-125 transition-transform block">
                      {s.icon}
                    </span>
                    <span className="text-[#3B2C24] font-semibold text-sm">{s.label}</span>
                  </a>
                </WaterTile>
              ))}
            </div>
          </div>

          {/* Contact form */}
          <WaterTile className="glass-dark rounded-3xl p-7" style={{ border: '1px solid rgba(212,168,83,0.2)' }}>
            <h2 className="text-lg font-bold text-amber-400 mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              Send us a Message
            </h2>
            <form className="space-y-4" onSubmit={e => e.preventDefault()}>
              <input id="contact-name" type="text" placeholder="Your Name" className="fancy-input" />
              <input id="contact-phone" type="tel" placeholder="Phone Number" className="fancy-input" />
              <input id="contact-occasion" type="text" placeholder="Occasion (e.g. Birthday, Anniversary)" className="fancy-input" />
              <textarea id="contact-message" rows={4} placeholder="Tell us about your cake dream..."
                className="fancy-input resize-none" />
              <button type="submit" id="contact-submit" className="btn-primary w-full py-3">
                Send Message 🎂
              </button>
            </form>
          </WaterTile>
        </div>

        {/* Map placeholder */}
        <div className="mt-8 glass rounded-3xl overflow-hidden h-48 flex items-center justify-center border border-[#D5C2B0]"
          style={{ border: '1px solid rgba(212,168,83,0.35)' }}>
          <div className="text-center text-[#73655D]">
            <MapPin size={32} className="mx-auto mb-2 text-[#A87828]" />
            <p className="text-sm font-bold text-[#2C221E]">Main Market Road, Patna, Bihar 800001</p>
            <a href="https://maps.google.com" target="_blank" rel="noreferrer"
              className="text-xs text-[#A87828] font-bold hover:underline mt-1 inline-block">
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
