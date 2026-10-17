import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Confetti from '../components/Confetti'
import InteractivePoundScale from '../components/InteractivePoundScale'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import {
  ArrowDown, Star, Phone, MapPin, Clock, ChevronRight,
  Heart, Gift, Award, ShoppingCart, Sparkles, MessageCircle, Type, Scale,
  Store
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// ── Cakes with realistic pricing from ₹300 to ₹2,000 based on design & Pound weight
const FEATURED_CAKES = [
  {
    id: 1,
    name: 'Elegant Half-Choco Drip & Pearls',
    basePrice: 520,
    img: '/images/Elegant half‑chocolate drip cake with smooth white frosting, pearl sprinkles, fresh strawberries, and chocolate shards – perfect for birthday or anniversary celebrations_ 🎂🍓✨_#CakeDesign #ChocolateDripCake #Birth.jpg',
    tag: '✨ Trending Signature',
    stars: 5,
    flavor: 'Belgian Truffle & Strawberry',
    designTier: 'Artisan Half-Drip & Pearl Sprinkles',
    weights: [
      { pounds: 1, label: '1 Pound', kg: '0.45 kg', price: 520 },
      { pounds: 1.5, label: '1.5 Pound', kg: '0.68 kg', price: 750 },
      { pounds: 2, label: '2 Pound', kg: '0.90 kg', price: 960 },
      { pounds: 3, label: '3 Pound', kg: '1.35 kg', price: 1420 },
      { pounds: 5, label: '5 Pound', kg: '2.25 kg', price: 2000 },
    ],
    defaultWriting: 'Happy Birthday!',
  },
  {
    id: 2,
    name: 'Decadent Black Forest Delight',
    basePrice: 480,
    img: '/images/Decadent Black Forest Cake with Cherries & Chocolate _ Classic German Dessert.jpg',
    tag: '🍒 Fresh Cherries',
    stars: 5,
    flavor: 'Black Forest with Kirsch Cream',
    designTier: 'Dark Chocolate Curls & Cherries',
    weights: [
      { pounds: 1, label: '1 Pound', kg: '0.45 kg', price: 480 },
      { pounds: 1.5, label: '1.5 Pound', kg: '0.68 kg', price: 700 },
      { pounds: 2, label: '2 Pound', kg: '0.90 kg', price: 890 },
      { pounds: 3, label: '3 Pound', kg: '1.35 kg', price: 1320 },
      { pounds: 5, label: '5 Pound', kg: '2.25 kg', price: 1950 },
    ],
    defaultWriting: 'Sweet Celebrations ❤️',
  },
  {
    id: 3,
    name: 'Cute Bear Face Bento Cake',
    basePrice: 300,
    img: '/images/_Adorable bear‑face bento cake with smooth white frosting, chocolate ears & paws, and pink cheek accents_ Perfect for birthday celebrations or cute snack boxes! 🍰💖_ #BentoCake #CuteCake #BearCake #CakeDesign #Des.jpg',
    tag: '🐻 Starts ₹300',
    stars: 5,
    flavor: 'Sweet Vanilla Bean',
    designTier: 'Korean Bento Mini Style',
    weights: [
      { pounds: 1, label: '1 Pound', kg: '0.45 kg', price: 300 },
      { pounds: 1.5, label: '1.5 Pound', kg: '0.68 kg', price: 450 },
      { pounds: 2, label: '2 Pound', kg: '0.90 kg', price: 600 },
      { pounds: 3, label: '3 Pound', kg: '1.35 kg', price: 900 },
      { pounds: 5, label: '5 Pound', kg: '2.25 kg', price: 1500 },
    ],
    defaultWriting: 'Sweet Cutie 🍰',
  },
  {
    id: 4,
    name: 'White Chocolate Dream Cake',
    basePrice: 460,
    img: '/images/White Chocolate Dream Cake.jpg',
    tag: '🤍 White Choco',
    stars: 5,
    flavor: 'Swiss White Chocolate Mousse',
    designTier: 'Velvet White Glaze & Gold Pearls',
    weights: [
      { pounds: 1, label: '1 Pound', kg: '0.45 kg', price: 460 },
      { pounds: 1.5, label: '1.5 Pound', kg: '0.68 kg', price: 670 },
      { pounds: 2, label: '2 Pound', kg: '0.90 kg', price: 850 },
      { pounds: 3, label: '3 Pound', kg: '1.35 kg', price: 1260 },
      { pounds: 5, label: '5 Pound', kg: '2.25 kg', price: 1880 },
    ],
    defaultWriting: 'Pure Love 🤍',
  },
  {
    id: 5,
    name: 'Anniversary Rose Romance',
    basePrice: 500,
    img: '/images/Simple Red & White Anniversary Cake Design _ Elegant Romantic Celebration Cake.jpg',
    tag: '💍 Anniversary',
    stars: 5,
    flavor: 'Red Velvet Cream Cheese',
    designTier: 'Handcrafted Sugar Petals',
    weights: [
      { pounds: 1, label: '1 Pound', kg: '0.45 kg', price: 500 },
      { pounds: 1.5, label: '1.5 Pound', kg: '0.68 kg', price: 720 },
      { pounds: 2, label: '2 Pound', kg: '0.90 kg', price: 950 },
      { pounds: 3, label: '3 Pound', kg: '1.35 kg', price: 1350 },
      { pounds: 5, label: '5 Pound', kg: '2.25 kg', price: 1950 },
    ],
    defaultWriting: 'Happy Anniversary 💍',
  },
  {
    id: 6,
    name: 'Rich Chocolate Layer Cake',
    basePrice: 490,
    img: '/images/Rich Chocolate Layer Cake with Chocolate Buttercream.jpg',
    tag: '🍫 Dark Choco',
    stars: 5,
    flavor: 'Dark Cocoa Fudge Sponge',
    designTier: 'Whipped Chocolate Rosettes',
    weights: [
      { pounds: 1, label: '1 Pound', kg: '0.45 kg', price: 490 },
      { pounds: 1.5, label: '1.5 Pound', kg: '0.68 kg', price: 710 },
      { pounds: 2, label: '2 Pound', kg: '0.90 kg', price: 910 },
      { pounds: 3, label: '3 Pound', kg: '1.35 kg', price: 1350 },
      { pounds: 5, label: '5 Pound', kg: '2.25 kg', price: 1950 },
    ],
    defaultWriting: 'Choco Bliss ❤️',
  },
]

// ── In-Store Sweets & Sudha Products Showcase (NO PRICE WRITTEN · Store Visit Only)
const STORE_SWEETS_SHOWCASE = [
  {
    id: 's1',
    name: 'Royal Shahi Gulab Jamun & Spongy Rasgullas',
    img: '/sweets/IMG20250717171941.jpg',
    tag: 'Pure Desi Ghee',
    visualLook: 'Deep golden spherical jamuns soaked in warm saffron-cardamom syrup alongside cloud-soft white rasgullas with pure silver vark and crushed pistachio garnish.',
  },
  {
    id: 's2',
    name: 'Diamond Kaju Katli & Pista Barfi Platter',
    img: '/sweets/IMG20250728175136.jpg',
    tag: 'Cashew Delicacy',
    visualLook: 'Pristine diamond-cut silver leaf Kaju Katli crafted from premium cashews, paired with emerald pistachio and saffron-layered milk barfi cubes.',
  },
  {
    id: 's3',
    name: 'Fresh Sudha Cow Milk & Gold Dairy Counter',
    img: '/sweets/IMG20250728175210.jpg',
    tag: 'Cold-Chain Fresh',
    visualLook: 'Daily fresh chilled stock of Sudha Gold (Full Cream), Cow Milk packets, and pure malai paneer straight from certified dairy cooperatives.',
  },
  {
    id: 's4',
    name: 'Traditional Roasted Chana Sattu',
    img: '/sweets/IMG20250728181609.jpg',
    tag: 'Authentic Bihar Sattu',
    visualLook: 'Finely stone-milled golden flour from slow-roasted Bengal gram, releasing an earthy roasted fragrance perfect for healthy sharbat and litti.',
  },
]

// ── Spacious Categories with Calming Hues
const CATEGORIES = [
  { label: 'Birthday Cakes', emoji: '🎂', count: 32, color: '#C5943B', bg: '#FAF4E8', link: '/menu' },
  { label: 'Anniversary Cakes', emoji: '💍', count: 18, color: '#CB766F', bg: '#FBF0EE', link: '/menu' },
  { label: 'Chocolate Cakes', emoji: '🍫', count: 24, color: '#8875A3', bg: '#F4F0F8', link: '/menu' },
  { label: 'Traditional Sweets', emoji: '🍮', count: 45, color: '#D98943', bg: '#FAF2EA', link: '/menu' },
  { label: 'Sudha Milk & Dairy', emoji: '🥛', count: 12, color: '#5B8FB9', bg: '#EEF5FA', link: '/menu' },
  { label: 'Fresh Sattu Products', emoji: '🌾', count: 8, color: '#758A73', bg: '#F0F5F0', link: '/menu' },
]

const TESTIMONIALS = [
  { name: 'Priya Sharma', text: 'The custom written birthday cake was breathtaking! Perfectly piped message and delicious chocolate layers.', stars: 5, avatar: '👩' },
  { name: 'Rahul Verma', text: 'Got a 2 Pound truffle cake (0.90 kg) for ₹960. Fresh, rich, and delivered on time in Patna. Best bakery by far!', stars: 5, avatar: '👨' },
  { name: 'Sunita Devi', text: 'Ordered an anniversary cake with custom text. Beautiful rose design and melt-in-mouth taste. Thank you Bhawani!', stars: 5, avatar: '👩' },
]

export default function Home() {
  const { addToCart } = useCart()
  const heroRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const ctaRef = useRef(null)
  const scrollRef = useRef(null)
  const cardsRef = useRef([])
  const catsRef = useRef([])
  const [confetti, setConfetti] = useState(false)

  // Active cake quick view modal state
  const [activeCard, setActiveCard] = useState(null)
  const [modalPounds, setModalPounds] = useState(1)
  const [modalCustomWriting, setModalCustomWriting] = useState('')
  const [isFavorite, setIsFavorite] = useState({})

  useEffect(() => {
    // Hero entrance
    const tl = gsap.timeline()
    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.1, ease: 'power3.out' })
     .fromTo(subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.5')
     .fromTo(ctaRef.current,
      { y: 25, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.4)' }, '-=0.3')
     .fromTo(scrollRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.5 }, '-=0.2')

    // Scroll-triggered cake cards
    cardsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.7, delay: i * 0.08,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        }
      )
    })

    // Category tiles
    catsRef.current.forEach((el, i) => {
      if (!el) return
      gsap.fromTo(el,
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1,
          duration: 0.5, delay: i * 0.06,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%' }
        }
      )
    })
  }, [])

  const handleOpenCakeModal = (cake) => {
    setActiveCard(cake)
    setModalPounds(cake.weights[0].pounds)
    setModalCustomWriting(cake.defaultWriting || '')
  }

  const handleModalAddToCart = () => {
    if (!activeCard) return
    const currentWeightObj = activeCard.weights.find(w => w.pounds === modalPounds) || activeCard.weights[0]
    const price = currentWeightObj.price

    const cartItem = {
      id: activeCard.id,
      cartKey: `${activeCard.id}-${modalPounds}Pound-${modalCustomWriting.slice(0, 15)}`,
      name: activeCard.name,
      price,
      img: activeCard.img,
      weight: `${modalPounds} Pound (${currentWeightObj.kg})`,
      customWriting: modalCustomWriting,
      flavor: activeCard.flavor,
      designTier: activeCard.designTier,
      qty: 1,
    }

    addToCart(cartItem, 1)
    setActiveCard(null)
  }

  const toggleFavorite = (id, e) => {
    e.stopPropagation()
    setIsFavorite(prev => ({ ...prev, [id]: !prev[id] }))
    toast.success('Updated favorite cakes!', { icon: '💖' })
  }

  return (
    <div className="relative overflow-hidden w-full">
      {confetti && <Confetti count={45} onDone={() => setConfetti(false)} />}

      {/* ── EXPANSIVE HERO SECTION (CLEAN, UNCLUTTERED, CALM) ── */}
      <section
        ref={heroRef}
        className="min-h-[85vh] relative flex items-center justify-center pt-28 pb-12 px-4 sm:px-8 lg:px-12 xl:px-16 w-full"
      >
        <div className="w-full max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 text-xs text-[#8A6321] px-5 py-2 rounded-full border border-white/70 bg-white/90 backdrop-blur-md shadow-xs">
              <Sparkles size={14} className="text-[#C5943B]" />
              <span className="font-semibold tracking-wide">
                Prices from ₹300 to ₹2,000 · Weights 1 Pound to 5 Pounds
              </span>
            </div>

            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[#2C221E] leading-[1.12]"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Every Cake is a <br />
              <span className="shimmer-text">Personal Masterpiece</span>
            </h1>

            {/* Clean, uncluttered subtitle */}
            <p
              ref={subtitleRef}
              className="text-[#73655D] text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal"
            >
              Freshly baked celebration cakes personalized with custom icing text, delivered across Patna in exact Pound weights (1 Pound = 0.45 kg).
            </p>

            {/* CTA Buttons */}
            <div
              ref={ctaRef}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2"
            >
              <Link
                to="/menu"
                id="hero-order-btn"
                className="btn-primary text-sm px-8 py-4 font-bold rounded-2xl shadow-md hover:shadow-lg flex items-center gap-2"
              >
                <span>Browse Cake Menu</span>
                <ChevronRight size={17} />
              </Link>
              <a
                href="#interactive-scale"
                id="hero-scale-btn"
                className="bg-white hover:bg-[#FAF4E8] text-[#4A3D34] text-sm px-7 py-4 font-bold rounded-2xl border border-[#D5C2B0] transition-all flex items-center gap-2 shadow-xs"
              >
                <Scale size={16} className="text-[#C5943B]" />
                <span>Interactive Pound Scale</span>
              </a>
            </div>
          </div>

          {/* Right Visual Column: Signature Showcase Card */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="cake-card p-6 overflow-hidden">
                <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden mb-5">
                  <img
                    src="/images/Elegant half-chocolate drip cake with smooth white frosting, pearl sprinkles, fresh strawberries, and chocolate shards - perfect for birthday or anniversary celebrations_ ?????_#CakeDesign #ChocolateDripCake #Birth.jpg"
                    alt="Signature Half Drip Cake"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80' }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                  <div className="absolute top-3 left-3">
                    <span className="bg-white/90 backdrop-blur-md text-[#A87828] text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      ⭐ Chef's Signature
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <div className="text-xs text-amber-200 font-semibold mb-0.5">Handcrafted in Jodhpur &amp; Patna</div>
                    <div className="font-bold text-lg" style={{ fontFamily: "'Playfair Display', serif" }}>
                      Half-Choco Drip &amp; Pearl Shards
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between text-xs text-[#73655D]">
                    <span className="font-semibold text-[#8A6321]">Starts at ₹520 / 1 Pound</span>
                    <span>Exact weight: 0.45 kg</span>
                  </div>

                  <Link
                    to="/menu"
                    className="w-full btn-primary py-3 text-xs font-bold rounded-xl flex items-center justify-center gap-1.5"
                  >
                    <span>Order Custom Sizing</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          ref={scrollRef}
          href="#featured-cakes"
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-[#8A7B70] hover:text-[#C5943B] transition-colors"
        >
          <span className="text-[10px] tracking-widest uppercase font-semibold">Scroll Down</span>
          <ArrowDown size={14} className="animate-bounce" />
        </a>
      </section>

      {/* ── FEATURED CREATIONS: FULL-WIDTH LAYOUT WITH CLEAR POUND PRICING ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 w-full" id="featured-cakes">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs text-[#8A6321] px-5 py-2 rounded-full mb-3 border border-[#D5C2B0] bg-white/90 backdrop-blur-md shadow-xs">
              <Sparkles size={13} className="text-[#C5943B]" />
              <span>Cakes from ₹300 to ₹2,000 · Weights 1 Pound to 5 Pounds</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C221E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="shimmer-text">Featured</span>{' '}
              <span className="text-[#2C221E]">Cakes</span>
            </h2>
            <p className="text-[#73655D] text-sm md:text-base">
              Handcrafted daily · Delivered directly to your doorstep · Standard 1 Pound = 0.45 kg
            </p>
          </div>

          {/* Spacious 3-column grid with calm translucent cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-9">
            {FEATURED_CAKES.map((cake, i) => (
              <div
                key={cake.id}
                id={`cake-card-${cake.id}`}
                ref={el => cardsRef.current[i] = el}
                className="cake-card group cursor-pointer flex flex-col justify-between h-full overflow-hidden"
                onClick={() => handleOpenCakeModal(cake)}
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Image Container with generous height */}
                  <div className="relative overflow-hidden h-64 rounded-t-[26px] shrink-0">
                    <img
                      src={cake.img}
                      alt={cake.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                    {/* Tag badge */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-white/90 backdrop-blur-md text-[#A87828] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {cake.tag}
                      </span>
                    </div>

                    {/* Favorite heart */}
                    <button
                      className={`absolute top-3.5 right-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-all bg-white/90 backdrop-blur-md shadow-xs ${
                        isFavorite[cake.id] ? 'text-[#CB766F]' : 'text-[#8A7B70] hover:text-[#CB766F]'
                      }`}
                      onClick={(e) => toggleFavorite(cake.id, e)}
                    >
                      <Heart size={15} fill={isFavorite[cake.id] ? 'currentColor' : 'none'} />
                    </button>

                    {/* Bottom overlay info */}
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                      <span className="text-white font-medium text-[11px] bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                        1 to 5 Pounds
                      </span>
                      <span className="text-amber-200 text-[11px] font-semibold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                        Custom Text Included ✍️
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-bold text-[#2C221E] text-lg mb-1 leading-snug group-hover:text-[#A87828] transition-colors line-clamp-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {cake.name}
                      </h3>
                      <p className="text-[#73655D] text-xs mb-3 font-normal line-clamp-1">{cake.flavor}</p>
                    </div>

                    <div className="mt-auto">
                      {/* Pricing info */}
                      <div className="pt-3 border-t border-[#EAE3DA]/70 flex items-center justify-between">
                        <div className="flex gap-0.5">
                          {Array.from({ length: cake.stars }).map((_, s) =>
                            <Star key={s} size={13} fill="#C5943B" color="#C5943B" />
                          )}
                        </div>
                        <div className="text-right">
                          <div className="text-[10px] text-[#8A7B70] uppercase">Starts from</div>
                          <span className="text-[#A87828] font-black text-xl">₹{cake.basePrice}</span>
                          <span className="text-[#8A7B70] text-xs"> / 1 Pound</span>
                        </div>
                      </div>

                      <div className="text-[11px] text-[#8A7B70] mt-2 flex justify-between">
                        <span>Max 5 lb: ₹{cake.weights[cake.weights.length - 1].price}</span>
                        <span className="text-[#A87828] font-semibold">1 lb = 0.45 kg</span>
                      </div>

                      <button
                        className="mt-4 w-full btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                        onClick={(e) => { e.stopPropagation(); handleOpenCakeModal(cake) }}
                      >
                        <span>Choose Pound &amp; Personalize</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/menu" className="btn-primary text-xs px-8 py-3.5 font-bold rounded-2xl shadow-sm">
              View All 53 Handcrafted Cakes →
            </Link>
          </div>
        </div>
      </section>

      {/* ── INTERACTIVE POUND SCALE & SERVING SIZER (FULL SPACE, SPACIOUS) ── */}
      <section className="py-16 px-4 sm:px-8 lg:px-12 xl:px-16 w-full" id="interactive-scale">
        <div className="w-full max-w-[1600px] mx-auto">
          <InteractivePoundScale />
        </div>
      </section>

      {/* ── CATEGORIES: PLACED RIGHT IN THE MIDDLE OF THE WEBSITE FOR BEAUTIFUL BALANCE ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 w-full" id="categories-section">
        <div className="w-full max-w-[1600px] mx-auto">
          <div className="text-center mb-14 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#2C221E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              Explore Our Offerings
            </h2>
            <p className="text-[#73655D] text-sm md:text-base">
              From celebration tiered cakes to authentic desi ghee sweets and Sudha dairy
            </p>
          </div>

          {/* Spacious, evenly aligned 6-card grid in the middle of website */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
            {CATEGORIES.map((cat, i) => (
              <Link
                key={cat.label}
                to={cat.link}
                id={`category-${i}`}
                ref={el => catsRef.current[i] = el}
                className="cake-card p-4 sm:p-6 text-center cursor-pointer group transition-all duration-300 hover:-translate-y-2 hover:shadow-lg flex flex-col items-center justify-between h-full min-h-[190px]"
              >
                <div className="flex flex-col items-center gap-3 w-full my-auto">
                  <div
                    className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-3xl group-hover:scale-115 transition-transform duration-300 shadow-xs shrink-0"
                    style={{ backgroundColor: cat.bg }}
                  >
                    {cat.emoji}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-[#2C221E] tracking-tight leading-tight line-clamp-1">{cat.label}</div>
                  <div
                    className="text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full font-semibold"
                    style={{ backgroundColor: `${cat.color}15`, color: cat.color }}
                  >
                    {cat.count}+ varieties
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRADITIONAL SWEETS, SUDHA DAIRY & ROASTED SATTU SHOWCASE (IN-STORE ONLY · NO PRICE) ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 w-full bg-gradient-to-b from-transparent via-[#FAF4E8]/40 to-transparent">
        <div className="w-full max-w-[1600px] mx-auto">
          {/* Section Header */}
          <div className="text-center mb-14 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 text-xs text-[#8A6321] px-5 py-2 rounded-full mb-3 border border-[#D5C2B0] bg-white/90 backdrop-blur-md shadow-xs">
              <Store size={14} className="text-[#C5943B]" />
              <span className="font-bold">In-Store Counter Specialties</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#2C221E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
              <span className="shimmer-text">Desi Ghee Sweets,</span>{' '}
              <span className="text-[#2C221E]">Sudha Dairy &amp; Sattu</span>
            </h2>
            <p className="text-[#73655D] text-sm md:text-base leading-relaxed">
              Explore our freshly prepared traditional Indian confections, certified cold-chain Sudha milk products, and stone-ground Bihar sattu.
            </p>

            {/* MANDATORY USER SENTENCE BANNER */}
            <div className="mt-5 p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs sm:text-sm text-[#78350F] leading-relaxed shadow-xs">
              <strong>Notice:</strong> For purchase, please visit our store. Sudha dairy products, fresh roasted sattu, and traditional sweets are available exclusively for in-store pickup; only cakes will be delivered to your address!
            </div>
          </div>

          {/* 4-Card Responsive Grid for Sweets (NO PRICE WRITTEN) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
            {STORE_SWEETS_SHOWCASE.map((item) => (
              <div
                key={item.id}
                className="cake-card group flex flex-col justify-between overflow-hidden h-full"
              >
                <div className="flex flex-col h-full">
                  <div className="relative h-56 sm:h-60 overflow-hidden rounded-t-[26px] shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-700"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-white/90 backdrop-blur-md text-[#A87828] text-[11px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {item.tag}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="text-amber-200 font-bold text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 border border-amber-300/30">
                        <Store size={12} />
                        <span>Visit Store to Purchase</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-bold text-[#2C221E] text-base mb-2 leading-snug group-hover:text-[#A87828] transition-colors line-clamp-1"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.name}
                      </h3>
                      <p className="text-[#73655D] text-xs leading-relaxed line-clamp-2">
                        {item.visualLook}
                      </p>
                    </div>

                    <div className="pt-4 mt-auto">
                      <div className="pt-3 border-t border-[#EAE3DA]/70 mb-3 flex items-center justify-between text-xs text-[#8A7B70]">
                        <span className="font-semibold text-[#8A6321]">Fresh Daily Counter</span>
                        <span>Store Pickup</span>
                      </div>

                      <Link
                        to="/menu"
                        className="w-full bg-white hover:bg-[#FAF4E8] py-2.5 text-xs font-bold text-[#8A6321] border border-[#D5C2B0] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
                      >
                        <Store size={14} />
                        <span>View in Store Catalog</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE BHAWANI? ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1600px] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-[#2C221E]"
            style={{ fontFamily: "'Playfair Display', serif" }}>
            Why Families Trust Bhawani Sweets &amp; Bakery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Gift size={32} />, title: 'Personalized Custom Cake Text', desc: 'Complimentary message hand-piped in fresh cream on every celebration cake.', color: '#CB766F', bg: '#FBF0EE' },
              { icon: <Award size={32} />, title: '25+ Years Legacy of Trust', desc: 'Crafting smiles in Patna since 1998 using pure Sudha milk, pure desi ghee, and stone-ground sattu.', color: '#C5943B', bg: '#FAF4E8' },
              { icon: <Heart size={32} />, title: 'Fair Pricing (₹300 to ₹2,000)', desc: 'Clear pricing based on pound weight (1 Pound = 0.45 kg) — delicious cakes for every family budget.', color: '#758A73', bg: '#F0F5F0' },
            ].map((item, i) => (
              <div key={i} id={`why-${i}`} className="cake-card p-6 sm:p-8 text-center h-full flex flex-col items-center justify-between">
                <div className="flex justify-center mb-6">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center transition-transform hover:scale-110 shadow-xs"
                    style={{ backgroundColor: item.bg, color: item.color }}
                  >
                    {item.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-[#2C221E] mb-3"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h3>
                <p className="text-[#73655D] text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1600px] mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-16 text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} id={`testimonial-${i}`} className="cake-card p-6 sm:p-8 flex flex-col justify-between h-full">
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex gap-1 mb-4">
                      {Array.from({ length: t.stars }).map((_, s) =>
                        <Star key={s} size={15} fill="#C5943B" color="#C5943B" />
                      )}
                    </div>
                    <p className="text-[#5C4D42] text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                  </div>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-[#EAE3DA]/70 mt-auto">
                  <div className="text-3xl">{t.avatar}</div>
                  <div>
                    <div className="font-bold text-[#2C221E] text-sm">{t.name}</div>
                    <div className="text-xs text-[#8A7B70]">Patna, Bihar</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STORE VISIT & CONTACT INFO STRIP ── */}
      <section className="py-12 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
        <div className="w-full max-w-[1600px] mx-auto cake-card p-9">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: <Phone size={22} />, title: 'Call for Custom Orders', info: '+91 98765 43210', color: '#758A73' },
              { icon: <MapPin size={22} />, title: 'Bakery & Milk Parlour', info: 'Main Market Road, Patna, Bihar', color: '#5B8FB9' },
              { icon: <Clock size={22} />, title: 'Store Counter Timings', info: '7:00 AM – 10:30 PM Daily', color: '#C5943B' },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div style={{ color: item.color }}>{item.icon}</div>
                <div className="font-bold text-[#2C221E] text-sm">{item.title}</div>
                <div className="text-[#73655D] text-xs">{item.info}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="py-12 text-center text-[#8A7B70] text-sm border-t border-[#E8DFD5]/70 bg-white/60 backdrop-blur-md">
        <p className="mb-2 font-medium text-[#4A3D34]">🎂 <span className="font-bold">Bhawani Sweets &amp; Bakery</span> · Sudha Milk Parlour · Pure Sattu</p>
        <p className="text-xs">© {new Date().getFullYear()} All rights reserved. Handcrafted with love and calm elegance in Patna</p>
      </footer>

      {/* ── CAKE CUSTOMIZE & ORDER MODAL (POUNDS & 0.45 KG) ── */}
      {activeCard && (
        <div className="popup-overlay z-50 p-4" onClick={() => setActiveCard(null)}>
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full overflow-hidden border border-[#D5C2B0] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64">
              <img
                src={activeCard.img}
                alt={activeCard.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                className="absolute top-4 right-4 bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center text-[#2C221E] transition-all shadow-md z-10"
                onClick={() => setActiveCard(null)}
              >
                ✕
              </button>

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-xs px-3.5 py-1 rounded-full text-[#A87828] font-bold shadow-sm">
                  {activeCard.tag}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-amber-200 text-xs px-3 py-1 rounded-full border border-amber-300/40 font-semibold shadow-sm">
                  📏 1 Pound = 0.45 kg
                </span>
              </div>

              {/* Live Preview of Custom Writing over image */}
              {modalCustomWriting && (
                <div className="absolute inset-x-6 top-16 text-center pointer-events-none">
                  <div
                    className="inline-block bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-amber-300/50 text-amber-300 text-lg md:text-xl font-bold shadow-2xl"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    ✍️ "{modalCustomWriting}"
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {activeCard.name}
                  </h3>
                  <p className="text-xs text-white/80">{activeCard.flavor}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-white/70 block">Price</span>
                  <span className="text-amber-300 text-2xl font-black">
                    ₹{activeCard.weights.find(w => w.pounds === modalPounds)?.price.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#5C4D42] font-bold uppercase tracking-wider">
                    Select Cake Weight in Pounds:
                  </label>
                  <span className="text-[11px] text-[#A87828] font-bold bg-[#FAF4E8] px-2 py-0.5 rounded-md border border-[#C5943B]/30">
                    1 Pound = 0.45 kg
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {activeCard.weights.map(w => {
                    const isSelected = modalPounds === w.pounds
                    return (
                      <button
                        key={w.pounds}
                        type="button"
                        onClick={() => setModalPounds(w.pounds)}
                        className={`py-2 px-1 rounded-xl text-center transition-all border ${
                          isSelected
                            ? 'bg-[#FAF4E8] border-[#C5943B] text-[#A87828] ring-2 ring-[#C5943B]/30 font-bold shadow-sm'
                            : 'bg-white border-[#E5DACD] text-[#6E6259] hover:border-[#C5943B] text-xs'
                        }`}
                      >
                        <div className="text-xs font-bold">{w.label}</div>
                        <div className="text-[10px] text-[#8A7B70]">({w.kg})</div>
                        <div className="text-[11px] text-[#A87828] font-bold mt-0.5">₹{w.price}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Custom Writing on Cake */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="home-modal-custom-writing" className="text-xs text-[#A87828] font-bold flex items-center gap-1.5">
                    <Type size={14} />
                    <span>Personalized Icing Message</span>
                  </label>
                  <span className="text-[10px] text-[#8A7B70]">Piped in fresh frosting</span>
                </div>
                <input
                  id="home-modal-custom-writing"
                  type="text"
                  maxLength={40}
                  value={modalCustomWriting}
                  onChange={e => setModalCustomWriting(e.target.value)}
                  placeholder="e.g. Happy Birthday Aarav! 🎂"
                  className="fancy-input text-xs py-3"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  id="home-add-to-cart-btn"
                  className="btn-primary flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                  onClick={handleModalAddToCart}
                >
                  <ShoppingCart size={16} />
                  <span>
                    Add to Cart · ₹{activeCard.weights.find(w => w.pounds === modalPounds)?.price.toLocaleString()}
                  </span>
                </button>

                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hi Bhawani Bakery! I want to order ${activeCard.name} (${modalPounds} Pound, ${activeCard.weights.find(w => w.pounds === modalPounds)?.kg}, ₹${activeCard.weights.find(w => w.pounds === modalPounds)?.price}) with custom writing: "${modalCustomWriting || 'None'}"`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="glass px-5 py-3.5 rounded-full text-[#25D366] hover:bg-green-50 border border-[#D5C2B0] text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
