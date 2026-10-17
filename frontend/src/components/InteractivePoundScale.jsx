import { useState } from 'react'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import { Sparkles, ShoppingCart, MessageCircle, Scale, Type } from 'lucide-react'

const POUND_DATA = [
  {
    pounds: 1,
    label: '1 Pound',
    kg: '0.45 kg',
    serves: '4–6 slices',
    idealFor: 'Small birthdays & bento celebrations',
    basePrice: 350,
    visualScale: 0.85,
  },
  {
    pounds: 1.5,
    label: '1.5 Pound',
    kg: '0.68 kg',
    serves: '6–8 slices',
    idealFor: 'Family tea-time & intimate get-togethers',
    basePrice: 550,
    visualScale: 0.93,
  },
  {
    pounds: 2,
    label: '2 Pound',
    kg: '0.90 kg',
    serves: '10–12 slices',
    idealFor: 'Standard birthday & anniversary celebrations',
    basePrice: 850,
    visualScale: 1.0,
  },
  {
    pounds: 3,
    label: '3 Pound',
    kg: '1.35 kg',
    serves: '15–18 slices',
    idealFor: 'Milestone birthdays & family banquets',
    basePrice: 1250,
    visualScale: 1.08,
  },
  {
    pounds: 4,
    label: '4 Pound',
    kg: '1.80 kg',
    serves: '20–24 slices',
    idealFor: 'Office events & grand parties',
    basePrice: 1600,
    visualScale: 1.15,
  },
  {
    pounds: 5,
    label: '5 Pound',
    kg: '2.25 kg',
    serves: '28–32 slices',
    idealFor: 'Grand weddings & festive royal feasts',
    basePrice: 1950,
    visualScale: 1.22,
  },
]

// Black Forest removed as requested
const FLAVORS = [
  { name: 'Belgian Chocolate', color: '#4A2A20', text: '#FCE7F3' },
  { name: 'Red Velvet', color: '#FFE6EA', text: '#BE185D' },
  { name: 'Royal Vanilla', color: '#FFFDF0', text: '#A87828' },
  { name: 'Butterscotch', color: '#FEF3C7', text: '#92400E' },
]

