import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import Confetti from './Confetti'
import toast from 'react-hot-toast'
import {
  Sparkles, Heart, Wand2, ShoppingCart, MessageCircle,
  Check, RefreshCw, Palette, Layers, Type, Cake
} from 'lucide-react'

// ── 6 Inspiring Custom Design Ideas
const CUSTOM_DESIGN_IDEAS = [
  {
    id: 'idea-1',
    title: 'Minimalist Korean Bento Cake',
    tag: 'Trending & Cute',
    weight: '1 lb',
    weightLbs: 1,
    basePrice: 350,
    flavor: 'Royal Vanilla Bean',
    frostingColor: '#fce7f3', // Pastel Pink
    writingColor: '#be185d',
    shape: 'round',
    designTier: 'Classic Minimalist',
    img: '/images/_Adorable bear‑face bento cake with smooth white frosting, chocolate ears & paws, and pink cheek accents_ Perfect for birthday celebrations or cute snack boxes! 🍰💖_ #BentoCake #CuteCake #BearCake #CakeDesign #Des.jpg',
    desc: 'Clean pastel icing, delicate piped bead border, and aesthetic Korean handwriting.',
    defaultWriting: 'Happy Birthday Cutie 🍰',
  },
  {
    id: 'idea-2',
    title: 'Rich Belgian Chocolate Drip & Truffle',
    tag: 'Choco Lover',
    weight: '2 lb',
    weightLbs: 2,
    basePrice: 850,
    flavor: 'Belgian Chocolate',
    frostingColor: '#3d1d13', // Chocolate
    writingColor: '#fbbf24', // Gold
    shape: 'round',
    designTier: 'Chocolate Drip & Toppings',
    img: '/images/chocolate truffle cake.jpg',
    desc: 'Silky dark chocolate ganache drip with Ferrero Rocher, golden sprinkles & rich sponge.',
    defaultWriting: 'Forever Chocolate Love 🍫',
  },
  {
    id: 'idea-3',
    title: 'Romantic Heart Red Velvet Anniversary',
    tag: 'Anniversary Special',
    weight: '2 lb',
    weightLbs: 2,
    basePrice: 900,
    flavor: 'Red Velvet',
    frostingColor: '#ffe4e6', // Creamy Rose
    writingColor: '#e11d48',
    shape: 'heart',
    designTier: 'Handcrafted Fondant Art',
    img: '/images/Simple Red & White Anniversary Cake Design _ Elegant Romantic Celebration Cake.jpg',
    desc: 'Heart silhouette with crimson rose piping, velvet dust and romantic calligraphy.',
    defaultWriting: 'Together Forever ❤️ 10 Years',
  },
  {
    id: 'idea-4',
    title: 'Enchanted Pastel Floral Garden',
    tag: 'Floral Art',
    weight: '3 lb',
    weightLbs: 3,
    basePrice: 1250,
    flavor: 'Butterscotch Supreme',
    frostingColor: '#fef3c7', // Buttercream yellow
    writingColor: '#b45309',
    shape: 'round',
    designTier: 'Handcrafted Fondant Art',
    img: '/images/💛 Sunny Yellow Daisy Birthday Cake.jpg',
    desc: 'Hand-piped buttercream daisies, edible sugar pearls, and fresh celebratory charm.',
    defaultWriting: 'Bloom with Joy 🌼',
  },
  {
    id: 'idea-5',
    title: 'Teddy Bear & Sweet Clouds Birthday',
    tag: 'Kids & Cute',
    weight: '1.5 lb',
    weightLbs: 1.5,
    basePrice: 650,
    flavor: 'Black Forest',
    frostingColor: '#e0f2fe', // Sky Blue
    writingColor: '#0369a1',
    shape: 'round',
    designTier: 'Handcrafted Fondant Art',
    img: '/images/cake 💖.jpg',
    desc: 'Playful teddy bear accents, fluffy marshmallow clouds, and pastel celebration joy.',
    defaultWriting: 'Aarav Turns 3! 🐻🎈',
  },
  {
    id: 'idea-6',
    title: 'Grand Royal Gold Foil Tier Cake',
    tag: 'Luxury Tiered',
    weight: '5 lb',
    weightLbs: 5,
    basePrice: 1950,
    flavor: 'Kesar Pista Delight',
    frostingColor: '#fefce8', // Royal Cream
    writingColor: '#ca8a04',
    shape: 'round',
    designTier: 'Royal 24k Gold & Luxury Tier',
    img: '/images/15+ Gorgeous Cake Designs To Spark Ideas For Your Next Party.jpg',
    desc: 'Majestic multi-tier celebration masterpiece adorned with edible 24k gold leaf and pearls.',
    defaultWriting: 'The Royal Celebration ✨',
  },
]

