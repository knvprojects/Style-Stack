import React, { useState } from 'react';

// Color Palette Dictionary for matching color names to actual hex values
export const COLOR_PALETTE = {
  'red': '#D32F2F',
  'crimson': '#C62828',
  'burgundy': '#800020',
  'maroon': '#800000',
  'wine': '#722F37',
  'rose': '#E57373',
  'pink': '#E91E63',
  'light pink': '#F8BBD0',
  'blush': '#F48FB1',
  'coral': '#FF7043',
  'orange': '#FB8C00',
  'rust': '#B7410E',
  'terracotta': '#C86D51',
  'yellow': '#FBC02D',
  'mustard': '#E0A926',
  'gold': '#D4AF37',
  'warm gold': '#D4AF37',
  'green': '#43A047',
  'olive': '#526E48',
  'olive green': '#526E48',
  'sage': '#8F9E8B',
  'sage green': '#8F9E8B',
  'forest': '#2E473B',
  'forest green': '#2E473B',
  'emerald': '#2E7D32',
  'mint': '#80CBC4',
  'teal': '#00897B',
  'blue': '#1E88E5',
  'navy': '#1A2A44',
  'navy blue': '#1A2A44',
  'french navy': '#1F2A38',
  'sky blue': '#81D4FA',
  'light blue': '#90CAF9',
  'denim': '#4A6B82',
  'washed indigo': '#4A6B82',
  'indigo': '#3949AB',
  'purple': '#8E24AA',
  'lavender': '#CE93D8',
  'violet': '#6A1B9A',
  'brown': '#6D4C41',
  'espresso': '#3E2723',
  'espresso brown': '#3E2723',
  'chocolate': '#4E342E',
  'tan': '#C19A6B',
  'camel': '#C19A6B',
  'camel tan': '#C19A6B',
  'beige': '#D8C4B6',
  'soft beige': '#D8C4B6',
  'cream': '#F5F2EB',
  'cream white': '#F7F5F0',
  'champagne': '#EADDC7',
  'warm champagne': '#EADDC7',
  'sand': '#E8DFCA',
  'natural canvas': '#E8DFCA',
  'khaki': '#C3B091',
  'white': '#FFFFFF',
  'off white': '#FAF9F6',
  'ivory': '#FFFFF0',
  'grey': '#757575',
  'gray': '#757575',
  'light grey': '#E0E0E0',
  'light gray': '#E0E0E0',
  'dark grey': '#424242',
  'dark gray': '#424242',
  'charcoal': '#37474F',
  'black': '#212121',
  'washed black': '#2B2B2B',
  'silver': '#B0BEC5'
};

export function resolveColor(colorName, colorHex) {
  if (!colorName) return colorHex || '#526E48';
  const clean = colorName.toLowerCase().trim();

  // If user provided an explicit custom hex (other than default olive on non-olive items)
  if (colorHex && colorHex.startsWith('#') && colorHex !== '#526E48') {
    return colorHex;
  }

  // Exact match
  if (COLOR_PALETTE[clean]) {
    return COLOR_PALETTE[clean];
  }

  // Partial match
  for (const [key, hex] of Object.entries(COLOR_PALETTE)) {
    if (clean.includes(key)) {
      return hex;
    }
  }

  return colorHex || clean;
}

/**
 * ClothingCard Component
 * 
 * Displays an individual clothing item:
 * - Image with fallback error handling
 * - Category badge
 * - Clothing name
 * - Color swatch dot (guaranteed to match the color name) & color label
 * - Optional description
 * - Favourite heart toggle (Feature 6)
 * - Outfit toggle button (Feature 8)
 * - Delete button with clean SVG icon (Feature 7)
 */
function ClothingCard({ item, onToggleFav, onToggleOutfit, onDelete, isInOutfit }) {
  const [imgErr, setImgErr] = useState(false);
  const fallback = 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&auto=format&fit=crop&q=80';

  const dotColor = resolveColor(item.color, item.colorHex);

  return (
    <div className={`card ${isInOutfit ? 'in-outfit' : ''}`}>
      <div className="card-img-wrap">
        <img
          src={imgErr || !item.imageUrl ? fallback : item.imageUrl}
          alt={item.name}
          onError={() => setImgErr(true)}
        />
        <span className="card-category-badge">{item.category}</span>
        <button
          className={`card-fav-btn ${item.isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFav(item.id)}
          title={item.isFavorite ? 'Remove from favourites' : 'Add to favourites'}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill={item.isFavorite ? '#C85A54' : 'none'}
            stroke={item.isFavorite ? '#C85A54' : 'currentColor'}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <div className="card-info">
        <h3 className="card-name" title={item.name}>{item.name}</h3>
        <div className="card-color-row">
          <span
            className="color-swatch-dot"
            style={{ backgroundColor: dotColor }}
            title={`Color: ${item.color} (${dotColor})`}
          />
          <span className="color-name-text">{item.color}</span>
        </div>
        {item.description && <p className="card-desc">{item.description}</p>}

        <div className="card-actions-bar">
          <button
            className={`btn-toggle-outfit ${isInOutfit ? 'active' : ''}`}
            onClick={() => onToggleOutfit(item.id)}
          >
            {isInOutfit ? 'In Outfit ✓' : '+ Add to Outfit'}
          </button>
          <button
            className="btn-del-item"
            onClick={() => onDelete(item.id)}
            title="Delete item"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default ClothingCard;
