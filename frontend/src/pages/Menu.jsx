import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import {
  Star, Heart, Search, Filter, ShoppingCart, MessageCircle,
  Type, Sparkles, ChevronRight, SlidersHorizontal, Scale,
  Store, MapPin, Clock, ShieldCheck
} from 'lucide-react'
import { ALL_ITEMS, CATEGORIES, POUND_WEIGHTS, calcPrice } from '../data/catalogData'

const SORT_OPTIONS = ['Default', 'Price: Low to High', 'Price: High to Low', 'Highest Rated']

export default function Menu() {
  const { addToCart } = useCart()
  const [activeCategory, setActiveCategory] = useState('All')
  const [sort, setSort] = useState('Default')
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState(2000)
  const [favorites, setFavorites] = useState(new Set())
  const [selectedCake, setSelectedCake] = useState(null)
  const [selectedSweet, setSelectedSweet] = useState(null)
  const [selectedWeight, setSelectedWeight] = useState(1)
  const [customWriting, setCustomWriting] = useState('')

  const gridRef = useRef(null)
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  const filtered = ALL_ITEMS
    .filter(item => (activeCategory === 'All' || item.category === activeCategory))
    .filter(item => {
      const q = search.toLowerCase()
      return item.name.toLowerCase().includes(q) ||
        (item.flavor && item.flavor.toLowerCase().includes(q)) ||
        (item.desc && item.desc.toLowerCase().includes(q))
    })
    .filter(item => {
      if (item.itemType === 'store_only') return true
      return item.basePrice <= maxPrice
    })
    .sort((a, b) => {
      if (sort === 'Price: Low to High') {
        const pA = a.basePrice || 9999
        const pB = b.basePrice || 9999
        return pA - pB
      }
      if (sort === 'Price: High to Low') {
        const pA = a.basePrice || 0
        const pB = b.basePrice || 0
        return pB - pA
      }
      if (sort === 'Highest Rated') return b.stars - a.stars
      return 0
    })

  const toggleFav = (id) => {
    setFavorites(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
    toast.success('Updated favorite items!', { icon: '💖' })
  }

  const handleCategoryChange = (catId) => {
    gsap.to(gridRef.current, {
      opacity: 0, y: 10, duration: 0.2,
      onComplete: () => {
        setActiveCategory(catId)
        gsap.to(gridRef.current, { opacity: 1, y: 0, duration: 0.35 })
      }
    })
  }

  const handleItemClick = (item) => {
    if (item.itemType === 'store_only') {
      setSelectedSweet(item)
    } else {
      setSelectedCake(item)
      setSelectedWeight(1)
      setCustomWriting('')
    }
  }

  const handleAddToCart = () => {
    if (!selectedCake) return
    const price = calcPrice(selectedCake.basePrice, selectedWeight)

    const item = {
      id: selectedCake.id,
      cartKey: `${selectedCake.id}-${selectedWeight}Pound-${customWriting.slice(0, 15)}`,
      name: selectedCake.name,
      price,
      img: selectedCake.img,
      weight: `${selectedWeight} Pound`,
      customWriting,
      flavor: selectedCake.flavor,
      designTier: selectedCake.designTier,
      qty: 1,
    }

    addToCart(item, 1)
    setSelectedCake(null)
  }

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
      <div className="w-full max-w-[1600px] mx-auto">

        {/* ── EXPANSIVE HEADER ── */}
        <div ref={titleRef} className="text-center mb-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-[#8A6321] px-5 py-2 rounded-full mb-3 border border-[#D5C2B0] bg-white/90 backdrop-blur-md shadow-xs">
            <Sparkles size={14} className="text-[#C5943B]" />
            <span className="font-semibold">Complete Catalog: 53 Handcrafted Cakes &amp; 15 In-Store Specialties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C221E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="shimmer-text">Cakes &amp; Sweets</span>
            <span className="text-[#2C221E]"> Collection</span>
          </h1>
        </div>

        {/* ── DYNAMIC TRAIN-LIKE MOVING TICKER (LEFT-TO-RIGHT IN ONE SINGLE CONTINUOUS LINE) ── */}
        <div className="w-full overflow-hidden py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#FAF3E8] via-white to-[#FAF3E8] border border-[#E2D8CC] shadow-xs mb-8 select-none">
          <div className="train-ticker-track flex items-center gap-12 text-xs sm:text-sm font-bold text-[#8A6321] whitespace-nowrap">
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-base">🚂</span>
              <span>Order custom handcrafted cakes delivered to your door in Pound weights, or explore our freshly prepared traditional sweets, pure Sudha milk, and authentic roasted sattu available at our store</span>
              <span className="text-[#C5943B] font-black">✦</span>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-base">🚂</span>
              <span>Order custom handcrafted cakes delivered to your door in Pound weights, or explore our freshly prepared traditional sweets, pure Sudha milk, and authentic roasted sattu available at our store</span>
              <span className="text-[#C5943B] font-black">✦</span>
            </div>
          </div>
        </div>

        {/* ── STORE VISIT & DELIVERY NOTICE BANNER ── */}
        <div className="w-full p-5 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E2D8CC] shadow-xs mb-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-[#C5943B] to-[#D8827B] text-white flex items-center justify-center shrink-0 shadow-xs text-lg">
              🏬
            </div>
            <div>
              <span className="font-bold text-[#8A6321] text-sm sm:text-base block">Store Purchase Notice:</span>
              <p className="text-xs sm:text-sm text-[#5C4D42] mt-0.5 font-medium leading-relaxed">
                <strong>Only cakes will be delivered</strong> directly to your doorstep in Pound weights. For <strong>Sudha dairy products, fresh roasted sattu, and traditional sweets</strong>, for purchase please visit our store!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="px-4 py-2 rounded-2xl bg-[#FAF4E8] border border-[#C5943B]/40 shadow-xs flex items-center gap-2">
              <Scale size={16} className="text-[#C5943B]" />
              <div className="text-right">
                <span className="text-[10px] text-[#8A7B70] uppercase block leading-none">Standard Ratio</span>
                <span className="text-xs font-black text-[#8A6321]">1 Pound = 0.45 kg</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEARCH + BUDGET SLIDER + SORT (FULL LAYOUT) ── */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8 w-full">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7B70]" />
            <input
              id="cake-search"
              type="text"
              placeholder="Search across all 53 cakes and 15 sweets by name, flavor, or ingredients..."
              className="fancy-input pl-11 py-3.5 text-sm shadow-xs bg-white/90 backdrop-blur-md w-full"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>

          {/* Budget ceiling for cakes */}
          <div className="flex items-center justify-between gap-3 bg-white/90 backdrop-blur-md px-5 py-3 rounded-2xl border border-[#E2D8CC] shadow-xs">
            <div className="flex items-center gap-2 text-xs text-[#5C4D42] font-bold">
              <SlidersHorizontal size={15} className="text-[#C5943B]" />
              <span>Cake Budget:</span>
            </div>
            <input
              id="price-range-slider"
              type="range"
              min="300"
              max="2000"
              step="50"
              value={maxPrice}
              onChange={e => setMaxPrice(Number(e.target.value))}
              className="accent-[#C5943B] cursor-pointer w-32 sm:w-44"
            />
            <span className="text-xs font-black text-[#A87828] min-w-[60px] text-right">
              ≤ ₹{maxPrice}
            </span>
          </div>

          {/* Sort Dropdown */}
          <div className="relative">
            <Filter size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8A7B70]" />
            <select
              id="cake-sort"
              className="fancy-input pl-10 pr-8 py-3.5 text-sm appearance-none cursor-pointer min-w-[200px] shadow-xs bg-white/90 backdrop-blur-md"
              value={sort}
              onChange={e => setSort(e.target.value)}
            >
              {SORT_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {/* ── SPACIOUS, ELEGANT CATEGORY PILLS ── */}
        <div className="w-full mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5 p-2.5 rounded-3xl bg-white/90 backdrop-blur-md border border-[#E2D8CC] shadow-xs">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat.id
              return (
                <button
                  key={cat.id}
                  id={`cat-${cat.id}`}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C5943B] to-[#D8827B] text-white shadow-sm font-bold scale-102'
                      : 'text-[#6E6259] hover:text-[#2C221E] hover:bg-[#FAF4E8]'
                  }`}
                >
                  <span className="text-base">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Showing Count */}
        <div className="flex items-center justify-between text-xs text-[#73655D] mb-6 px-2">
          <span>
            Showing <strong className="text-[#2C221E] font-bold">{filtered.length}</strong> creations
            {activeCategory !== 'All' && <span className="text-[#A87828] ml-1 font-semibold">in {activeCategory}</span>}
          </span>
          <span className="text-[#8A6321] font-medium hidden sm:inline">
            ✨ Pure ingredients &amp; artisanal hygiene standards
          </span>
        </div>

        {/* ── CALM CAKE TILES WITH INTERACTIVE HOVER EFFECT & CRISP VISIBILITY ── */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 sm:gap-7 w-full">
          {filtered.map((item) => {
            const isStoreOnly = item.itemType === 'store_only'
            const price1Pound = item.basePrice || 0
            const price5Pounds = item.basePrice ? calcPrice(item.basePrice, 5) : 0

            return (
              <div
                key={item.id}
                id={`item-card-${item.id}`}
                className="cake-card group cursor-pointer flex flex-col justify-between h-full overflow-hidden"
                onClick={() => handleItemClick(item)}
              >
                <div className="flex flex-col justify-between h-full">
                  {/* Image Container with Smooth Hover Zoom */}
                  <div className="relative h-52 sm:h-56 overflow-hidden rounded-t-[26px] bg-stone-100 shrink-0">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                      onError={e => { e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />

                    {/* Favorite Heart */}
                    <div className="absolute top-3.5 right-3.5">
                      <button
                        onClick={e => { e.stopPropagation(); toggleFav(item.id) }}
                        className={`bg-white/90 backdrop-blur-md w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-xs ${
                          favorites.has(item.id) ? 'text-[#CB766F]' : 'text-[#8A7B70] hover:text-[#CB766F]'
                        }`}
                      >
                        <Heart size={14} fill={favorites.has(item.id) ? 'currentColor' : 'none'} />
                      </button>
                    </div>

                    {/* Category Tag */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className="bg-white/90 backdrop-blur-md text-[11px] px-3 py-1 rounded-full text-[#A87828] font-bold shadow-xs">
                        {item.category}
                      </span>
                    </div>

                    {/* Bottom overlay badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                      {isStoreOnly ? (
                        <span className="text-amber-200 font-bold text-[11px] bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md flex items-center gap-1 border border-amber-300/30">
                          <Store size={12} />
                          <span>Visit Store to Purchase</span>
                        </span>
                      ) : (
                        <>
                          <span className="text-white font-medium text-[11px] bg-black/50 backdrop-blur-md px-2.5 py-0.5 rounded-md">
                            1 to 5 Pounds
                          </span>
                          <span className="text-amber-200 text-[11px] font-semibold bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-md">
                            Custom Writing ✍️
                          </span>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3
                        className="font-bold text-[#2C221E] text-base leading-tight mb-1 line-clamp-1 group-hover:text-[#A87828] transition-colors"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                      >
                        {item.name}
                      </h3>

                      {/* Description or Flavor */}
                      <p className="text-[#73655D] text-xs mb-3 line-clamp-2 leading-relaxed min-h-[32px]">
                        {item.visualLook || item.desc}
                      </p>
                    </div>

                    {/* Pricing / Store Notice Area + Button */}
                    <div className="mt-auto">
                      <div className="pt-3 border-t border-[#EAE3DA]/70">
                        {isStoreOnly ? (
                          <div>
                            <div className="flex items-center gap-1 text-[11px] text-[#A87828] font-bold">
                              <Store size={13} />
                              <span>In-Store Counter Exclusive</span>
                            </div>
                            <div className="text-[10px] text-[#73655D] mt-0.5">
                              Visit our store for fresh pickup
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center justify-between">
                            <div className="flex gap-0.5">
                              {Array.from({ length: item.stars }).map((_, s) =>
                                <Star key={s} size={12} fill="#C5943B" color="#C5943B" />
                              )}
                            </div>
                            <div className="text-right">
                              <div className="text-[10px] text-[#8A7B70] uppercase">Starts from</div>
                              <span className="text-[#A87828] font-black text-lg">₹{price1Pound}</span>
                              <span className="text-[#8A7B70] text-[10px]"> / 1 Pound</span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Action Button */}
                      {isStoreOnly ? (
                        <button
                          className="mt-3.5 w-full bg-white hover:bg-[#FAF4E8] py-2.5 text-xs font-bold text-[#8A6321] border border-[#D5C2B0] rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-xs"
                          onClick={e => { e.stopPropagation(); handleItemClick(item) }}
                        >
                          <Store size={14} />
                          <span>View Store Availability</span>
                        </button>
                      ) : (
                        <button
                          className="mt-3.5 w-full btn-primary py-2.5 text-xs font-bold flex items-center justify-center gap-1.5"
                          onClick={e => { e.stopPropagation(); handleItemClick(item) }}
                        >
                          <span>Choose Pound &amp; Order</span>
                          <ChevronRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-[#8A7B70]">
            <div className="text-5xl mb-4">🔍</div>
            <p className="text-base font-semibold text-[#4A3D34]">No creations found matching your filter.</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); setMaxPrice(2000) }}
              className="mt-4 btn-primary text-xs px-6 py-2.5"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* ── MODAL 1: STORE VISIT SWEETS & SUDHA PRODUCTS (NO PRICE WRITTEN) ── */}
      {selectedSweet && (
        <div className="popup-overlay z-50 p-4" onClick={() => setSelectedSweet(null)}>
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full overflow-hidden border border-[#D5C2B0] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64 sm:h-72">
              <img
                src={selectedSweet.img}
                alt={selectedSweet.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=500&q=80' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

              <button
                className="absolute top-4 right-4 bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center text-[#2C221E] transition-all shadow-md z-10"
                onClick={() => setSelectedSweet(null)}
              >
                ✕
              </button>

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-xs px-3.5 py-1 rounded-full text-[#A87828] font-bold shadow-sm">
                  {selectedSweet.category}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-amber-200 text-xs px-3 py-1 rounded-full border border-amber-300/40 font-semibold shadow-sm">
                  🏬 In-Store Pickup Only
                </span>
              </div>

              <div className="absolute bottom-4 left-6 right-6">
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-tight"
                  style={{ fontFamily: "'Playfair Display', serif" }}>
                  {selectedSweet.name}
                </h3>
                <p className="text-xs text-amber-200/90 mt-1 flex items-center gap-1">
                  <ShieldCheck size={14} />
                  <span>Fresh Daily Batch · Desi Ghee &amp; Certified Dairy</span>
                </p>
              </div>
            </div>

            {/* Modal Body: Drives Visual Look & Experience (NO PRICE) */}
            <div className="p-6 space-y-4">
              <div className="p-4 rounded-2xl bg-[#FAF4E8] border border-[#D5C2B0]/80">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8A6321] mb-1 flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>Visual Appearance &amp; Texture:</span>
                </div>
                <p className="text-xs text-[#4A3D34] leading-relaxed">
                  {selectedSweet.visualLook || selectedSweet.desc}
                </p>
              </div>

              {/* Mandatory User Sentence */}
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-xs text-[#78350F] leading-relaxed">
                <div className="font-bold flex items-center gap-1.5 mb-1 text-sm text-[#92400E]">
                  <Store size={16} />
                  <span>Purchase &amp; Availability Notice</span>
                </div>
                <p>
                  <strong>For purchase, please visit our store.</strong> Sudha dairy products, fresh roasted sattu, and traditional sweets are available exclusively for in-store pickup; only cakes will be delivered to your address!
                </p>
              </div>

              {/* Store Details Box */}
              <div className="grid grid-cols-2 gap-3 text-xs text-[#5C4D42]">
                <div className="p-3 rounded-xl bg-white border border-[#E8DFD5] flex items-center gap-2">
                  <Clock size={16} className="text-[#C5943B] shrink-0" />
                  <div>
                    <span className="font-bold block text-[#2C221E]">Store Hours</span>
                    <span className="text-[11px]">7:00 AM – 10:30 PM Daily</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-white border border-[#E8DFD5] flex items-center gap-2">
                  <MapPin size={16} className="text-[#C5943B] shrink-0" />
                  <div>
                    <span className="font-bold block text-[#2C221E]">Location</span>
                    <span className="text-[11px]">Bhawani Sweets, Main Road</span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Namaste Bhawani Sweets! I am inquiring about the availability of ${selectedSweet.name} at your store counter today.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full btn-primary py-3 text-xs font-bold flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Store to Inquire Availability</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MODAL 2: CAKE SELECTION & CUSTOM WRITING MODAL ── */}
      {selectedCake && (
        <div className="popup-overlay z-50 p-4" onClick={() => setSelectedCake(null)}>
          <div
            className="bg-white/95 backdrop-blur-xl rounded-3xl max-w-lg w-full overflow-hidden border border-[#D5C2B0] shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            {/* Modal Image Header */}
            <div className="relative h-64">
              <img
                src={selectedCake.img}
                alt={selectedCake.name}
                className="w-full h-full object-cover"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=500&q=80' }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

              <button
                className="absolute top-4 right-4 bg-white/80 hover:bg-white w-9 h-9 rounded-full flex items-center justify-center text-[#2C221E] transition-all shadow-md z-10"
                onClick={() => setSelectedCake(null)}
              >
                ✕
              </button>

              <div className="absolute top-4 left-4 flex gap-2">
                <span className="bg-white/90 backdrop-blur-md text-xs px-3.5 py-1 rounded-full text-[#A87828] font-bold shadow-sm">
                  {selectedCake.category}
                </span>
                <span className="bg-black/60 backdrop-blur-md text-amber-200 text-xs px-3 py-1 rounded-full border border-amber-300/40 font-semibold shadow-sm">
                  📏 1 Pound = 0.45 kg
                </span>
              </div>

              {/* Live Preview of Custom Writing over image */}
              {customWriting && (
                <div className="absolute inset-x-6 top-16 text-center pointer-events-none">
                  <div
                    className="inline-block bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-2xl border border-amber-300/50 text-amber-300 text-lg md:text-xl font-bold shadow-2xl"
                    style={{ fontFamily: "'Dancing Script', cursive" }}
                  >
                    ✍️ "{customWriting}"
                  </div>
                </div>
              )}

              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white leading-tight"
                    style={{ fontFamily: "'Playfair Display', serif" }}>
                    {selectedCake.name}
                  </h3>
                  <p className="text-xs text-white/80">{selectedCake.flavor}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase text-white/70 block">Calculated Price</span>
                  <span className="text-amber-300 text-2xl font-black">
                    ₹{calcPrice(selectedCake.basePrice, selectedWeight).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-5">
              <p className="text-xs text-[#73655D] leading-relaxed">
                {selectedCake.desc}
              </p>

              {/* 1. Pound Weight Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs text-[#5C4D42] font-bold uppercase tracking-wider">
                    Select Weight in Pounds:
                  </label>
                  <span className="text-[11px] text-[#A87828] font-bold bg-[#FAF4E8] px-2 py-0.5 rounded-md border border-[#C5943B]/30">
                    1 Pound = 0.45 kg
                  </span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {POUND_WEIGHTS.map(pounds => {
                    const price = calcPrice(selectedCake.basePrice, pounds)
                    const isSelected = selectedWeight === pounds
                    const kgApprox = (pounds * 0.45).toFixed(2).replace(/\.00$/, '')
                    return (
                      <button
                        key={pounds}
                        type="button"
                        onClick={() => setSelectedWeight(pounds)}
                        className={`py-2 px-1 rounded-xl text-center transition-all border ${
                          isSelected
                            ? 'bg-[#FAF4E8] border-[#C5943B] text-[#A87828] ring-2 ring-[#C5943B]/30 font-bold shadow-sm'
                            : 'bg-white border-[#E5DACD] text-[#6E6259] hover:border-[#C5943B] text-xs'
                        }`}
                      >
                        <div className="text-xs font-bold">{pounds} Pound{pounds > 1 ? 's' : ''}</div>
                        <div className="text-[10px] text-[#8A7B70]">({kgApprox} kg)</div>
                        <div className="text-[11px] text-[#A87828] font-bold mt-0.5">₹{price}</div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* 2. Custom Writing on Cake */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label htmlFor="menu-cake-custom-writing" className="text-xs text-[#A87828] font-bold flex items-center gap-1.5">
                    <Type size={14} />
                    <span>Personalized Icing Message</span>
                  </label>
                  <span className="text-[10px] text-[#8A7B70]">Piped in fresh frosting</span>
                </div>
                <input
                  id="menu-cake-custom-writing"
                  type="text"
                  maxLength={40}
                  value={customWriting}
                  onChange={e => setCustomWriting(e.target.value)}
                  placeholder="e.g. Happy Birthday Aarav! 🎂"
                  className="fancy-input text-xs py-3"
                />
              </div>

              {/* Action buttons */}
              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  id="menu-add-to-cart-btn"
                  className="btn-primary flex-1 py-3.5 text-sm font-bold flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart size={16} />
                  <span>
                    Add to Cart · ₹{calcPrice(selectedCake.basePrice, selectedWeight).toLocaleString()}
                  </span>
                </button>

                <a
                  href={`https://wa.me/919876543210?text=${encodeURIComponent(
                    `Hi Bhawani Bakery! I want to order ${selectedCake.name} (${selectedWeight} Pound, ${(selectedWeight * 0.45).toFixed(2)} kg, ₹${calcPrice(
                      selectedCake.basePrice,
                      selectedWeight
                    )}) with custom writing: "${customWriting || 'None'}"`
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