export default function InteractivePoundScale() {
  const { addToCart } = useCart()
  const [selectedPounds, setSelectedPounds] = useState(2)
  const [flavor, setFlavor] = useState(FLAVORS[0])
  const [customWriting, setCustomWriting] = useState('Happy Celebration! 🎂')

  const currentPound = POUND_DATA.find(p => p.pounds === selectedPounds) || POUND_DATA[2]

  const handleAddToCart = () => {
    const item = {
      id: `interactive-${Date.now()}`,
      cartKey: `interactive-${currentPound.pounds}Pound-${customWriting.slice(0, 15)}`,
      name: `${currentPound.label} ${flavor.name} Cake`,
      price: currentPound.basePrice,
      img: '/images/Aesthatic.jpg',
      weight: `${currentPound.pounds} Pound`,
      flavor: flavor.name,
      customWriting,
      qty: 1,
    }
    addToCart(item, 1)
    toast.success(`${currentPound.label} cake added to cart!`, { icon: '🎂' })
  }

  return (
    <div className="cake-card p-8 sm:p-12 lg:p-14 w-full max-w-[1500px] mx-auto shadow-md my-8">
      {/* Top Header - Spacious & Clean */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10 pb-6 border-b border-[#E8DFD5]/80">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#A87828] bg-[#FAF4E8] px-4 py-1.5 rounded-full border border-[#D8C4B0] mb-2.5">
            <Scale size={14} />
            <span>Interactive Weight Scale &amp; Visual Sizer</span>
          </div>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
            Choose Your Cake in Pounds
          </h3>
          <p className="text-xs sm:text-sm text-[#73655D] mt-1.5">
            Pick your exact weight in Pounds and watch the cake scale, servings, and price adapt in real-time.
          </p>
        </div>

        {/* Side Area Conversion Badge */}
        <div className="bg-[#FAF4E8] border border-[#C5943B]/60 rounded-2xl px-6 py-3.5 text-center md:text-right shrink-0 shadow-xs">
          <div className="text-[11px] uppercase tracking-wider text-[#8A7B70] font-semibold">Standard Ratio</div>
          <div className="text-lg md:text-xl font-black text-[#A87828]">
            📏 1 Pound = 0.45 kg
          </div>
          <div className="text-[11px] text-[#73655D] font-medium">Exact weight guaranteed</div>
        </div>
      </div>

      {/* Main Interactive Grid - Full Space, Not Tightly Packed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        
        {/* Visual Animated Cake Simulator (Left 5 Cols) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-8 bg-white/70 rounded-3xl border border-[#E8DFD5] shadow-xs">
          <div className="text-xs font-semibold text-[#8A7B70] uppercase tracking-wider mb-6">
            Interactive Scale Simulation
          </div>

          <div className="relative w-64 h-64 sm:w-72 sm:h-72 flex items-center justify-center">
            {/* Ambient ring */}
            <div className="absolute inset-0 rounded-full border-2 border-dashed border-[#C5943B]/30 animate-spin" style={{ animationDuration: '40s' }} />

            {/* Cake Base that dynamically scales with selected Pounds */}
            <div
              className="rounded-full shadow-2xl transition-all duration-500 ease-out flex flex-col items-center justify-center text-center p-6 border-4 border-white/80"
              style={{
                width: `${180 * currentPound.visualScale}px`,
                height: `${180 * currentPound.visualScale}px`,
                backgroundColor: flavor.color,
                boxShadow: `0 18px 40px rgba(60, 45, 30, 0.18), inset 0 6px 12px rgba(255,255,255,0.4), inset 0 -6px 12px rgba(0,0,0,0.2)`,
              }}
            >
              <div className="text-[10px] uppercase font-bold tracking-widest opacity-70 mb-0.5" style={{ color: flavor.text }}>
                {currentPound.label}
              </div>
              <div
                className="text-base sm:text-lg font-bold leading-tight select-none px-2 drop-shadow"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: flavor.text,
                }}
              >
                {customWriting || 'Your Custom Wish Here'}
              </div>
              <div className="text-[11px] font-bold opacity-80 mt-1" style={{ color: flavor.text }}>
                {currentPound.kg}
              </div>
            </div>
          </div>

          <div className="mt-5 text-center">
            <span className="text-sm font-bold text-[#2C221E]">{currentPound.label} ({currentPound.kg})</span>
          </div>
        </div>

        {/* Controls & Selectors (Right 7 Cols) - Spacious Spacing */}
        <div className="lg:col-span-7 space-y-6">

          {/* 1. Pound Weight Selector Chips */}
          <div>
            <div className="flex items-center justify-between mb-2.5">
              <label className="text-xs font-bold uppercase tracking-wider text-[#5C4D42]">
                Select Weight in Pounds:
              </label>
              <span className="text-xs font-bold text-[#A87828]">
                1 Pound = 0.45 kg
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {POUND_DATA.map(p => {
                const isSelected = selectedPounds === p.pounds
                return (
                  <button
                    key={p.pounds}
                    type="button"
                    onClick={() => setSelectedPounds(p.pounds)}
                    className={`p-4 rounded-2xl text-left transition-all border ${
                      isSelected
                        ? 'bg-[#FAF4E8] border-[#C5943B] ring-2 ring-[#C5943B]/40 shadow-sm'
                        : 'bg-white border-[#E5DACD] hover:bg-white text-[#6E6259]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className={`font-bold text-sm ${isSelected ? 'text-[#A87828]' : 'text-[#2C221E]'}`}>
                        {p.label}
                      </span>
                      <span className="text-xs font-black text-[#A87828]">
                        ₹{p.basePrice}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-[#8A7B70]">
                      {p.kg}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* 2. Flavor & Real-Time Color Reaction (Black Forest removed) */}
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-[#5C4D42] mb-2.5 block">
              Choose Flavor:
            </label>
            <div className="flex flex-wrap gap-2.5">
              {FLAVORS.map(f => (
                <button
                  key={f.name}
                  type="button"
                  onClick={() => setFlavor(f)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2 border transition-all ${
                    flavor.name === f.name
                      ? 'bg-white border-[#C5943B] text-[#A87828] shadow-xs'
                      : 'bg-white/80 border-[#E0D5C7] text-[#6E6259] hover:bg-white'
                  }`}
                >
                  <span className="w-3.5 h-3.5 rounded-full border border-black/10" style={{ backgroundColor: f.color }} />
                  <span>{f.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Custom Writing on Cake (Piped live in cream removed) */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="interactive-cake-writing" className="text-xs font-bold text-[#A87828] flex items-center gap-1.5">
                <Type size={14} />
                <span>What to Write on Your Cake?</span>
              </label>
            </div>
            <input
              id="interactive-cake-writing"
              type="text"
              maxLength={40}
              value={customWriting}
              onChange={e => setCustomWriting(e.target.value)}
              placeholder="e.g. Happy 25th Birthday Rhea! 💖"
              className="fancy-input text-xs py-3.5"
            />
          </div>

          {/* 4. Action Bar */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-4">
            <button
              type="button"
              onClick={handleAddToCart}
              className="btn-primary w-full sm:flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2"
            >
              <ShoppingCart size={17} />
              <span>Add {currentPound.label} Cake to Cart · ₹{currentPound.basePrice}</span>
            </button>

            <a
              href={`https://wa.me/919876543210?text=${encodeURIComponent(
                `Hi Bhawani Bakery! I would like to order a ${currentPound.label} (${currentPound.kg}) ${flavor.name} cake (₹${currentPound.basePrice}) with custom writing: "${customWriting}"`
              )}`}
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto bg-white px-6 py-4 rounded-full text-[#25D366] hover:bg-green-50 border border-[#D5C2B0] text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-xs"
            >
              <MessageCircle size={17} />
              <span>WhatsApp Order</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  )
}
