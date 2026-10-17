import { createContext, useContext, useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('bhawani_cart') || '[]')
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('bhawani_cart', JSON.stringify(items))
  }, [items])

  const addToCart = (cake, qty = 1) => {
    const cartKey = cake.cartKey || `${cake.id}-${cake.weight || '1 Pound'}-${cake.customWriting || ''}-${cake.designTier || ''}`
    const itemToAdd = { ...cake, cartKey }

    setItems(prev => {
      const existing = prev.find(i => (i.cartKey || i.id) === cartKey)
      if (existing) {
        toast.success(`${cake.name} quantity updated!`, { icon: '🎂' })
        return prev.map(i => (i.cartKey || i.id) === cartKey ? { ...i, qty: i.qty + qty } : i)
      }
      toast.success(`${cake.name} added to cart!`, { icon: '🛒' })
      return [...prev, { ...itemToAdd, qty }]
    })
  }

  const removeFromCart = (key) => {
    setItems(prev => prev.filter(i => (i.cartKey || i.id) !== key))
    toast('Item removed from cart', { icon: '🗑️' })
  }

  const updateQty = (key, qty) => {
    if (qty < 1) { removeFromCart(key); return }
    setItems(prev => prev.map(i => (i.cartKey || i.id) === key ? { ...i, qty } : i))
  }

  const clearCart = () => setItems([])

  const total = items.reduce((sum, i) => sum + i.price * i.qty, 0)
  const count = items.reduce((sum, i) => sum + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQty, clearCart, total, count }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
