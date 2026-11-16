"use client";

import React, { useState, useMemo, useEffect } from 'react';
import { useQuote } from '@/contexts/QuoteContext';
import type { Product } from '@/lib/db/types';
import { QuoteSidebar } from './QuoteSidebar';
import { ProductCard } from './ProductCard';
import { QuoteSummary } from './QuoteSummary';
import { QuoteSubmissionModal } from './QuoteSubmissionModal';
import { Search, ArrowUpDown, RefreshCw } from 'lucide-react';
import { formatPaise } from '@/lib/pricing/calculator';
import styles from '../page.module.css';

type BuildPart = {
  id: string;
  name: string;
  categoryId: string;
  brandName?: string;
  pricing: Product['pricing'];
  condition: Product['condition'];
  warrantyMonths: number;
};

type RecommendedBuild = {
  id: string;
  profileId: string;
  parts: BuildPart[];
  totals: { grandTotalPaise: number };
  budgetUsePct: number;
  isStretch: boolean;
};

export function QuoteBuilder({ products: initialProducts }: { products: Product[] }) {
  const {
    showIncompatible,
    getCompatibility,
    budgetPaise,
    setBudgetPaise,
    refreshProducts,
  } = useQuote();

  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'price_asc' | 'price_desc' | 'name'>('price_asc');
  const [specFilters, setSpecFilters] = useState<Record<string, string[]>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState(0);
  const [platform, setPlatform] = useState<'intel' | 'ryzen'>('intel');
  const [recommendedBuilds, setRecommendedBuilds] = useState<RecommendedBuild[]>([]);
  const [buildLoading, setBuildLoading] = useState(false);
  const [buildError, setBuildError] = useState<string | null>(null);
  const budgetOptions = Array.from({ length: 10 }, (_, index) => (index + 1) * 15000);
  const selectedBudgetRupees = budgetPaise === undefined
    ? budgetOptions[0]
    : Math.min(150000, Math.max(15000, Math.round(budgetPaise / 1500000) * 15000));

  useEffect(() => {
    let cancelled = false;
    setProductsLoading(true);
    setProductsError(null);
    const query = new URLSearchParams({
      page: String(page),
      pageSize: '24',
      category: selectedCategoryId,
      stock: inStockOnly ? 'in_stock' : 'all',
    });

    fetch(`/api/quote/products?${query}`)
      .then(async (response) => {
        if (!response.ok) {
          const data = await response.json().catch(() => null);
          throw new Error(data?.error || 'Unable to load products');
        }
        return response.json();
      })
      .then((data) => {
        if (cancelled) return;
        const nextProducts = data.products || [];
        setProducts(nextProducts);
        refreshProducts(nextProducts);
        setTotalProducts(data.pagination?.total || 0);
        setTotalPages(data.pagination?.totalPages || 1);
      })
      .catch((error: unknown) => {
        if (!cancelled) {
          setProducts([]);
          setProductsError(error instanceof Error ? error.message : 'Unable to load products');
        }
      })
      .finally(() => {
        if (!cancelled) setProductsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [page, selectedCategoryId, inStockOnly, refreshToken, refreshProducts]);

  useEffect(() => {
    setPage(1);
  }, [selectedCategoryId, inStockOnly]);

  useEffect(() => {
    if (budgetPaise === undefined) {
      setRecommendedBuilds([]);
      setBuildError(null);
      return;
    }

    const controller = new AbortController();
    setBuildLoading(true);
    setBuildError(null);
    fetch('/api/builds', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ platform, budgetPaise }),
      signal: controller.signal,
    })
      .then(async (response) => {
        const data = await response.json().catch(() => null);
        if (!response.ok) {
          throw new Error(data?.message || 'Unable to generate a matching PC build.');
        }
        return data;
      })
      .then((data) => {
        if (!controller.signal.aborted) {
          setRecommendedBuilds(data.builds || []);
          if (!data.builds?.length) {
            setBuildError('No complete build is available in this price range for the selected processor family.');
          }
        }
      })
      .catch((error: unknown) => {
        if (!controller.signal.aborted) {
          setRecommendedBuilds([]);
          setBuildError(error instanceof Error ? error.message : 'Unable to generate a matching PC build.');
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setBuildLoading(false);
      });

    return () => controller.abort();
  }, [budgetPaise, platform]);

  // Live real-time response if quote page is disabled while active
  useEffect(() => {
    let bc: BroadcastChannel | null = null;
    if (typeof BroadcastChannel !== 'undefined') {
      bc = new BroadcastChannel('konark_settings_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'QUOTE_VISIBILITY_CHANGED' && event.data.enabled === false) {
          window.location.reload();
        }
      };
    }
    const handleStorage = (e: StorageEvent) => {
      if (e.key === 'konark_quote_enabled' && e.newValue === 'false') {
        window.location.reload();
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      if (bc) bc.close();
      window.removeEventListener('storage', handleStorage);
    };
  }, []);

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
                  {totalProducts} items
                </span>
                <button
                  type="button"
                  className={styles.refreshButton}
                  onClick={() => setRefreshToken((current) => current + 1)}
                  disabled={productsLoading}
                  aria-label="Refresh product catalog"
                  title="Refresh product catalog"
                >
                  <RefreshCw size={14} className={productsLoading ? styles.refreshing : ''} />
                  Refresh
                </button>
              </div>
            </div>

            <div className={styles.budgetBar}>
              <div>
                <strong>Set a build budget</strong>
                <span>
                  {budgetPaise === undefined
                    ? 'Choose a target from ₹15,000 to ₹1,50,000.'
                    : `Keep your estimate within ${formatPaise(budgetPaise)}.`}
                </span>
              </div>
              <div className={styles.budgetControls}>
                <div className={styles.budgetSliderGroup}>
                  <label htmlFor="quote-budget" className={styles.srOnly}>Budget in rupees</label>
                  <input
                    id="quote-budget"
                    type="range"
                    min="15000"
                    max="150000"
                    step="15000"
                    value={selectedBudgetRupees}
                    onChange={(event) => setBudgetPaise(Number(event.target.value) * 100)}
                    className={styles.budgetInput}
                  />
                  <div className={styles.budgetBreakpoints} aria-hidden="true">
                    {budgetOptions.map((amount, index) => (
                      <span
                        key={amount}
                        style={{ left: `${(index / (budgetOptions.length - 1)) * 100}%` }}
                      >
                        {amount / 1000}k
                      </span>
                    ))}
                  </div>
                </div>
                <output className={styles.budgetOutput} htmlFor="quote-budget">
                  {formatPaise(selectedBudgetRupees * 100)}
                </output>
                {budgetPaise !== undefined && (
                  <button
                    type="button"
                    className={styles.clearBudgetButton}
                    onClick={() => setBudgetPaise(undefined)}
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>

            <section className={styles.buildRecommendations} aria-labelledby="build-recommendations-title">
              <div className={styles.buildRecommendationHeader}>
                <div>
                  <span className={styles.sectionEyebrow}>Complete PC suggestions</span>
                  <h2 id="build-recommendations-title">Build around your processor</h2>
                  <p>Every suggestion includes the required parts and stays within the selected budget range.</p>
                </div>
                <div className={styles.platformToggle} role="group" aria-label="Processor family">
                  <button
                    type="button"
                    className={platform === 'intel' ? styles.platformActive : ''}
                    onClick={() => setPlatform('intel')}
                  >
                    Intel
                  </button>
                  <button
                    type="button"
                    className={platform === 'ryzen' ? styles.platformActive : ''}
                    onClick={() => setPlatform('ryzen')}
                  >
                    Ryzen
                  </button>
                </div>
              </div>

              {budgetPaise === undefined ? (
                <p className={styles.buildMessage}>Select a budget above to see complete Intel or Ryzen PC builds.</p>
              ) : buildLoading ? (
                <p className={styles.buildMessage}>Finding compatible {platform === 'intel' ? 'Intel' : 'Ryzen'} builds...</p>
              ) : buildError ? (
                <p className={styles.buildMessage}>{buildError}</p>
              ) : (
                <div className={styles.buildGrid}>
                  {recommendedBuilds.map((build) => (
                    <article key={build.id} className={styles.buildCard}>
                      <div className={styles.buildCardTop}>
                        <div>
                          <span className={styles.buildProfile}>{build.profileId}</span>
                          <h3>{platform === 'intel' ? 'Intel' : 'Ryzen'} complete PC</h3>
                        </div>
                        <strong>{formatPaise(build.totals.grandTotalPaise)}</strong>
                      </div>
                      <p className={styles.buildRange}>
                        {build.isStretch ? 'Stretch option' : 'Within target'} · {Math.round(build.budgetUsePct)}% of budget
                      </p>
                      <ul className={styles.buildParts}>
                        {build.parts.map((part) => (
                          <li key={part.id}>
                            <span>{part.name}</span>
                            <strong>{formatPaise(part.pricing.pricePaise)}</strong>
                          </li>
                        ))}
                      </ul>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* Products Grid */}
            {productsLoading ? (
              <div className={styles.emptyState}>Loading products...</div>
            ) : productsError ? (
              <div className={styles.emptyState}>
                <p>{productsError}</p>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => window.location.reload()}
                  style={{ marginTop: '16px', color: 'var(--color-dark)', borderColor: 'var(--color-border)' }}
                >
                  Retry
                </button>
              </div>
            ) : displayedProducts.length > 0 ? (
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

            {!productsLoading && totalPages > 1 && (
              <div className={styles.pagination}>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setPage((current) => Math.max(1, current - 1))}
                  disabled={page === 1}
                >
                  Previous
                </button>
                <span>Page {page} of {totalPages}</span>
                <button
                  type="button"
                  className="btn btn--outline"
                  onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
                  disabled={page === totalPages}
                >
                  Next
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

