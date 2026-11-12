# StyleStack – Digital Wardrobe Organizer 👗✨

> *"Your wardrobe, your style, your way."*

StyleStack is a modern, responsive, minimalist frontend web application built with **React.js** and **Vite**. It enables users to catalogue their clothing pieces, filter items by category, search in real time, mark favorites, and curate complete outfit combinations directly in their browser with automatic `localStorage` persistence.

---

## 🌟 Live Features & Capabilities

1. **Editorial Dashboard**
   - Live KPI statistic cards tracking **Total Pieces**, **Starred Favourites**, and **Outfit Selections**.
   - Category distribution cards (Tops, Bottoms, Dresses, Shoes, Accessories) with direct one-click filtering.
   - Spotlight grid of recently catalogued pieces.
   - Three-step mindful styling workflow guide.

2. **Dynamic Wardrobe Catalog & Display**
   - Clean, responsive card grid showing high-resolution fashion images, titles, category badges, and color indicators.
   - Automatic fallback placeholder handling for broken image URLs.
   - Contextual empty states when searches yield no matches or categories are empty.

3. **Real-Time Search & Category Filtering**
   - Instant live search by clothing name, category, or color keyword.
   - Category filter pills with dynamic count badges (`All`, `Tops`, `Bottoms`, `Dresses`, `Shoes`, `Accessories`).
   - Active filter status bar with one-click individual filter removal or complete reset.

4. **Dynamic Add-Clothing Modal & Form**
   - Modal form with live real-time card preview that updates as the user types.
   - Quick-pick color palette swatches and preset fashion photo helpers.
   - Form validation ensuring required fields are populated before saving.

5. **Starred Favourites**
   - Heart toggle on every card with instant count update across the dashboard and sidebar.
   - Dedicated "Favourites" view displaying only starred statement pieces.

6. **Interactive Outfit Studio**
   - Dedicated outfit canvas displaying selected pieces side-by-side.
   - Real-time outfit completeness checklist (Tops, Bottoms, Dresses, Shoes, Accessories).
   - Inline wardrobe picker to add pieces without leaving the outfit studio.
   - Individual item removal and "Clear Entire Outfit" action.

7. **Browser Data Persistence (`localStorage`)**
   - Automatic background syncing of wardrobe inventory and active outfits.
   - Pre-loaded with 10 elegant sample fashion pieces on first launch so the dashboard is immediately populated.
   - Safe `try...catch` error handling to prevent browser storage crashes.

8. **Mobile & Tablet Responsive**
   - Smooth slide-out mobile drawer sidebar with backdrop overlay.
   - Fluid typography and responsive CSS grid that cleanly adapts to desktop, tablet, and mobile screens.

---

## 🛠️ Technologies Used

- **HTML5**: Semantic document layout (`header`, `main`, `aside`, `section`, `nav`).
- **CSS3**: Custom CSS variables, Flexbox, CSS Grid, media queries, keyframe animations (No Tailwind or external UI frameworks).
- **JavaScript (ES6+)**: Arrow functions, destructuring, template literals, array methods (`map`, `filter`, `some`, `find`, `slice`), spread operator (`...`).
- **React.js 18**: Functional components, JSX, props, one-way data flow.
- **React Hooks**: `useState` (state management) and `useEffect` (side effects and persistence).
- **Vite**: Modern, blazing-fast frontend development tooling.

---

## 🚀 Quickstart & Setup Instructions

Follow these simple steps to run StyleStack on your machine:

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (version 16 or newer recommended).

### 1. Open Terminal & Navigate to Project
```bash
cd style-stack
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

### 4. Open in Your Browser
Once the dev server starts, open the local URL in your browser (typically [http://localhost:3000](http://localhost:3000) or [http://localhost:5173](http://localhost:5173)).

---

## 📁 Project Folder Structure

```text
style-stack/
│
├── public/
│   └── favicon.svg               # Custom hanger SVG favicon
│
├── src/
│   ├── assets/                   # Static media assets & icons
│   │
│   ├── components/               # Modular, reusable React components
│   │   ├── Navbar.jsx            # Top bar with logo, search & add button
│   │   ├── Sidebar.jsx           # Main navigation, category jump & summary
│   │   ├── Dashboard.jsx         # KPI stats, welcome banner & recent items
│   │   ├── ClothingCard.jsx      # Individual item card with fav & outfit actions
│   │   ├── ClothingForm.jsx      # Modal dialog with live preview & validation
│   │   ├── Wardrobe.jsx          # Catalog view with grid and empty states
│   │   ├── CategoryFilter.jsx    # Category filter pills with count badges
│   │   └── OutfitBuilder.jsx     # Outfit studio canvas & inline picker
│   │
│   ├── data/
│   │   └── initialWardrobe.js    # 10 pre-loaded sample fashion items
│   │
│   ├── App.jsx                   # Central controller, state & localStorage sync
│   ├── App.css                   # Custom styles, responsive grid, modal & layout
│   ├── index.css                 # CSS variables, typography & base reset
│   └── main.jsx                  # React DOM entry point
│
├── index.html                    # Root HTML file with Google Fonts
├── package.json                  # Dependencies and npm scripts
├── vite.config.js                # Vite configuration
├── EXPLANATION.md                # Comprehensive beginner's code walkthrough
├── INTERVIEW_PREP.md             # 25+ interview questions & answers guide
└── README.md                     # Project overview and setup instructions
```

---

## 💡 How State & Data Flow Works

In StyleStack, **state flows downwards** (Parent to Child via `props`) and **events flow upwards** (Child to Parent via callback functions):

1. **State Ownership**: `App.jsx` owns the primary pieces of state:
   - `clothingItems`: The master list of all clothes.
   - `outfitItemIds`: The array of IDs selected for an outfit.
   - `activeView`: Which screen is currently displayed (`'dashboard'`, `'wardrobe'`, `'favourites'`, or `'outfit'`).
   - `searchTerm` & `selectedCategory`: The current search keyword and category.

2. **Passing Down Data**: `App.jsx` passes filtered lists and counters down to components like `Dashboard`, `Wardrobe`, and `OutfitBuilder` as props.

3. **Emitting Actions**: When a user clicks a button (e.g. Favorite or Delete in `ClothingCard.jsx`), the child invokes a callback passed from `App.jsx` (e.g. `onToggleFavorite(item.id)`). `App.jsx` updates its state immutably, and React re-renders the affected components automatically!

---

## 📄 License
This project is open-source and free to use for educational and portfolio purposes.
