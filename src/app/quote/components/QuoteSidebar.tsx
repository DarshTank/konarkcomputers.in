"use client";

import React, { useState } from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import { Layers, Filter, ChevronDown } from 'lucide-react';
import styles from '../page.module.css';

interface QuoteSidebarProps {
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  specFilters: Record<string, string[]>;
  onToggleSpecFilter: (key: string, value: string) => void;
  inStockOnly: boolean;
  onToggleInStock: (val: boolean) => void;
}

export function QuoteSidebar({
  selectedCategoryId,
  onSelectCategory,
  specFilters,
  onToggleSpecFilter,
  inStockOnly,
  onToggleInStock,
}: QuoteSidebarProps) {
  const { categories, attributes, showIncompatible, setShowIncompatible } = useQuote();
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);

  // Attributes for currently selected category that are filterable
  const categoryAttributes = attributes.filter(
    (a) => a.categoryId === selectedCategoryId && a.filterable && a.options.length > 0
  );

  const activeCat = categories.find((c) => c.id === selectedCategoryId);
  const activeCatName = activeCat ? activeCat.name : 'All Categories';
  const activeFilterCount =
    Object.values(specFilters).reduce((sum, arr) => sum + (arr?.length || 0), 0) +
    (inStockOnly ? 1 : 0);

  const handleCategoryClick = (id: string) => {
    onSelectCategory(id);
    setIsMobileExpanded(false);
  };

  return (
    <aside className={styles.sidebar}>
      {/* Mobile Toggle Bar (Visible on mobile/tablet <= 860px) */}
      <div
        className={styles.mobileSidebarToggle}
        onClick={() => setIsMobileExpanded((prev) => !prev)}
        role="button"
        tabIndex={0}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="var(--color-teal)" />
          <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: 'var(--color-dark)' }}>
            Category: {activeCatName}
          </span>
          {activeFilterCount > 0 && (
            <span className={styles.filterBadge}>{activeFilterCount}</span>
          )}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            fontSize: 'var(--text-xs)',
            color: 'var(--color-teal)',
            fontWeight: 600,
          }}
        >
          <span>{isMobileExpanded ? 'Close Filters' : 'Change Category'}</span>
          <ChevronDown
            size={16}
            style={{
              transform: isMobileExpanded ? 'rotate(180deg)' : 'none',
              transition: 'transform 0.2s ease',
            }}
          />
        </div>
      </div>

      <div className={`${styles.sidebarBody} ${isMobileExpanded ? styles.sidebarBodyOpen : ''}`}>
        {/* Categories */}
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarHeading}>
            <span>Hardware Categories</span>
            <Layers size={14} />
          </div>
          <div className={styles.categoryList}>
            <button
              type="button"
              className={`${styles.categoryBtn} ${selectedCategoryId === 'all' ? styles.categoryBtnActive : ''}`}
              onClick={() => handleCategoryClick('all')}
            >
              <span>All Categories</span>
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`${styles.categoryBtn} ${
                  selectedCategoryId === cat.id ? styles.categoryBtnActive : ''
                }`}
                onClick={() => handleCategoryClick(cat.id)}
              >
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Global & In-Stock Toggles */}
        <div className={styles.sidebarSection}>
          <div className={styles.sidebarHeading}>
            <span>Filter &amp; Visibility</span>
            <Filter size={14} />
          </div>

          <label className={styles.checkboxItem}>
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => onToggleInStock(e.target.checked)}
            />
            <span>In Stock Only</span>
          </label>

          <label className={styles.checkboxItem} style={{ marginTop: '8px' }}>
            <input
              type="checkbox"
              checked={showIncompatible}
              onChange={(e) => setShowIncompatible(e.target.checked)}
            />
            <span>Show Incompatible Items</span>
          </label>
        </div>

        {/* Dynamic Spec Attributes for Selected Category */}
        {selectedCategoryId !== 'all' && categoryAttributes.length > 0 && (
          <div className={styles.sidebarSection}>
            <div className={styles.sidebarHeading}>
              <span>Specifications</span>
            </div>

            {categoryAttributes.map((attr) => (
              <div key={attr.id} className={styles.filterGroup}>
                <span className={styles.filterLabel}>{attr.label}</span>
                {attr.options.map((opt) => {
                  const isChecked = specFilters[attr.key]?.includes(opt) || false;
                  return (
                    <label key={opt} className={styles.checkboxItem}>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => onToggleSpecFilter(attr.key, opt)}
                      />
                      <span>{opt}</span>
                    </label>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}


