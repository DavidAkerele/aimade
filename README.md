# Aimade — Dynamic Multi-Vertical Purchase & Inquiry Pipeline

![Next.js](https://img.shields.io/badge/Next.js-16.2.12-black?style=for-the-badge&logo=next.js)
![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwind-css)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.0-0055FF?style=for-the-badge&logo=framer)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)

**Aimade** is a production-ready, mobile-first decision-tree funnel application engineered to streamline equipment rentals and authentic culinary catering orders under a unified digital umbrella. 

Featuring an unconstrained **50/50 split-screen landing interface**, smooth **Framer Motion zoom transitions**, dynamic **brand color palette morphing**, an instant **WhatsApp auto-formatter**, printable **PDF proforma quote generator**, and simulated **Paystack payment gateway**, Aimade delivers a high-density, enterprise-grade mobile ordering experience.

---

## 🌟 Key Highlights & Features

### 1. 📱 Mobile-First 50/50 Split-Screen Landing
- **Top 50% (`50vh`) — Aimade Events**: Marquee tent photography background with Royal Navy (`#0A2540`) & Vibrant Red (`#E63946`) accents.
- **Bottom 50% (`50vh`) — Aimade Flavors**: Authentic African culinary photography background with Fresh Palm Green (`#1E5631`) & Pepper Red (`#D62828`) accents.
- **Zero Clutter**: Cart buttons, steppers, and checkout drawers are hidden until products are selected.
- **Desktop Gate Prompt**: Displays a phone-only prompt encouraging desktop users to view on a mobile viewport or resize browser to `<480px`.

### 2. 🎪 Aimade Events & Equipment Rentals (Pipeline)
- **Canopies & Tents**: 20x20ft event canopies (`Seats 50`) and 20x40ft High-Peak Marquee Pavilions (`Seats 100`).
- **Chairs & Seating**: Executive Gold Chiavari chairs and Armless party chairs (sold in **Dozens** — 1 dozen = 12 chairs).
- **Tables & Dining**: 10-Seater round banquet tables and 6ft rectangular folding buffet tables.
- **Cookware & Utensils**: 100L & 200L stainless steel party cooking drums, heavy catering pans, large serving ladles, and wooden turning sticks (*Omorogun*).
- **Stoves & Ovens**: Double-burner industrial gas stoves and 2-tray roasting gas ovens.
- **Rental Duration Multiplier**: Integrated calendar date picker calculating duration multiplier `X Days`.

### 3. 🍲 Aimade Flavors Culinary Catering (Pipeline)
- **Signature Dishes**: Firewood Party Jollof Rice with Fried Plantain & Chicken, Authentic Afang Soup with stockfish & prawns, Special Ayamasi (Green Pepper Ofada Stew), and Ewa Aganyin with dark caramelized sauce.
- **Portion Tiers**: 2L Tub, 4L Tub, 8L Tub, 10L Tub, or **Custom Litre Quantity Input**.

### 4. 💳 Quotes, WhatsApp & Paystack Gateway
- **Live Quote Calculator**: Real-time itemized order total calculation including delivery logistics.
- **WhatsApp Auto-Formatter**: Instantly converts customer orders into structured WhatsApp message links (`https://wa.me/...`).
- **Printable Proforma Invoice**: Clean browser receipt template (`window.print()`).
- **Paystack Payment Integration**: Test payment modal simulation supporting card and bank transfer checkout.

### 5. 🔒 Secured Manager Portal (`/admin`)
- Passcode-protected administrative dashboard (`/admin`) for operational leads to review submitted leads, payment references (`PSK-XXXXXXXXX`), and edit rental/catering inventory items.

---

## 🛠️ Technology Stack

| Technology | Purpose |
| :--- | :--- |
| **Next.js 16 (App Router)** | Framework with Turbopack bundler & static page generation |
| **React 19** | Modern client UI rendering & Context API state management |
| **Tailwind CSS v4** | Utility-first responsive styling with custom CSS variables |
| **Framer Motion** | Step transitions, `AnimatePresence`, and card micro-interactions |
| **Lucide React** | High-density icon system |
| **Canvas Confetti** | Delightful payment authorization animation effects |
| **TypeScript** | Strict type definitions across context, items, and forms |

---

## 📁 Repository Structure

```
aimade/
├── public/
│   └── images/              # Custom AI-generated 8K product photography
│       ├── canopy-20x20.png
│       ├── chair-chiavari.png
│       ├── pot-100l.png
│       ├── jollof-rice.png
│       ├── afang-soup.png
│       ├── ayamasi-stew.png
│       └── ewa-aganyin.png
├── src/
│   ├── app/
│   │   ├── admin/page.tsx   # Secured Manager Portal (CMS)
│   │   ├── events/page.tsx  # Aimade Events Entry Route
│   │   ├── flavors/page.tsx # Aimade Flavors Entry Route
│   │   ├── globals.css      # Custom styling, root colors, zero-scroll rules
│   │   ├── layout.tsx       # Root layout wrapper
│   │   └── page.tsx         # Main Central Homepage
│   ├── components/
│   │   ├── PrintableQuoteModal.tsx # PDF printable quote invoice template
│   │   └── pipeline/
│   │       ├── EcosystemFunnel.tsx     # Main pipeline wrapper & step machine
│   │       ├── VerticalSelectorStep.tsx # 50/50 split-screen landing screen
│   │       ├── EventsCatalogStep.tsx    # Equipment rental picker & capsule date bar
│   │       ├── FlavorsMenuStep.tsx     # Catering food menu & portion selectors
│   │       ├── OrderSummaryDrawer.tsx  # Sticky live quote drawer calculator
│   │       └── CheckoutInquiryStep.tsx # Contact form, WhatsApp link & Paystack
│   └── context/
│       └── PipelineContext.tsx         # Centralized React Context state store
├── package.json
└── tsconfig.json
```

---

## ⚡ Quick Start & Local Setup

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher

### Installation

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/DavidAkerele/aimade.git
   cd aimade
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Run Development Server**:
   ```bash
   npm run dev
   ```

4. **Access Application**:
   - **Local Browser**: [http://localhost:3000](http://localhost:3000)
   - **Mobile Wi-Fi Testing**: `http://<your-local-ip>:3000` (e.g. `http://192.168.1.189:3000`)

> **Testing Tip**: Open Chrome DevTools (`Cmd + Option + I` on macOS) and click the **Mobile Device Toggle** icon (`<480px`) to test the native mobile interface on desktop!

---

## 📄 Production Build & Verification

To test the optimized production build:

```bash
npm run build
npm run start
```

---

## 📜 License

Created for **Aimade Web Ecosystem**. All rights reserved.