// Weight options with base pricing starting at 300 to 2000
const POUND_OPTIONS = [
  { lbs: 1, label: '1 lb (Pound)', servings: '4-6 slices', basePrice: 350 },
  { lbs: 1.5, label: '1.5 lb', servings: '6-8 slices', basePrice: 550 },
  { lbs: 2, label: '2 lb (Pound)', servings: '10-12 slices', basePrice: 750 },
  { lbs: 3, label: '3 lb (Pound)', servings: '15-18 slices', basePrice: 1150 },
  { lbs: 4, label: '4 lb (Pound)', servings: '20-25 slices', basePrice: 1550 },
  { lbs: 5, label: '5 lb (Grand Tier)', servings: '30+ slices', basePrice: 1900 },
]

const FLAVORS = [
  'Belgian Chocolate',
  'Red Velvet Cream Cheese',
  'Royal Vanilla Bean',
  'Butterscotch Supreme',
  'Black Forest Classic',
  'Fresh Mango Bliss',
  'Kesar Pista Delight',
]

const DESIGN_TIERS = [
  { name: 'Classic Minimalist', extra: 0, desc: 'Smooth silky icing with bead borders (Starts from ₹300)' },
  { name: 'Chocolate Drip & Toppings', extra: 150, desc: 'Rich ganache drips, crunchy pearls & choco flakes (+₹150)' },
  { name: 'Handcrafted Fondant Art', extra: 250, desc: 'Sculpted 3D characters, flowers & theme toppers (+₹250)' },
  { name: 'Royal 24k Gold & Luxury Tier', extra: 350, desc: 'Edible 24k gold leaf, macarons & shimmer tiers (+₹350)' },
]

const FROSTING_COLORS = [
  { name: 'Pure White Cream', hex: '#ffffff', text: '#2d1b0e' },
  { name: 'Pastel Rose Pink', hex: '#fce7f3', text: '#be185d' },
  { name: 'Dark Belgian Choco', hex: '#3d1d13', text: '#fde047' },
  { name: 'Golden Buttercream', hex: '#fef3c7', text: '#92400e' },
  { name: 'Sky Velvet Blue', hex: '#e0f2fe', text: '#0369a1' },
  { name: 'Lavender Bliss', hex: '#f3e8ff', text: '#6b21a8' },
  { name: 'Mint Green', hex: '#ecfdf5', text: '#065f46' },
]

const WRITING_COLORS = [
  { name: 'Golden Icing', hex: '#d4a853' },
  { name: 'Dark Chocolate', hex: '#3d1d13' },
  { name: 'Rose Crimson', hex: '#e11d48' },
  { name: 'Pure White', hex: '#ffffff' },
  { name: 'Royal Navy', hex: '#1e3a8a' },
  { name: 'Emerald Green', hex: '#059669' },
]

const QUICK_GREETINGS = [
  'Happy Birthday! 🎂',
  'Happy Anniversary! 💍',
  'Love You Forever ❤️',
  'Best Mom Ever 🌸',
  'Congratulations! 🎓',
  'Sweet Beginnings ✨',
]

