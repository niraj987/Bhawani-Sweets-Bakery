# 🎂 Bhawani Sweets & Bakery

> ** Cake Studio, Handcrafted Desi Ghee Sweets & Dairy Delivery Platform**  
> Built with modern React 19, Tailwind CSS, GSAP, Node.js, Express, and SQLite.

---

## ✨ Features

- **🎨 Live Custom Cake Studio**: Design celebration cakes with live icing calligraphy preview, custom text piping, frosting colors, shapes (round, heart, square), and design tiers.
- **⚖️ Interactive Pound Scale (1 lb = 0.45 kg)**: Dynamic visual cake scale simulator adapting servings, weight in kg, and pricing in real time.
- **📱 100% Fully Responsive Layout**: Seamless experience across mobile phones (320px–480px), tablets, laptops, and ultra-wide screens with straight-aligned card heights.
- **🛒 Shopping Cart & Express Checkout**: Multi-step checkout with delivery scheduling, payment options (UPI / QR, Cards, Net Banking, COD), and live confetti celebrations.
- **🔐 JWT Authentication & User Accounts**: Secure signup and login with birthday and anniversary celebration surprise popups.
- **🍮 In-Store Counter Specialties**: Showcase for fresh Sudha milk dairy, traditional desi ghee sweets, and stone-ground Bihar sattu with clear in-store pickup notices.
- **🐻 Interactive Mascot (Barnaby Bear)**: Floating mascot with bakery tips, animations, and secret discount coupons.

---

## 🛠️ Tech Stack

### Frontend
- **React 19** + **Vite**
- **Tailwind CSS v4**
- **GSAP (GreenSock)** for fluid scroll triggers and micro-animations
- **Lucide React** for crisp icons
- **Axios**, **React Router v7**, **React Hot Toast**, **Canvas Confetti**

### Backend
- **Node.js** + **Express**
- **SQLite** via `better-sqlite3` with WAL mode
- **JWT (JSON Web Tokens)** + **Bcrypt.js**
- **CORS** & secure environment configuration

---

## 🚀 Quick Start

### Option 1: One-Click Startup (Windows PowerShell)
Simply right-click and run or execute:
```powershell
.\START.ps1
```
This automatically boots both the backend (`http://localhost:5000`) and frontend (`http://localhost:5173`), then opens your default browser.

### Option 2: Manual Start

#### 1. Backend Setup
```bash
cd backend
npm install
node server.js
```
*Backend runs on `http://localhost:5000` with pre-seeded demo user (`test@bhawani.com` / `password123`).*

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend runs on `http://localhost:5173`.*

---

## 📂 Project Structure

```
Cake Shop/
├── START.ps1                 # One-click startup script
├── README.md                 # Project documentation
├── .gitignore                # Git ignore rules for node_modules, dist, db & logs
├── backend/
│   ├── server.js             # Express API server
│   ├── db.js                 # SQLite database initialization & migrations
│   ├── .env.example          # Sample environment variables
│   ├── routes/
│   │   └── auth.js           # Signup, Login, and Profile routes
│   └── package.json
└── frontend/
    ├── index.html
    ├── vite.config.js
    ├── package.json
    ├── public/
    │   ├── images/           # Handcrafted cake photography
    │   └── sweets/           # Fresh sweets & dairy photography
    └── src/
        ├── App.jsx           # Routes & global providers
        ├── index.css         # Artisanal bakery design tokens & styling
        ├── components/
        │   ├── Navbar.jsx              # Responsive navigation with mobile drawer
        │   ├── CartSidebar.jsx         # Sliding cart drawer
        │   ├── CustomCakeStudio.jsx    # Live custom cake builder & writing
        │   ├── InteractivePoundScale.jsx # Dynamic pound weight simulator
        │   ├── FloatingTeddyBear.jsx   # Mascot companion
        │   └── OccasionPopup.jsx       # Birthday/Anniversary surprise modal
        └── pages/
            ├── Home.jsx                # Main landing page
            ├── Menu.jsx                # Filterable catalog with aligned cards
            ├── Gallery.jsx             # Visual showcase with lightbox
            ├── StoreGuide.jsx          # Store pickup & delivery guide
            ├── Checkout.jsx            # Multi-step checkout & payment
            ├── Login.jsx & Signup.jsx  # Authentication
            └── About.jsx & Contact.jsx # Story & parlour details
```

---

## 📜 License
MIT © Bhawani Sweets & Bakery
