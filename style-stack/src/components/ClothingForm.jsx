import React, { useState } from 'react';
import { resolveColor } from './ClothingCard';

/**
 * ClothingForm Component (Modal)
 * 
 * Form to add a new clothing item:
 * - Clothing Name (required)
 * - Category: Tops, Bottoms, Dresses, Shoes, Accessories (required)
 * - Colour (required, with smart palette matching and interactive swatches)
 * - Image URL (optional, with fallback)
 * - Description (optional)
 * 
 * Dynamically adds new clothing items to the state.
 */
function ClothingForm({ isOpen, onClose, onAddItem }) {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Tops',
    color: 'Olive Green',
    colorHex: '#526E48',
    imageUrl: '',
    description: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const sampleImages = {
    Tops: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=800&auto=format&fit=crop&q=80',
    Bottoms: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80',
    Dresses: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&auto=format&fit=crop&q=80',
    Shoes: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=800&auto=format&fit=crop&q=80',
    Accessories: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'
  };

  // Quick-pick color palettes for 1-click selection
  const quickSwatches = [
    { label: 'Red', hex: '#D32F2F' },
    { label: 'Olive Green', hex: '#526E48' },
    { label: 'Soft Beige', hex: '#D8C4B6' },
    { label: 'French Navy', hex: '#1F2A38' },
    { label: 'Black', hex: '#212121' },
    { label: 'White', hex: '#FFFFFF' },
    { label: 'Camel Tan', hex: '#C19A6B' },
    { label: 'Forest Green', hex: '#2E473B' },
    { label: 'Terracotta', hex: '#C86D51' },
    { label: 'Yellow', hex: '#FBC02D' },
    { label: 'Blush Pink', hex: '#F48FB1' },
    { label: 'Denim Blue', hex: '#4A6B82' }
  ];

  const handleColorChange = (colorValue) => {
    const detectedHex = resolveColor(colorValue);
    setFormData((prev) => ({
      ...prev,
      color: colorValue,
      colorHex: detectedHex
    }));
  };

  const handleSwatchClick = (swatch) => {
    setFormData((prev) => ({
      ...prev,
      color: swatch.label,
      colorHex: swatch.hex
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setError('Please enter a clothing item name.');
      return;
    }
    if (!formData.color.trim()) {
      setError('Please enter a colour.');
      return;
    }

    const resolvedHex = resolveColor(formData.color.trim(), formData.colorHex);

    const newItem = {
      id: `item-${Date.now()}`,
      name: formData.name.trim(),
      category: formData.category,
      color: formData.color.trim(),
      colorHex: resolvedHex,
      imageUrl: formData.imageUrl.trim() || sampleImages[formData.category],
      description: formData.description.trim(),
      isFavorite: false
    };

    onAddItem(newItem);
    onClose();
    setFormData({
      name: '',
      category: 'Tops',
      color: 'Olive Green',
      colorHex: '#526E48',
      imageUrl: '',
      description: ''
    });
    setError('');
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Add Clothing Item</h2>
          <button className="modal-close" onClick={onClose}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="form-error">{error}</div>}

            <div className="form-field">
              <label>Clothing Name *</label>
              <input
                type="text"
                placeholder="e.g. Linen Blouse, Denim Jeans"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                autoFocus
              />
            </div>

            <div className="form-row">
              <div className="form-field">
                <label>Category *</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Tops">Tops</option>
                  <option value="Bottoms">Bottoms</option>
                  <option value="Dresses">Dresses</option>
                  <option value="Shoes">Shoes</option>
                  <option value="Accessories">Accessories</option>
                </select>
              </div>

              <div className="form-field">
                <label>Colour *</label>
                <div className="color-input-wrapper">
                  <input
                    type="color"
                    className="color-picker-box"
                    value={
                      formData.colorHex && formData.colorHex.startsWith('#')
                        ? formData.colorHex
                        : '#526E48'
                    }
                    onChange={(e) => setFormData({ ...formData, colorHex: e.target.value })}
                    title="Pick visual color"
                  />
                  <input
                    type="text"
                    placeholder="e.g. Red, Olive Green, Navy"
                    value={formData.color}
                    onChange={(e) => handleColorChange(e.target.value)}
                    style={{ flex: 1 }}
                  />
                </div>

                {/* Quick Fashion Swatches */}
                <div className="quick-swatches-row">
                  {quickSwatches.map((swatch) => (
                    <button
                      key={swatch.label}
                      type="button"
                      className="quick-swatch-btn"
                      style={{ backgroundColor: swatch.hex }}
                      title={swatch.label}
                      onClick={() => handleSwatchClick(swatch)}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="form-field">
              <label>Image URL</label>
              <input
                type="url"
                placeholder="https://..."
                value={formData.imageUrl}
                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              />
              <small style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', marginTop: '0.2rem' }}>
                Tip: Leave blank to automatically use a curated sample photo.
              </small>
            </div>

            <div className="form-field">
              <label>Description (Optional)</label>
              <textarea
                rows="3"
                placeholder="Material, fit, or styling notes..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Add to Wardrobe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ClothingForm;
