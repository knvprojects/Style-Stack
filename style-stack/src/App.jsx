import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Wardrobe from './components/Wardrobe';
import CategoryFilter from './components/CategoryFilter';
import OutfitBuilder from './components/OutfitBuilder';
import ClothingForm from './components/ClothingForm';
import { INITIAL_WARDROBE, CATEGORIES } from './data/initialWardrobe';
import './App.css';

/**
 * App Component - StyleStack Root Controller
 * 
 * Uses strictly: HTML, CSS, JavaScript, and React (useState & useEffect).
 * Manages all application state and persistence with localStorage.
 */
function App() {
  // 1. STATE MANAGEMENT (with safe localStorage retrieval)
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('stylestack_clothes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading localStorage:', e);
    }
    return INITIAL_WARDROBE;
  });

  const [outfitIds, setOutfitIds] = useState(() => {
    try {
      const saved = localStorage.getItem('stylestack_outfit_ids');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error reading outfit localStorage:', e);
    }
    return ['item-1', 'item-2'];
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all'); // 'all', 'favourites', 'outfit'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // 2. PERSISTENCE (useEffect)
  useEffect(() => {
    try {
      localStorage.setItem('stylestack_clothes', JSON.stringify(items));
    } catch (e) {
      console.error('Error saving clothes:', e);
    }
  }, [items]);

  useEffect(() => {
    try {
      localStorage.setItem('stylestack_outfit_ids', JSON.stringify(outfitIds));
    } catch (e) {
      console.error('Error saving outfit:', e);
    }
  }, [outfitIds]);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // 3. CRUD HANDLERS
  const handleAddItem = (newItem) => {
    setItems([newItem, ...items]);
    showToast(`Added "${newItem.name}" to your wardrobe!`);
  };

  const handleToggleFav = (id) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const nextState = !item.isFavorite;
          showToast(nextState ? `Saved to Favourites ❤️` : `Removed from Favourites`);
          return { ...item, isFavorite: nextState };
        }
        return item;
      })
    );
  };

  const handleToggleOutfit = (id) => {
    if (outfitIds.includes(id)) {
      setOutfitIds(outfitIds.filter((i) => i !== id));
      showToast(`Removed item from outfit`);
    } else {
      setOutfitIds([...outfitIds, id]);
      showToast(`Added item to outfit ✨`);
    }
  };

  const handleDeleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
    setOutfitIds(outfitIds.filter((i) => i !== id));
    showToast(`Item removed from wardrobe`);
  };

  const handleClearOutfit = () => {
    setOutfitIds([]);
    showToast(`Cleared entire outfit`);
  };

  // 4. COMPUTED LISTS
  const favItems = items.filter((i) => i.isFavorite);
  const outfitPieces = items.filter((i) => outfitIds.includes(i.id));

  const filteredItems = items.filter((item) => {
    if (activeTab === 'favourites' && !item.isFavorite) return false;
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const cleanSearch = searchTerm.toLowerCase().trim();
    const matchesSearch =
      !cleanSearch ||
      item.name.toLowerCase().includes(cleanSearch) ||
      item.category.toLowerCase().includes(cleanSearch) ||
      item.color.toLowerCase().includes(cleanSearch);

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="app-shell">
      {toastMessage && <div className="toast">{toastMessage}</div>}

      {/* Top Navigation */}
      <Navbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onOpenAddModal={() => setIsModalOpen(true)}
        outfitCount={outfitIds.length}
        onNavigate={(tab) => setActiveTab(tab)}
      />

      <div className="app-body">
        {/* Sidebar */}
        <Sidebar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
          totalCount={items.length}
          favCount={favItems.length}
          outfitCount={outfitIds.length}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Main Dashboard Area */}
        <main className="main-content">
          {/* Dashboard Stats & Welcome Banner */}
          <Dashboard
            totalCount={items.length}
            favCount={favItems.length}
            outfitCount={outfitIds.length}
            onNavigate={(tab) => setActiveTab(tab)}
            onOpenAddModal={() => setIsModalOpen(true)}
          />

          {/* Outfit Builder Section */}
          <OutfitBuilder
            outfitItems={outfitPieces}
            onRemoveFromOutfit={handleToggleOutfit}
            onClearOutfit={handleClearOutfit}
          />

          {/* Section Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2>{activeTab === 'favourites' ? 'Curated Favourites' : 'Wardrobe Collection'}</h2>
            <span style={{ fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
              Showing <strong>{filteredItems.length}</strong> items
            </span>
          </div>

          {/* Category Filter Pills */}
          <CategoryFilter
            categories={CATEGORIES}
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            items={items}
          />

          {/* Wardrobe Cards Grid */}
          <Wardrobe
            items={filteredItems}
            onToggleFav={handleToggleFav}
            onToggleOutfit={handleToggleOutfit}
            onDelete={handleDeleteItem}
            outfitIds={outfitIds}
            onResetFilters={() => {
              setSelectedCategory('All');
              setSearchTerm('');
            }}
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
          />
        </main>
      </div>

      {/* Add Item Modal */}
      <ClothingForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddItem={handleAddItem}
      />
    </div>
  );
}

export default App;
