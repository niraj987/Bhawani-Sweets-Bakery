import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import AmbientBackground from './components/AmbientBackground'
import OccasionPopup from './components/OccasionPopup'
import PageTransitionLoop from './components/PageTransitionLoop'
import Home from './pages/Home'
import Menu from './pages/Menu'
import Gallery from './pages/Gallery'
import StoreGuide from './pages/StoreGuide'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Checkout from './pages/Checkout'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          {/* Innovative Interactive Ambient Background (Non-Three.js) */}
          <AmbientBackground />

          <Toaster
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: 'rgba(20,8,3,0.92)',
                color: '#fff',
                border: '1px solid rgba(212,168,83,0.4)',
                backdropFilter: 'blur(12px)',
                fontFamily: "'Outfit', sans-serif",
                borderRadius: '12px',
                fontSize: '14px',
              },
              success: { iconTheme: { primary: '#d4a853', secondary: '#fff' } },
              error:   { iconTheme: { primary: '#e8718a', secondary: '#fff' } },
            }}
          />

          {/* Global occasion popup */}
          <OccasionPopup />

          {/* CSS3 Infinite Loop Page Loader & Transition Design */}
          <PageTransitionLoop />

          <Navbar />

          <Routes>
            <Route path="/"          element={<Home />} />
            <Route path="/menu"      element={<Menu />} />
            <Route path="/gallery"   element={<Gallery />} />
            <Route path="/store-guide" element={<StoreGuide />} />
            <Route path="/contact"   element={<Contact />} />
            <Route path="/login"     element={<Login />} />
            <Route path="/signup"    element={<Signup />} />
            <Route path="/checkout"  element={<Checkout />} />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}
