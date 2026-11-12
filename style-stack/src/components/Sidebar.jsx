import React from 'react';
import { CATEGORIES } from '../data/initialWardrobe';

/**
 * Sidebar Component
 * 
 * Provides:
 * - Links to All Clothes, Favourites, Outfit Studio
 * - Quick category filters
 * - Total pieces summary
 */
function Sidebar({
  activeTab,
  onSelectTab,
  totalCount,
  favCount,
  outfitCount,
  selectedCategory,
  onSelectCategory
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-title">NAVIGATION</div>
      <nav className="sidebar-nav">
        <button
          className={`sidebar-link ${activeTab === 'all' && selectedCategory === 'All' ? 'active' : ''}`}
          onClick={() => {
            onSelectTab('all');
            onSelectCategory('All');
          }}
        >
          <span>🏠</span> <span>Dashboard & Wardrobe</span>
        </button>
        <button
          className={`sidebar-link ${activeTab === 'favourites' ? 'active' : ''}`}
          onClick={() => onSelectTab('favourites')}
        >
          <span>❤️</span> <span>Favourites ({favCount})</span>
        </button>
        <button
          className={`sidebar-link ${activeTab === 'outfit' ? 'active' : ''}`}
          onClick={() => onSelectTab('outfit')}
        >
          <span>✨</span> <span>Outfit Studio ({outfitCount})</span>
        </button>
      </nav>

      <div className="sidebar-title">CATEGORIES</div>
      <div className="sidebar-categories">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            className={`sidebar-cat-btn ${selectedCategory === cat && activeTab === 'all' ? 'active' : ''}`}
            onClick={() => {
              onSelectCategory(cat);
              onSelectTab('all');
            }}
          >
            <span>• {cat}</span>
          </button>
        ))}
      </div>

      <div className="sidebar-footer-card">
        <h4>StyleStack</h4>
        <p>{totalCount} total pieces catalogued in your personal collection.</p>
      </div>
    </aside>
  );
}

export default Sidebar;
