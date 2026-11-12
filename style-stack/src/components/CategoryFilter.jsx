import React from 'react';

/**
 * CategoryFilter Component
 * 
 * Provides filter buttons for All, Tops, Bottoms, Dresses, Shoes, Accessories
 * Shows item count for each category.
 */
function CategoryFilter({ categories = [], selectedCategory, onSelectCategory, items = [] }) {
  return (
    <div className="filter-row">
      <div className="cat-pills-wrap">
        {categories.map((cat) => {
          const count =
            cat === 'All'
              ? items.length
              : items.filter((i) => i.category === cat).length;

          return (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => onSelectCategory(cat)}
            >
              <span>{cat}</span>
              <span className="cat-pill-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default CategoryFilter;