export default function CustomCakeStudio() {
  const { addToCart } = useCart()
  const [confetti, setConfetti] = useState(false)

  // Customizer state
  const [selectedIdea, setSelectedIdea] = useState(null)
  const [customWriting, setCustomWriting] = useState('Happy Birthday Sneha! 🎂')
  const [writingColor, setWritingColor] = useState(WRITING_COLORS[0].hex)
  const [frostingColor, setFrostingColor] = useState(FROSTING_COLORS[1].hex)
  const [shape, setShape] = useState('round') // round | heart | square
  const [weightLbs, setWeightLbs] = useState(1)
  const [flavor, setFlavor] = useState('Belgian Chocolate')
  const [designTier, setDesignTier] = useState(DESIGN_TIERS[0].name)
  const [isEggless, setIsEggless] = useState(true)
  const [specialNotes, setSpecialNotes] = useState('')
  const [customCakeName, setCustomCakeName] = useState('My Custom Dream Cake')

  const cakePreviewRef = useRef(null)

  // Dynamic price calculation starting from 300 to 2000 based on weight & design
  const currentWeightObj = POUND_OPTIONS.find(p => p.lbs === weightLbs) || POUND_OPTIONS[0]
  const currentTierObj = DESIGN_TIERS.find(t => t.name === designTier) || DESIGN_TIERS[0]
  const rawPrice = currentWeightObj.basePrice + currentTierObj.extra
  // Strict clamp between 300 and 2000
  const finalPrice = Math.min(2000, Math.max(300, rawPrice))

  // Load an idea into the studio
  const handleSelectIdea = (idea) => {
    setSelectedIdea(idea.id)
    setCustomCakeName(idea.title)
    setWeightLbs(idea.weightLbs)
    setFlavor(idea.flavor)
    setFrostingColor(idea.frostingColor)
    setWritingColor(idea.writingColor)
    setShape(idea.shape)
    setDesignTier(idea.designTier)
    setCustomWriting(idea.defaultWriting)

    if (cakePreviewRef.current) {
      gsap.fromTo(cakePreviewRef.current,
        { scale: 0.9, opacity: 0.7 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      )
    }

    // Scroll to studio builder smoothly
    const builderEl = document.getElementById('cake-builder-anchor')
    if (builderEl) {
      builderEl.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    toast.success(`Loaded idea: "${idea.title}" into studio!`, { icon: '🎨' })
  }

  const handleAddToCart = () => {
    const item = {
      id: `custom-${Date.now()}`,
      cartKey: `custom-${Date.now()}-${weightLbs}lb-${customWriting.slice(0, 15)}`,
      name: customCakeName || 'Custom Designer Cake',
      price: finalPrice,
      img: selectedIdea ? (CUSTOM_DESIGN_IDEAS.find(i => i.id === selectedIdea)?.img || '/images/Aesthatic.jpg') : '/images/Aesthatic.jpg',
      weight: `${weightLbs} lb`,
      flavor,
      customWriting,
      designTier,
      isEggless,
      notes: specialNotes,
      qty: 1,
    }

    addToCart(item, 1)
    setConfetti(true)
    setTimeout(() => setConfetti(false), 4000)
    toast.success('Custom Cake added to cart! Proceed to checkout anytime.', { icon: '🎂' })
  }

  const handleWhatsAppOrder = () => {
    const text = encodeURIComponent(
      `🎂 *Custom Cake Order from Bhawani Sweets*\n\n` +
      `*Cake:* ${customCakeName}\n` +
      `*Weight:* ${weightLbs} lb (Pound)\n` +
      `*Flavor:* ${flavor}\n` +
      `*Shape:* ${shape}\n` +
      `*Design Style:* ${designTier}\n` +
      `*Dietary:* ${isEggless ? '100% Eggless Pure Veg' : 'With Egg'}\n` +
      `*Custom Writing on Cake:* "${customWriting}"\n` +
      (specialNotes ? `*Special Notes:* ${specialNotes}\n` : '') +
      `*Estimated Price:* ₹${finalPrice}\n\n` +
      `Please confirm availability for delivery in Patna!`
    )
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank')
  }

  return (
    <section id="custom-cake-studio" className="py-24 px-6 relative">
      <Confetti active={confetti} count={120} />

      {/* Decorative background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-amber-500/10 via-pink-500/10 to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">

        {/* ── SECTION HEADER ── */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-xs font-semibold text-amber-400 mb-4 border border-amber-400/30">
            <Sparkles size={14} />
            <span>Custom Cake Studio · Any Design, Any Pound Weight</span>
            <Sparkles size={14} />
          </div>
          <h2 className="section-title mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="shimmer-text">Custom Design Ideas</span>{' '}
            <span className="text-white">&amp; Live Cake Studio</span>
          </h2>
          <p className="text-white/65 text-base leading-relaxed">
            Choose from trending custom cake concepts or design your own from scratch.
            Prices start from <strong className="text-amber-400 font-bold">₹300 up to ₹2,000</strong> based on design &amp; pound weight,
            with <strong className="text-rose-400 font-bold">FREE custom writing</strong> on your cake!
          </p>
        </div>

        {/* ── PART 1: INSPIRING CUSTOM DESIGN IDEAS SHOWCASE ── */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h3 className="text-2xl font-bold text-white flex items-center gap-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                <span>✨ Trending Custom Design Ideas</span>
              </h3>
              <p className="text-xs text-white/50 mt-1">
                Click any design idea to load it directly into the live customizer below
              </p>
            </div>
            <div className="text-xs text-amber-400 glass px-3.5 py-1.5 rounded-full border border-amber-400/30">
              💡 100% Handcrafted by Pastry Masters
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CUSTOM_DESIGN_IDEAS.map((idea) => {
              const isSelected = selectedIdea === idea.id
              return (
                <div
                  key={idea.id}
                  onClick={() => handleSelectIdea(idea)}
                  className={`glass rounded-3xl overflow-hidden cursor-pointer transition-all duration-400 group relative border h-full flex flex-col justify-between ${
                    isSelected ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-2xl scale-[1.02]' : 'border-white/10 hover:border-amber-400/40 hover:-translate-y-1.5'
                  }`}
                >
                  <div className="relative h-52 overflow-hidden shrink-0">
                    <img
                      src={idea.img}
                      alt={idea.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute top-3 left-3">
                      <span className="glass text-xs px-3 py-1 rounded-full text-white font-medium border border-white/20">
                        {idea.tag}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="bg-amber-400 text-black font-black text-xs px-3 py-1 rounded-full shadow-lg">
                        From ₹{idea.basePrice}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4">
                      <div className="text-xs text-amber-300 font-medium">Standard: {idea.weight}</div>
                      <h4 className="text-lg font-bold text-white line-clamp-1" style={{ fontFamily: "'Playfair Display', serif" }}>
                        {idea.title}
                      </h4>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <p className="text-xs text-white/60 leading-relaxed line-clamp-2">
                      {idea.desc}
                    </p>

                    <div className="pt-2 mt-auto flex items-center justify-between text-xs border-t border-white/10">
                      <span className="text-white/40 italic truncate max-w-[170px]">
                        ✍️ "{idea.defaultWriting}"
                      </span>
                      <button
                        className={`px-3.5 py-1.5 rounded-full font-semibold text-xs flex items-center gap-1 transition-all ${
                          isSelected ? 'bg-amber-400 text-black' : 'btn-primary text-white'
                        }`}
                      >
                        {isSelected ? <Check size={12} /> : <Wand2 size={12} />}
                        <span>{isSelected ? 'Loaded' : 'Use Idea'}</span>
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* ── ANCHOR FOR SCROLL ── */}
        <div id="cake-builder-anchor" />

        {/* ── PART 2: INTERACTIVE CUSTOM CAKE BUILDER & LIVE WRITING PREVIEW ── */}
        <div className="glass-dark rounded-3xl border border-amber-400/30 overflow-hidden shadow-2xl p-6 md:p-10">
          <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8 flex-wrap gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Cake className="text-amber-400" size={24} />
                <h3 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Live Custom Cake Studio
                </h3>
              </div>
              <p className="text-xs text-white/60 mt-1">
                Customize writing, choose pound weight (₹300 - ₹2,000), flavor, and see your cake in real time!
              </p>
            </div>

            {/* Price Badge */}
            <div className="flex items-center gap-3 bg-amber-400/10 border border-amber-400/40 rounded-2xl px-5 py-3">
              <div className="text-right">
                <div className="text-[10px] uppercase text-white/60 tracking-wider">Calculated Price</div>
                <div className="text-2xl font-black text-amber-400">₹{finalPrice.toLocaleString()}</div>
              </div>
              <div className="text-xs text-white/50 pl-2 border-l border-white/10">
                <div>Weight: <strong className="text-white">{weightLbs} lb</strong></div>
                <div>Free custom icing writing ✍️</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

            {/* ── LEFT: 3D-STYLED VISUAL CAKE PREVIEW WITH LIVE WRITING ── */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="text-center mb-3">
                <span className="text-xs font-semibold text-amber-400 uppercase tracking-widest">
                  Live Cake Preview
                </span>
                <p className="text-[11px] text-white/50">Your custom writing updates live in icing calligraphy!</p>
              </div>

              {/* The Visual Cake Canvas */}
              <div
                ref={cakePreviewRef}
                className="relative w-full max-w-[340px] aspect-square rounded-3xl p-6 flex flex-col items-center justify-center transition-all duration-500 shadow-2xl"
                style={{
                  background: 'radial-gradient(circle at 50% 30%, rgba(255,255,255,0.06), rgba(0,0,0,0.6))',
                  border: '1px solid rgba(212,168,83,0.25)',
                }}
              >
                {/* Cake Pedestal / Plate */}
                <div
                  className="absolute bottom-6 w-64 h-8 rounded-full shadow-2xl"
                  style={{
                    background: 'linear-gradient(180deg, #d4a853, #78350f)',
                    boxShadow: '0 18px 30px rgba(0,0,0,0.8), 0 0 20px rgba(212,168,83,0.3)',
                  }}
                />

                {/* Cake Stand Stem */}
                <div className="absolute bottom-2 w-14 h-6 bg-gradient-to-r from-amber-700 via-amber-500 to-amber-800 rounded-b-md" />

                {/* Cake Tier Base */}
                <div
                  className={`relative z-10 flex flex-col items-center justify-center p-6 text-center transition-all duration-500 shadow-2xl ${
                    shape === 'heart'
                      ? 'w-56 h-56 [clip-path:path("M28,84_C0,42_0,0_28,0_C56,0_56,42_56,84_C56,42_56,0_84,0_C112,0_112,42_84,84_L56,112_Z")] scale-90'
                      : shape === 'square'
                      ? 'w-52 h-48 rounded-2xl'
                      : 'w-52 h-52 rounded-full'
                  }`}
                  style={{
                    backgroundColor: frostingColor,
                    boxShadow: `0 20px 45px rgba(0,0,0,0.6), inset 0 8px 16px rgba(255,255,255,0.4), inset 0 -8px 16px rgba(0,0,0,0.3), 0 0 30px ${frostingColor}66`,
                    border: '3px solid rgba(255,255,255,0.4)',
                  }}
                >
                  {/* Decorative Piped Icing Pearl Border */}
                  <div
                    className={`absolute inset-2 border-2 border-dashed pointer-events-none opacity-60 ${
                      shape === 'round' ? 'rounded-full' : 'rounded-xl'
                    }`}
                    style={{ borderColor: writingColor }}
                  />

                  {/* Frosting Chocolate / Caramel Drip simulation if tier has drip */}
                  {designTier.includes('Drip') && (
                    <div className="absolute top-0 left-0 right-0 h-6 flex justify-around pointer-events-none overflow-hidden rounded-t-full opacity-85">
                      <div className="w-4 h-5 bg-[#3d1d13] rounded-b-full shadow-md" />
                      <div className="w-5 h-7 bg-[#3d1d13] rounded-b-full shadow-md" />
                      <div className="w-3 h-4 bg-[#3d1d13] rounded-b-full shadow-md" />
                      <div className="w-6 h-8 bg-[#3d1d13] rounded-b-full shadow-md" />
                      <div className="w-4 h-6 bg-[#3d1d13] rounded-b-full shadow-md" />
                    </div>
                  )}

                  {/* Royal Gold Leaf or Sparkles simulation */}
                  {designTier.includes('Gold') && (
                    <div className="absolute inset-0 pointer-events-none flex items-center justify-between p-4">
                      <span className="text-amber-300 text-sm animate-pulse">✨</span>
                      <span className="text-amber-400 text-xs animate-bounce">🪙</span>
                      <span className="text-amber-300 text-sm animate-pulse">✨</span>
                    </div>
                  )}

                  {/* ── LIVE CUSTOM WRITING DISPLAY ON TOP OF CAKE ── */}
                  <div className="relative z-20 px-4 max-w-[200px]">
                    <div className="text-[10px] uppercase font-bold tracking-wider opacity-60 mb-0.5" style={{ color: writingColor }}>
                      Bhawani Bakery
                    </div>

                    <div
                      className="text-lg md:text-xl font-bold leading-tight drop-shadow-md select-none transition-all duration-300"
                      style={{
                        fontFamily: "'Dancing Script', cursive",
                        color: writingColor,
                        textShadow: '0 1px 3px rgba(0,0,0,0.3)',
                      }}
                    >
                      {customWriting || 'Your Name / Message Here'}
                    </div>

                    <div className="text-[10px] font-semibold mt-1 opacity-70" style={{ color: writingColor }}>
                      {weightLbs} lb · {isEggless ? 'Veg 🟢' : 'Egg 🔴'}
                    </div>
                  </div>
                </div>

                {/* Floating candle flame topper */}
                <div className="absolute top-6 z-30 flex flex-col items-center pointer-events-none">
                  <div className="w-2.5 h-3.5 bg-gradient-to-t from-orange-500 via-amber-400 to-yellow-200 rounded-full animate-bounce shadow-lg shadow-orange-500/50" />
                  <div className="w-1 h-3 bg-white/90 rounded-sm" />
                </div>
              </div>

              {/* Quick Details Below Canvas */}
              <div className="mt-4 flex items-center gap-3 text-xs text-white/60">
                <span className="glass px-3 py-1 rounded-full">{flavor}</span>
                <span className="glass px-3 py-1 rounded-full">{shape.toUpperCase()}</span>
                <span className="glass px-3 py-1 rounded-full">{isEggless ? '100% Eggless' : 'Regular'}</span>
              </div>
            </div>

            {/* ── RIGHT: CONTROLS & OPTIONS ── */}
            <div className="lg:col-span-7 space-y-6">

              {/* 1. What You Want Written On Cake (Custom Writing) */}
              <div className="glass rounded-2xl p-5 border border-amber-400/40 bg-amber-950/20 space-y-3">
                <div className="flex items-center justify-between">
                  <label htmlFor="custom-cake-writing-input" className="text-sm font-bold text-amber-400 flex items-center gap-2">
                    <Type size={16} />
                    <span>What Do You Want Written On Your Cake? *</span>
                  </label>
                  <span className="text-[11px] text-green-400 font-semibold bg-green-950/60 px-2.5 py-0.5 rounded-full border border-green-500/30">
                    100% Free Service
                  </span>
                </div>

                <div className="relative">
                  <input
                    id="custom-cake-writing-input"
                    type="text"
                    maxLength={50}
                    value={customWriting}
                    onChange={e => setCustomWriting(e.target.value)}
                    placeholder="e.g. Happy 25th Birthday Sneha! 🎂"
                    className="fancy-input text-base font-semibold"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40">
                    {customWriting.length}/50
                  </span>
                </div>

                {/* Quick Greeting Chips */}
                <div>
                  <div className="text-[11px] text-white/50 mb-1.5 font-medium">Quick suggestions:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {QUICK_GREETINGS.map(greeting => (
                      <button
                        key={greeting}
                        type="button"
                        onClick={() => setCustomWriting(greeting)}
                        className="glass text-[11px] px-2.5 py-1 rounded-lg text-white/70 hover:text-amber-400 hover:border-amber-400 transition-all"
                      >
                        {greeting}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Icing Writing Color Selector */}
                <div className="pt-2">
                  <div className="text-xs text-white/60 mb-2 font-medium">Writing Icing Color:</div>
                  <div className="flex flex-wrap gap-2">
                    {WRITING_COLORS.map(wc => (
                      <button
                        key={wc.hex}
                        type="button"
                        onClick={() => setWritingColor(wc.hex)}
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs transition-all border ${
                          writingColor === wc.hex ? 'border-amber-400 ring-1 ring-amber-400 bg-white/10' : 'border-white/10 hover:border-white/30'
                        }`}
                      >
                        <span className="w-3.5 h-3.5 rounded-full border border-white/30" style={{ backgroundColor: wc.hex }} />
                        <span className="text-white/80 text-[11px]">{wc.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 2. Pound Weight Selector (Starting from 300 to 2000) */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers size={16} className="text-amber-400" />
                    <span>Select Cake Weight (In Pounds)</span>
                  </label>
                  <span className="text-xs text-white/50">1 lb = approx 450-500g</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                  {POUND_OPTIONS.map(po => {
                    const isSelected = weightLbs === po.lbs
                    // calculate approx price for this weight with current tier
                    const optPrice = Math.min(2000, Math.max(300, po.basePrice + currentTierObj.extra))
                    return (
                      <button
                        key={po.lbs}
                        type="button"
                        onClick={() => setWeightLbs(po.lbs)}
                        className={`p-3 rounded-2xl text-left transition-all border ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 ring-2 ring-amber-400/30'
                            : 'glass border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-bold text-sm ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                            {po.label}
                          </span>
                          <span className="text-amber-400 font-extrabold text-xs">
                            ₹{optPrice}
                          </span>
                        </div>
                        <div className="text-[11px] text-white/50">{po.servings}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 3. Design Complexity & Style */}
              <div>
                <label className="text-sm font-bold text-white flex items-center gap-2 mb-2">
                  <Palette size={16} className="text-amber-400" />
                  <span>Choose Design Complexity / Style</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DESIGN_TIERS.map(dt => {
                    const isSelected = designTier === dt.name
                    return (
                      <button
                        key={dt.name}
                        type="button"
                        onClick={() => setDesignTier(dt.name)}
                        className={`p-3 rounded-2xl text-left transition-all border ${
                          isSelected
                            ? 'bg-amber-400/20 border-amber-400 ring-2 ring-amber-400/30'
                            : 'glass border-white/10 hover:border-white/30'
                        }`}
                      >
                        <div className="flex justify-between items-center mb-0.5">
                          <span className={`font-semibold text-xs ${isSelected ? 'text-amber-400' : 'text-white'}`}>
                            {dt.name}
                          </span>
                          <span className="text-xs text-amber-300 font-bold">
                            {dt.extra === 0 ? 'Included' : `+₹${dt.extra}`}
                          </span>
                        </div>
                        <p className="text-[10px] text-white/55 leading-tight">{dt.desc}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 4. Flavor & Shape & Frosting Base Color */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Flavor */}
                <div>
                  <label htmlFor="custom-flavor-select" className="text-xs text-white/60 mb-1.5 block font-semibold">Flavor</label>
                  <select
                    id="custom-flavor-select"
                    value={flavor}
                    onChange={e => setFlavor(e.target.value)}
                    className="fancy-input py-2.5 text-xs bg-[#1a0a05]"
                  >
                    {FLAVORS.map(f => (
                      <option key={f} value={f} style={{ background: '#1a0a05' }}>{f}</option>
                    ))}
                  </select>
                </div>

                {/* Cake Shape */}
                <div>
                  <label className="text-xs text-white/60 mb-1.5 block font-semibold">Cake Shape</label>
                  <div className="grid grid-cols-3 gap-1">
                    {[
                      { id: 'round', label: 'Round' },
                      { id: 'heart', label: 'Heart' },
                      { id: 'square', label: 'Square' },
                    ].map(s => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setShape(s.id)}
                        className={`py-2 rounded-xl text-xs font-semibold transition-all border ${
                          shape === s.id ? 'btn-primary text-white border-transparent' : 'glass border-white/10 text-white/70'
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dietary preference */}
                <div>
                  <label className="text-xs text-white/60 mb-1.5 block font-semibold">Dietary</label>
                  <div className="grid grid-cols-2 gap-1">
                    <button
                      type="button"
                      onClick={() => setIsEggless(true)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all border ${
                        isEggless ? 'bg-green-900/60 border-green-500 text-green-300' : 'glass border-white/10 text-white/60'
                      }`}
                    >
                      🟢 100% Veg
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEggless(false)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold transition-all border ${
                        !isEggless ? 'bg-red-900/60 border-red-500 text-red-300' : 'glass border-white/10 text-white/60'
                      }`}
                    >
                      🔴 With Egg
                    </button>
                  </div>
                </div>
              </div>

              {/* Frosting Color Palette */}
              <div>
                <label className="text-xs text-white/60 mb-1.5 block font-semibold">Frosting Base Color</label>
                <div className="flex flex-wrap gap-2">
                  {FROSTING_COLORS.map(fc => (
                    <button
                      key={fc.hex}
                      type="button"
                      onClick={() => setFrostingColor(fc.hex)}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs transition-all border ${
                        frostingColor === fc.hex ? 'border-amber-400 ring-2 ring-amber-400/40 bg-white/10' : 'border-white/10 hover:border-white/30'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-black/30" style={{ backgroundColor: fc.hex }} />
                      <span className="text-white/80 text-[11px]">{fc.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Special Design Notes */}
              <div>
                <label htmlFor="custom-special-notes" className="text-xs text-white/60 mb-1 block font-semibold">
                  Any Special Design Ideas or Instructions? (Optional)
                </label>
                <textarea
                  id="custom-special-notes"
                  rows={2}
                  value={specialNotes}
                  onChange={e => setSpecialNotes(e.target.value)}
                  placeholder="e.g. Add extra chocolate curls, Spiderman theme topper, or pastel pink ribbons..."
                  className="fancy-input text-xs py-2 resize-none"
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  id="add-custom-cake-to-cart-btn"
                  onClick={handleAddToCart}
                  className="btn-primary flex-1 py-4 text-base font-bold flex items-center justify-center gap-2 glow-btn shadow-xl"
                >
                  <ShoppingCart size={18} />
                  <span>Add Custom Cake to Cart · ₹{finalPrice.toLocaleString()}</span>
                </button>

                <button
                  type="button"
                  id="whatsapp-custom-cake-btn"
                  onClick={handleWhatsAppOrder}
                  className="glass flex-1 py-4 rounded-full text-green-400 hover:bg-green-950/40 border border-green-500/40 font-bold text-sm flex items-center justify-center gap-2 transition-all"
                >
                  <MessageCircle size={18} />
                  <span>Order Directly via WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-white/40 pt-1">
                <span>🚚 Delivery in 2-3 hrs across Patna</span>
                <span>•</span>
                <span>⭐ 100% Satisfaction Guarantee</span>
                <span>•</span>
                <span>🎂 Freshly Baked to Order</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
