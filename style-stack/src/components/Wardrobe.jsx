import React from 'react';
import ClothingCard from './ClothingCard';

/**
 * Wardrobe Component
 * 
 * Displays clothing cards in a responsive grid.
 * Shows a friendly empty state if no clothes match search or category.
 */
function Wardrobe({
  items = [],
  onToggleFav,
  onToggleOutfit,
  onDelete,
  outfitIds = [],
  onResetFilters,
  searchTerm = '',
  selectedCategory = 'All'
}) {
  if (items.length === 0) {
    return (
      <div className="empty-box">
        <div style={{ fontSize: '2.5rem' }}>👗</div>
        <h3>No clothing items found</h3>
        <p>
          {searchTerm
            ? `No items match "${searchTerm}". Try adjusting your keywords.`
            : `You don't have any pieces catalogued in "${selectedCategory}".`}
        </p>
        <button className="btn-primary" onClick={onResetFilters}>
          Reset Filters
        </button>
      </div>
    );
  }

  return (
    <div className="cards-grid">
      {items.map((item) => (
        <ClothingCard
          key={item.id}
          item={item}
          onToggleFav={onToggleFav}
          onToggleOutfit={onToggleOutfit}
          onDelete={onDelete}
          isInOutfit={outfitIds.includes(item.id)}
        />
      ))}
    </div>
  );
}

export default Wardrobe;
