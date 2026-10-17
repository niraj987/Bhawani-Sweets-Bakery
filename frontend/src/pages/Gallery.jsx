import { useState, useRef, useEffect } from 'react'
import gsap from 'gsap'
import WaterTile from '../components/WaterTile'
import { Sparkles, Scale, Maximize2, X, Store } from 'lucide-react'

const GALLERY_IMAGES = [
  {
    src: '/images/Elegant half-chocolate drip cake with smooth white frosting, pearl sprinkles, fresh strawberries, and chocolate shards - perfect for birthday or anniversary celebrations_ ?????_#CakeDesign #ChocolateDripCake #Birth.jpg',
    label: 'Half-Choco Drip & Pearls',
    tag: 'Signature Cakes',
    span: 'col-span-2 row-span-2'
  },
  {
    src: '/sweets/IMG20250717171941.jpg',
    label: 'Royal Shahi Gulab Jamun & Rasgullas',
    tag: 'Traditional Sweets',
    isStoreOnly: true,
  },
  {
    src: '/images/Decadent Black Forest Cake with Cherries & Chocolate _ Classic German Dessert.jpg',
    label: 'Decadent Black Forest',
    tag: 'Chocolate Cakes'
  },
  {
    src: '/sweets/IMG20250728175136.jpg',
    label: 'Diamond Kaju Katli Platter',
    tag: 'Traditional Sweets',
    isStoreOnly: true,
  },
  {
    src: '/images/White Chocolate Dream Cake.jpg',
    label: 'White Chocolate Dream',
    tag: 'Anniversary Cakes'
  },
  {
    src: '/sweets/IMG20250728175210.jpg',
    label: 'Sudha Milk & Paneer Counter',
    tag: 'Sudha & Sattu',
    isStoreOnly: true,
  },
  {
    src: '/images/Rich Chocolate Layer Cake with Chocolate Buttercream.jpg',
    label: 'Rich Chocolate Layer Cake',
    tag: 'Chocolate Cakes',
    span: 'md:col-span-2'
  },
  {
    src: '/sweets/IMG20250728181609.jpg',
    label: 'Stone-Ground Roasted Sattu',
    tag: 'Sudha & Sattu',
    isStoreOnly: true,
  },
  {
    src: '/images/annie-spratt-_4iLsr5p-dY-unsplash.jpg',
    label: 'Floral Masterpiece',
    tag: 'Floral Cakes'
  },
  {
    src: '/sweets/IMG20250902185940.jpg',
    label: 'Pure Desi Ghee Motichoor Laddoos',
    tag: 'Traditional Sweets',
    isStoreOnly: true,
  },
  {
    src: '/images/The BEST Ever Black Forest Cake Recipe.jpg',
    label: 'Black Forest Royale',
    tag: 'Birthday Cakes'
  },
  {
    src: '/sweets/IMG20250918124051.jpg',
    label: 'Sudha Malai Chamcham Rolls',
    tag: 'Traditional Sweets',
    isStoreOnly: true,
  },
  {
    src: '/images/Simple Red & White Anniversary Cake Design _ Elegant Romantic Celebration Cake.jpg',
    label: 'Red & White Velvet Romance',
    tag: 'Anniversary Cakes',
    span: 'md:col-span-2'
  },
  {
    src: '/sweets/Snapchat-408523351.jpg',
    label: 'Chilled Kesar Pista Rasmalai',
    tag: 'Traditional Sweets',
    isStoreOnly: true,
  },
  {
    src: '/images/Budget friendly cake._#hallicake_temptations #hallicakes #whippedcreamcake #bakerinsagamu #ogunbaker #ogunvendors #sagamuvendor #sagamuvendors #simplecakes #whitecakes #babcockbaker #onifaaritribe #whippedcreamfrosting',
    label: 'Budget Bento Cream Cake',
    tag: 'Birthday Cakes'
  },
  {
    src: '/images/_Adorable bear‑face bento cake with smooth white frosting, chocolate ears & paws, and pink cheek accents_ Perfect for birthday celebrations or cute snack boxes! 🍰💖_ #BentoCake #CuteCake #BearCake #CakeDesign #Des.jpg',
    label: 'Bear Face Cute Bento',
    tag: 'Birthday Cakes'
  },
  {
    src: '/sweets/Snapchat-1640197804.jpg',
    label: 'Sudha Granular Cow Ghee',
    tag: 'Sudha & Sattu',
    isStoreOnly: true,
  },
  {
    src: '/images/chocolate truffle cake.jpg',
    label: 'Belgian Truffle Mirror Glaze',
    tag: 'Chocolate Cakes'
  },
]

const FILTER_TAGS = ['All', 'Signature Cakes', 'Birthday Cakes', 'Anniversary Cakes', 'Chocolate Cakes', 'Traditional Sweets', 'Sudha & Sattu']

