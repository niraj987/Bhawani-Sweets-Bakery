import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import WaterTile from '../components/WaterTile'
import { Award, Heart, Leaf, Users } from 'lucide-react'

export default function About() {
  const titleRef = useRef(null)
  useEffect(() => {
    gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8 })
  }, [])

  const stats = [
    { label: 'Years of Love', value: '25+', icon: '🎂', color: '#d4a853' },
    { label: 'Happy Families', value: '50K+', icon: '👨‍👩‍👧', color: '#e8718a' },
    { label: 'Cake Varieties', value: '200+', icon: '🍰', color: '#a78bfa' },
    { label: 'Daily Orders', value: '150+', icon: '📦', color: '#4ade80' },
  ]

  return (
    <div className="min-h-screen water-bg pt-28 pb-20 px-6">
      <div className="max-w-5xl mx-auto">
        <div ref={titleRef} className="text-center mb-14">
          <h1 className="section-title mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="shimmer-text">Our</span>
            <span className="text-[#2C221E]"> Story</span>
          </h1>
          <p className="text-[#73655D]">A legacy of sweetness, trust, and bakery craftsmanship since 1998</p>
        </div>

        {/* Hero image + story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16 items-center">
          <WaterTile className="rounded-3xl overflow-hidden h-72 border border-[#E8DFD5] shadow-sm">
            <img src="/images/diliara-garifullina-gK297xpY6os-unsplash.jpg" alt="Our bakery"
              className="w-full h-full object-cover"
              onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80' }}
            />
          </WaterTile>
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
              Crafted with <span className="shimmer-text">Love</span> since 1998
            </h2>
            <p className="text-[#73655D] leading-relaxed text-sm">
              Bhawani Sweets &amp; Bakery was founded by <strong className="text-[#A87828]">Shri Bhawani Prasad</strong> in the heart of Patna with one dream: to make every celebration sweeter. What started as a small mithai shop has grown into Patna's most beloved bakery destination.
            </p>
            <p className="text-[#73655D] leading-relaxed text-sm">
              We also house the <strong className="text-[#5B8FB9]">Sudha Milk Parlour</strong> and serve authentic <strong className="text-[#758A73]">Sattu</strong> products — keeping Bihar's food heritage alive while bringing modern cake artistry to every occasion.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[
                { icon: <Award size={14} />, text: 'Award Winning' },
                { icon: <Leaf size={14} />, text: 'Fresh Ingredients' },
                { icon: <Heart size={14} />, text: 'Made with Love' },
              ].map(tag => (
                <span key={tag.text} className="glass px-3 py-1.5 rounded-full text-xs text-amber-400 flex items-center gap-1.5">
                  {tag.icon} {tag.text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-5 mb-16">
          {stats.map(s => (
            <WaterTile key={s.label} className="glass rounded-2xl p-6 text-center group h-full flex flex-col items-center justify-center">
              <div className="text-3xl mb-2 group-hover:scale-125 transition-transform">{s.icon}</div>
              <div className="text-2xl font-black mb-1" style={{ color: s.color }}>{s.value}</div>
              <div className="text-[#73655D] text-xs font-semibold">{s.label}</div>
            </WaterTile>
          ))}
        </div>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Bhawani Bakery', emoji: '🎂', desc: 'Custom cakes, pastries, and seasonal specials for every occasion.', color: '#A87828' },
            { title: 'Sudha Milk Parlour', emoji: '🥛', desc: 'Fresh Sudha dairy products, lassi, chhena and more.', color: '#2563EB' },
            { title: 'Sattu Corner', emoji: '🌾', desc: 'Authentic Bihar sattu drinks, litti & traditional snacks.', color: '#16A34A' },
          ].map(p => (
            <WaterTile key={p.title} className="glass rounded-3xl p-7 text-center group h-full flex flex-col items-center justify-between">
              <div className="text-4xl mb-4 group-hover:scale-125 transition-transform">{p.emoji}</div>
              <h3 className="font-bold text-lg mb-2" style={{ fontFamily: "'Playfair Display', serif", color: p.color }}>
                {p.title}
              </h3>
              <p className="text-[#73655D] text-sm leading-relaxed">{p.desc}</p>
            </WaterTile>
          ))}
        </div>
      </div>
    </div>
  )
}
