"use client";

import React, { useState, useMemo } from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import type { Product } from '@/lib/db/types';
import { DeviceContextBar } from './DeviceContextBar';
import { QuoteSidebar } from './QuoteSidebar';
import { ProductCard } from './ProductCard';
import { QuoteSummary } from './QuoteSummary';
import { QuoteSubmissionModal } from './QuoteSubmissionModal';
import { Search, ArrowUpDown } from 'lucide-react';
import styles from '../page.module.css';

export function QuoteBuilder({ products }: { products: Product[] }) {
  const { showIncompatible, getCompatibility } = useQuote();

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name'>('price_asc');
  const [specFilters, setSpecFilters] = useState<Record<string, string[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleSpecFilter = (key: string, value: string) => {
    setSpecFilters((prev) => {
      const existing = prev[key] || [];
      const next = existing.includes(value)
        ? existing.filter((v) => v !== value)
        : [...existing, value];
      return { ...prev, [key]: next };
    });
  };

  // Filter & Sort Products
  const displayedProducts = useMemo(() => {
    let result = products.filter((p) => p.isActive);

    // Category filter
    if (selectedCategoryId !== 'all') {
      result = result.filter((p) => p.categoryId === selectedCategoryId);
    }

    // In-Stock filter
    if (inStockOnly) {
      result = result.filter((p) => p.stock.status === 'in_stock');
    }

    // Search query
    if (searchTerm.trim()) {
      const query = searchTerm.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.searchKeywords.some((k) => k.includes(query)) ||
          Object.values(p.specs).some((v) => String(v).toLowerCase().includes(query))
      );
    }

    // Spec attributes filter
    for (const [key, values] of Object.entries(specFilters)) {
      if (values && values.length > 0) {
        result = result.filter((p) => {
          const specVal = p.specs[key];
          if (specVal === undefined) return false;
          return values.includes(String(specVal));
        });
      }
    }

    // Map with compatibility status
    const mapped = result.map((p) => {
      const compat = getCompatibility(p);
      return { product: p, compat };
    });

    // Incompatible filter: hide unless showIncompatible is toggled
    const filteredByCompat = showIncompatible
      ? mapped
      : mapped.filter((item) => item.compat.status !== 'incompatible');

    // Sorting:
    // 1. COMPATIBLE products sorted first (highlighted)
    // 2. NEUTRAL / CHECK products
    // 3. INCOMPATIBLE products sorted last
    // 4. Secondary sort by price or name
    filteredByCompat.sort((a, b) => {
      const orderMap = { compatible: 1, check: 2, neutral: 3, incompatible: 4 };
      const aOrder = orderMap[a.compat.status] || 3;
      const bOrder = orderMap[b.compat.status] || 3;

      if (aOrder !== bOrder) {
        return aOrder - bOrder;
      }

      if (sortBy === 'price_asc') {
        return a.product.pricing.pricePaise - b.product.pricing.pricePaise;
      }
      if (sortBy === 'price_desc') {
        return b.product.pricing.pricePaise - a.product.pricing.pricePaise;
      }
      return a.product.name.localeCompare(b.product.name);
    });

    return filteredByCompat.map((item) => item.product);
  }, [
    products,
    selectedCategoryId,
    inStockOnly,
    searchTerm,
    specFilters,
    showIncompatible,
    sortBy,
    getCompatibility,
  ]);

  return (
    <div className={styles.quotePage}>
      {/* Hero Banner */}
      <section className={styles.heroBanner}>
        <div className="container">
          <div className={styles.heroContent}>
            <span style={{ fontSize: 'var(--text-xs)', textTransform: 'uppercase', letterSpacing: '0.15em', color: 'var(--color-accent)', fontWeight: 700 }}>
              Konark Smart Quotation Builder
            </span>
            <h1 className={styles.heroTitle}>Build Your Custom Computer Hardware Quote</h1>
            <p className={styles.heroSubtitle}>
              Select genuine computer &amp; laptop components. Our smart compatibility filter automatically verifies pin count, wattage, generation, and form factors to eliminate mismatched parts.
            </p>

            <DeviceContextBar />
          </div>
        </div>
      </section>

      {/* Main 3-Column Workspace */}
      <div className="container">
        <div className={styles.mainContainer}>
          {/* Left Sidebar */}
          <QuoteSidebar
            selectedCategoryId={selectedCategoryId}
            onSelectCategory={(id) => {
              setSelectedCategoryId(id);
              setSpecFilters({});
            }}
            specFilters={specFilters}
            onToggleSpecFilter={handleToggleSpecFilter}
            inStockOnly={inStockOnly}
            onToggleInStock={setInStockOnly}
          />

          {/* Center Product Catalog */}
          <main className={styles.catalogArea}>
            <div className={styles.catalogToolbar}>
              <div className={styles.searchWrap}>
                <Search size={16} className={styles.searchIcon} />
                <input
                  type="text"
                  placeholder="Search RAM, SSD, Chargers, Screens..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  aria-label="Search hardware catalog"
                />
              </div>

              <div className={styles.toolbarToggles}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ArrowUpDown size={14} color="var(--color-text-secondary)" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className={styles.selectInput}
                    style={{ background: 'var(--color-surface)', color: 'var(--color-dark)', borderColor: 'var(--color-border)' }}
                    aria-label="Sort by price"
                  >
                    <option value="price_asc">Price: Low to High</option>
                    <option value="price_desc">Price: High to Low</option>
                    <option value="name">Product Name (A-Z)</option>
                  </select>
                </div>

                <span style={{ fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                  {displayedProducts.length} items
                </span>
              </div>
            </div>

            {/* Products Grid */}
            {displayedProducts.length > 0 ? (
              <div className={styles.productGrid}>
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div
                style={{
                  background: 'var(--color-white)',
                  padding: '40px',
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  border: '1px solid var(--color-border)',
                }}
              >
                <p style={{ color: 'var(--color-text-muted)' }}>
                  No products matched your active filters or compatibility criteria.
                </p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => {
                    setSelectedCategoryId('all');
                    setSearchTerm('');
                    setSpecFilters({});
                  }}
                  style={{ marginTop: '16px', color: 'var(--color-dark)', borderColor: 'var(--color-border)' }}
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>

          {/* Right Sticky Summary Drawer */}
          <QuoteSummary onOpenForm={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/* Submission Modal */}
      <QuoteSubmissionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}