export default function Gallery() {
  const [activeTag, setActiveTag] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const titleRef = useRef(null)

  useEffect(() => {
    gsap.fromTo(titleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    )
  }, [])

  const filteredImages = GALLERY_IMAGES.filter(img => activeTag === 'All' || img.tag === activeTag)

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-8 lg:px-12 xl:px-16 w-full">
      <div className="w-full max-w-[1600px] mx-auto">
        {/* Header */}
        <div ref={titleRef} className="text-center mb-8 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs text-[#8A6321] px-5 py-2 rounded-full mb-3 border border-white/60 bg-white/50 backdrop-blur-md shadow-xs">
            <Sparkles size={14} className="text-[#C5943B]" />
            <span>Handcrafted Cakes &amp; In-Store Sweet Specialties</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#2C221E] mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
            <span className="shimmer-text">Artisanal</span>
            <span className="text-[#2C221E]"> Gallery</span>
          </h1>
          <p className="text-[#73655D] text-sm md:text-base leading-relaxed">
            A visual showcase of our celebration tiered cakes, fresh pure desi ghee sweets, and dairy confections.
          </p>
        </div>

        {/* Side / Top Info Bar */}
        <div className="w-full mb-8 p-4 rounded-2xl bg-white/50 backdrop-blur-md border border-[#E2D8CC]/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 text-xs sm:text-sm text-[#4A3D34]">
            <Scale size={18} className="text-[#C5943B] shrink-0" />
            <span className="font-bold text-[#8A6321]">Cakes Sizing:</span>
            <span className="px-3 py-1 rounded-full bg-[#FAF4E8]/90 border border-[#C5943B]/40 font-black text-[#8A6321] text-xs sm:text-sm">
              📏 1 Pound = 0.45 kg
            </span>
            <span className="text-xs text-[#73655D] hidden md:inline">
              (Cakes delivered to doorstep · Sweets, Sudha dairy, and sattu available for store pickup)
            </span>
          </div>
          <div className="text-xs font-semibold text-[#8A6321] flex items-center gap-1.5">
            <Store size={14} />
            <span>Store hours: 7:00 AM – 10:30 PM Daily</span>
          </div>
        </div>

        {/* Spacious Filter Pills */}
        <div className="w-full mb-10">
          <div className="flex flex-wrap items-center justify-center gap-2.5 p-2 rounded-3xl bg-white/50 backdrop-blur-md border border-[#E2D8CC]/80 shadow-xs">
            {FILTER_TAGS.map(tag => {
              const isActive = activeTag === tag
              return (
                <button
                  key={tag}
                  id={`gallery-filter-${tag}`}
                  onClick={() => setActiveTag(tag)}
                  className={`px-5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'bg-gradient-to-r from-[#C5943B] to-[#D8827B] text-white shadow-md font-bold'
                      : 'text-[#6E6259] hover:text-[#2C221E] hover:bg-white/70'
                  }`}
                >
                  {tag}
                </button>
              )
            })}
          </div>
        </div>

        {/* Masonry Grid with 0.5 Opacity Frosted Surrounds */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4 auto-rows-[200px] sm:auto-rows-[230px] w-full">
          {filteredImages.map((img, i) => (
            <WaterTile
              key={i}
              id={`gallery-img-${i}`}
              className={`rounded-2xl overflow-hidden cursor-pointer group bg-white/50 backdrop-blur-md border border-white/60 shadow-xs hover:shadow-md ${img.span || ''}`}
              onClick={() => setLightbox(img)}
            >
              <div className="relative w-full h-full">
                <img
                  src={img.src}
                  alt={img.label}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700"
                  onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=400&q=80' }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-3 left-3">
                  <span className="bg-black/60 backdrop-blur-md text-amber-200 text-[10px] px-2.5 py-1 rounded-full font-semibold border border-amber-300/30">
                    {img.tag}
                  </span>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                  <span className="text-white text-xs md:text-sm font-bold drop-shadow-md line-clamp-1">
                    {img.label}
                  </span>
                  <div className="bg-white/30 backdrop-blur-md w-7 h-7 rounded-full flex items-center justify-center text-white shrink-0">
                    <Maximize2 size={13} />
                  </div>
                </div>
              </div>
            </WaterTile>
          ))}
        </div>
      </div>

      {/* Lightbox Modal (0.5 Opacity Frosted Glass) */}
      {lightbox && (
        <div className="popup-overlay z-50 p-4" onClick={() => setLightbox(null)}>
          <div
            className="relative max-w-3xl w-full mx-auto bg-white/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/70 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white w-9 h-9 rounded-full flex items-center justify-center transition-all z-20 shadow-md"
              onClick={() => setLightbox(null)}
            >
              <X size={18} />
            </button>

            <div className="relative max-h-[70vh] bg-black/20 flex items-center justify-center overflow-hidden">
              <img
                src={lightbox.src}
                alt={lightbox.label}
                className="w-full max-h-[70vh] object-contain"
                onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&q=80' }}
              />
            </div>

            <div className="p-6 bg-white/70 backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3
                  className="text-xl font-bold text-[#2C221E]"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  {lightbox.label}
                </h3>
                <p className="text-xs text-[#73655D] mt-0.5">
                  Category: {lightbox.tag} {lightbox.isStoreOnly ? '· In-Store Counter Exclusive' : '· Handcrafted Cakes'}
                </p>
                {lightbox.isStoreOnly && (
                  <p className="text-[11px] text-[#A87828] font-semibold mt-1">
                    🏬 For purchase, please visit our store (Only cakes will be delivered).
                  </p>
                )}
              </div>

              <div className="flex items-center gap-3">
                <a
                  href="/menu"
                  className="btn-primary text-xs py-2.5 px-6 font-bold"
                >
                  {lightbox.isStoreOnly ? 'View Store Menu' : 'Order This Cake'}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
