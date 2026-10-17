import { useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import gsap from 'gsap'
import { useCart } from '../context/CartContext'
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from 'lucide-react'

export default function CartSidebar({ open, onClose }) {
  const { items, removeFromCart, updateQty, total, count } = useCart()
  const panelRef = useRef(null)
  const overlayRef = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!panelRef.current || !overlayRef.current) return
    if (open) {
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.25 })
      gsap.fromTo(panelRef.current, { x: '100%' }, { x: 0, duration: 0.35, ease: 'power3.out' })
    } else {
      gsap.to(panelRef.current, { x: '100%', duration: 0.25, ease: 'power3.in' })
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.2, delay: 0.05 })
    }
  }, [open])

  const handleCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  const deliveryFee = total > 0 ? (total > 500 ? 0 : 49) : 0
  const grandTotal = total + deliveryFee

  return (
    <>
      {/* Overlay */}
      <div
        ref={overlayRef}
        className={`fixed inset-0 z-[60] ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}
        style={{ background: 'rgba(40, 30, 24, 0.45)', backdropFilter: 'blur(6px)', opacity: 0 }}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="cart-sidebar"
        className="fixed right-0 top-0 bottom-0 z-[70] w-full max-w-md flex flex-col"
        style={{ transform: 'translateX(100%)' }}
      >
        <div className="bg-white h-full flex flex-col border-l border-[#E5DACD] shadow-2xl">

          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-[#F0EAE1]">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-[#FAF4E8] text-[#C5943B]">
                <ShoppingBag size={20} />
              </div>
              <div>
                <h2 className="font-bold text-xl text-[#2C221E]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Your Order Cart
                </h2>
                <p className="text-xs text-[#8A7B70]">{count} item{count !== 1 ? 's' : ''} selected</p>
              </div>
            </div>
            <button
              onClick={onClose}
              id="cart-close-btn"
              className="bg-[#FAF6F0] hover:bg-[#F2ECE4] w-9 h-9 rounded-full flex items-center justify-center text-[#5C4D42] transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full gap-4 text-[#8A7B70]">
                <div className="text-6xl animate-bounce">🛒</div>
                <div className="text-center">
                  <p className="font-bold text-[#2C221E] text-base mb-1">Your cart is empty</p>
                  <p className="text-xs text-[#8A7B70]">Add any delicious handcrafted cake to get started!</p>
                </div>
                <button
                  onClick={onClose}
                  className="btn-primary text-xs px-6 py-2.5 mt-2"
                >
                  Browse Cakes 🎂
                </button>
              </div>
            ) : (
              items.map(item => {
                const itemKey = item.cartKey || item.id
                return (
                  <div
                    key={itemKey}
                    id={`cart-item-${itemKey}`}
                    className="bg-[#FAF8F5] rounded-2xl p-4 flex gap-3.5 items-center border border-[#EAE3DA]"
                  >
                    {/* Image */}
                    <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 border border-[#E0D5C7]">
                      <img
                        src={item.img}
                        alt={item.name}
                        className="w-full h-full object-cover"
                        onError={e => { e.target.src = 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=100&q=60' }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-[#2C221E] text-sm font-bold truncate">{item.name}</h4>
                      <div className="flex items-center gap-1.5 flex-wrap text-xs text-[#73655D] mt-0.5">
                        <span className="text-[#A87828] font-bold">{item.weight || '1 lb'}</span>
                        {item.flavor && <span>• {item.flavor}</span>}
                      </div>
                      {item.customWriting && (
                        <p className="text-[#CB766F] text-[11px] font-medium italic mt-0.5 truncate" title={item.customWriting}>
                          ✍️ "{item.customWriting}"
                        </p>
                      )}
                      <p className="text-[#A87828] font-black text-sm mt-1">₹{(item.price * item.qty).toLocaleString()}</p>
                    </div>

                    {/* Qty + Remove */}
                    <div className="flex flex-col items-end gap-2.5">
                      <button
                        onClick={() => removeFromCart(itemKey)}
                        className="text-[#B59E8D] hover:text-red-500 transition-colors"
                        title="Remove item"
                      >
                        <Trash2 size={15} />
                      </button>
                      <div className="flex items-center gap-1.5 bg-white border border-[#E0D5C7] rounded-full px-1 py-0.5 shadow-sm">
                        <button
                          onClick={() => updateQty(itemKey, item.qty - 1)}
                          id={`cart-minus-${itemKey}`}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#5C4D42] hover:bg-[#FAF4E8] transition-colors"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="text-[#2C221E] text-xs w-5 text-center font-bold">{item.qty}</span>
                        <button
                          onClick={() => updateQty(itemKey, item.qty + 1)}
                          id={`cart-plus-${itemKey}`}
                          className="w-6 h-6 rounded-full flex items-center justify-center text-[#5C4D42] hover:bg-[#FAF4E8] transition-colors"
                        >
                          <Plus size={11} />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            )}
          </div>

          {/* Footer / Summary */}
          {items.length > 0 && (
            <div className="p-6 border-t border-[#F0EAE1] bg-[#FAF8F5] space-y-3.5">
              <div className={`flex justify-between text-xs px-3.5 py-2 rounded-xl font-medium ${
                deliveryFee === 0 ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-white text-[#73655D] border border-[#E8DFD5]'
              }`}>
                <span>🚚 Delivery</span>
                <span>{deliveryFee === 0 ? 'FREE (Orders above ₹500)' : `₹${deliveryFee}`}</span>
              </div>

              <div className="flex justify-between text-xs text-[#73655D]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#2C221E]">₹{total.toLocaleString()}</span>
              </div>

              <div className="flex justify-between font-bold text-[#2C221E] text-base pt-1 border-t border-[#EAE3DA]">
                <span>Total Amount</span>
                <span className="text-[#A87828] text-xl font-black">₹{grandTotal.toLocaleString()}</span>
              </div>

              <button
                id="proceed-to-checkout-btn"
                onClick={handleCheckout}
                className="btn-primary w-full py-4 text-base font-bold flex items-center justify-center gap-2 glow-btn"
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
