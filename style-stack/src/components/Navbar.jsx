import React from 'react';

/**
 * Navbar Component
 * 
 * Features:
 * - Brand logo & name
 * - Project tagline: "Your wardrobe, your style, your way."
 * - Real-time search bar
 * - Outfit count pill
 * - "+ Add Item" CTA button
 */
function Navbar({ searchTerm, onSearchChange, onOpenAddModal, outfitCount, onNavigate }) {
  return (
    <header className="navbar">
      <div className="nav-brand" onClick={() => onNavigate('all')}>
        <div className="brand-icon">👗</div>
        <div>
          <div className="brand-title">StyleStack</div>
          <div className="brand-tagline">Your wardrobe, your style, your way.</div>
        </div>
      </div>

      <div className="nav-search">
        <span className="search-icon-svg">🔍</span>
        <input
          type="text"
          placeholder="Search by name, category, or color..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        {searchTerm && (
          <button className="search-clear-btn" onClick={() => onSearchChange('')}>
            ×
          </button>
        )}
      </div>

      <div className="nav-actions">
        <button className="btn-outfit-badge" onClick={() => onNavigate('outfit')}>
          <span>Outfit</span>
          <span className="badge-pill">{outfitCount}</span>
        </button>
        <button className="btn-primary" onClick={onOpenAddModal}>
          <span>+ Add Item</span>
        </button>
      </div>
    </header>
  );
}

export default Navbar;
