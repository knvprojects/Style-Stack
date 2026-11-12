import React from 'react';

/**
 * OutfitBuilder Component
 * 
 * Displays the pieces currently selected for the outfit:
 * - Shows selected item cards with image and remove button
 * - Shows piece counter badge
 * - "Clear Outfit" button
 * - Clean empty state when 0 items are selected
 */
function OutfitBuilder({ outfitItems = [], onRemoveFromOutfit, onClearOutfit }) {
  return (
    <section className="outfit-section" id="outfit-builder-section">
      <div className="outfit-header">
        <div className="outfit-title-wrap">
          <h2>Outfit Studio</h2>
          <span className="badge-pill">{outfitItems.length} selected</span>
        </div>
        {outfitItems.length > 0 && (
          <button className="btn-clear-outfit" onClick={onClearOutfit}>
            Clear Outfit
          </button>
        )}
      </div>

      {outfitItems.length > 0 ? (
        <div className="outfit-pieces-grid">
          {outfitItems.map((item) => (
            <div key={item.id} className="outfit-piece">
              <img src={item.imageUrl} alt={item.name} />
              <button
                className="btn-remove-piece"
                onClick={() => onRemoveFromOutfit(item.id)}
                title="Remove from outfit"
              >
                ×
              </button>
              <div className="outfit-piece-meta">
                <span className="outfit-piece-cat">{item.category}</span>
                <div className="outfit-piece-name" title={item.name}>
                  {item.name}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="outfit-empty">
          <p>Your outfit canvas is currently empty.</p>
          <p style={{ fontSize: '0.82rem', marginTop: '0.35rem' }}>
            Click <strong>"+ Add to Outfit"</strong> on any clothing card below to mix and match your pieces!
          </p>
        </div>
      )}
    </section>
  );
}

export default OutfitBuilder;
