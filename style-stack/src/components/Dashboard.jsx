import React from 'react';

/**
 * Dashboard Component
 * 
 * Displays:
 * - Welcome Banner with project tagline
 * - 3 Primary KPI Statistics: Total Items, Favourites, Outfit Selected
 */
function Dashboard({ totalCount, favCount, outfitCount, onNavigate, onOpenAddModal }) {
  return (
    <>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div>
          <span className="welcome-tag">Digital Wardrobe Organizer</span>
          <h1 className="welcome-title">Your wardrobe, your style, your way.</h1>
          <p className="welcome-tagline">
            Digitally manage your clothing collection, organize into categories, search instantly, mark favourites, and create outfit combinations.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" onClick={onOpenAddModal}>
              + Add Clothing Item
            </button>
            <button className="btn-secondary" onClick={() => onNavigate('outfit')}>
              Curate Outfit
            </button>
          </div>
        </div>
      </div>

      {/* Feature 1: The 3 Dashboard Statistics */}
      <div className="stats-row">
        <div className="stat-box" onClick={() => onNavigate('all')}>
          <div>
            <div className="stat-lbl">Total Clothing Items</div>
            <div className="stat-num">{totalCount}</div>
          </div>
          <div className="stat-icon olive">👕</div>
        </div>

        <div className="stat-box" onClick={() => onNavigate('favourites')}>
          <div>
            <div className="stat-lbl">Favourite Items</div>
            <div className="stat-num">{favCount}</div>
          </div>
          <div className="stat-icon rose">❤️</div>
        </div>

        <div className="stat-box" onClick={() => onNavigate('outfit')}>
          <div>
            <div className="stat-lbl">Outfit Selected Items</div>
            <div className="stat-num">{outfitCount}</div>
          </div>
          <div className="stat-icon sand">✨</div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
