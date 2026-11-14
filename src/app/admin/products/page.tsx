"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { Product, Category, Brand, AttributeDefinition } from '@/lib/db/types';
import { formatPaise, rupeesToPaise, paiseToRupees } from '@/lib/pricing/calculator';
import {
  Plus,
  Search,
  Download,
  Upload,
  Copy,
  Edit2,
  Trash2,
  Check,
  X,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [attributes, setAttributes] = useState<AttributeDefinition[]>([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStock, setSelectedStock] = useState('all');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);
  const [totalProducts, setTotalProducts] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  // Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [saving, setSaving] = useState(false);

  // Quick edit price modal
  const [quickEditId, setQuickEditId] = useState<string | null>(null);
  const [quickRupees, setQuickRupees] = useState('');

  // Fetch initial catalog
  const loadData = async () => {
    try {
      setLoading(true);
      const query = new URLSearchParams({ page: String(currentPage), pageSize: String(pageSize), search: searchTerm, category: selectedCategory, stock: selectedStock });
      const [res, catRes, brandRes, attrRes] = await Promise.all([
        fetch(`/api/admin/products?${query}`),
        fetch('/api/admin/categories'),
        fetch('/api/admin/brands'),
        fetch('/api/admin/attributes'),
      ]);
      const [data, catData, brandData, attrData] = await Promise.all([
        res.json(),
        catRes.json(),
        brandRes.json(),
        attrRes.json(),
      ]);
      if (data.products) setProducts(data.products);
      if (data.pagination) setTotalProducts(data.pagination.total);
      if (catData.categories) setCategories(catData.categories);
      if (brandData.brands) setBrands(brandData.brands);
      if (attrData.attributes) setAttributes(attrData.attributes);
    } catch (err) {
      console.warn('Failed to fetch data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentPage, pageSize, searchTerm, selectedCategory, selectedStock]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedStock]);

  // The API applies these filters server-side; this memo keeps compatibility with
  // older deployments that still return the complete catalog.
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchCat = selectedCategory === 'all' || p.categoryId === selectedCategory;
      const matchStock = selectedStock === 'all' || p.stock.status === selectedStock;
      const matchSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.sku.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchStock && matchSearch;
    });
  }, [products, selectedCategory, selectedStock, searchTerm]);

  // The API already returns the requested page. Keep the local filter only as
  // a compatibility fallback for older deployments that return all products.
  const paginatedProducts = useMemo(() => {
    const serverReturnedPage = totalProducts > products.length ||
      (currentPage > 1 && products.length > 0);
    if (serverReturnedPage) return filteredProducts;
    const start = (currentPage - 1) * pageSize;
    return filteredProducts.slice(start, start + pageSize);
  }, [filteredProducts, totalProducts, products.length, currentPage, pageSize]);

  const handleBulk = async (operation: 'activate' | 'deactivate' | 'publish' | 'unpublish' | 'delete') => {
    if (!selectedIds.length || (operation === 'delete' && !confirm('Delete selected products?'))) return;
    const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'bulk', operation, ids: selectedIds }) });
    if (res.ok) { setSelectedIds([]); await loadData(); }
  };

  const handleImportCSV = async (file: File) => {
    const csv = await file.text();
    const res = await fetch('/api/admin/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'import', csv }) });
    const data = await res.json();
    if (!res.ok) alert(data.error || 'CSV import failed'); else await loadData();
  };

  // Quick Price Save
  const handleQuickPriceSave = async (id: string) => {
    try {
      const paise = rupeesToPaise(quickRupees);
      const res = await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id,
          pricing: {
            ...products.find((p) => p.id === id)?.pricing,
            pricePaise: paise,
          },
        }),
      });
      if (res.ok) {
        setProducts((prev) =>
          prev.map((p) =>
            p.id === id ? { ...p, pricing: { ...p.pricing, pricePaise: paise } } : p
          )
        );
        setQuickEditId(null);
      }
    } catch (e) {
      alert('Failed to update price');
    }
  };

  // Toggle Active
  const handleToggleActive = async (product: Product) => {
    const nextState = !product.isActive;
    try {
      await fetch('/api/admin/products', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: product.id, isActive: nextState }),
      });
      setProducts((prev) =>
        prev.map((p) => (p.id === product.id ? { ...p, isActive: nextState } : p))
      );
    } catch {}
  };

  // Delete Product
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch {}
  };

  // Duplicate Product
  const handleDuplicate = async (p: Product) => {
    const duplicated: Partial<Product> = {
      ...p,
      id: `prod-${Date.now()}`,
      sku: `${p.sku}-COPY`,
      name: `${p.name} (Copy)`,
      slug: `${p.slug}-copy`,
    };
    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicated),
      });
      const data = await res.json();
      if (data.product) {
        setProducts((prev) => [data.product, ...prev]);
      }
    } catch {}
  };

  // Save Modal Product
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    setSaving(true);

    try {
      const isNew = !editingProduct.id || !products.some((p) => p.id === editingProduct.id);
      const url = '/api/admin/products';
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      if (res.ok) {
        setIsEditModalOpen(false);
        setEditingProduct(null);
        await loadData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to save product');
      }
    } catch (err: any) {
      alert(err.message || 'Save error');
    } finally {
      setSaving(false);
    }
  };

  // CSV Export
  const handleExportCSV = async () => {
    try {
      const response = await fetch('/api/admin/products?format=csv');
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `konark-products-${new Date().toISOString().slice(0, 10)}.csv`;
        link.click();
        URL.revokeObjectURL(url);
        return;
      }
    } catch {}
    // Keep the local fallback for offline/demo mode.
    const headers = ['id', 'sku', 'name', 'categoryId', 'brandId', 'priceRupees', 'gstRate', 'hsnCode', 'condition', 'warranty', 'status'];
    const rows = products.map((p) => [
      p.id,
      p.sku,
      `"${p.name.replace(/"/g, '""')}"`,
      p.categoryId,
      p.brandId,
      (p.pricing.pricePaise / 100).toFixed(2),
      `${p.pricing.gstRateBps / 100}%`,
      p.pricing.hsnCode,
      p.condition,
      p.warrantyMonths,
      p.stock.status,
    ]);

    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `konark-products-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Product Management</h1>
          <p className={styles.pageSubtitle}>
            Add, update pricing, manage stock, and edit compatibility attributes.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button type="button" onClick={handleExportCSV} className={styles.btnSecondary}>
            <Download size={14} />
            Export CSV
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingProduct({
                sku: `SKU-${Math.floor(1000 + Math.random() * 9000)}`,
                name: '',
                slug: '',
                categoryId: categories[0]?.id || 'ram',
                brandId: brands[0]?.id || 'crucial',
                description: '',
                specs: {},
                compat: {},
                condition: 'new',
                warrantyMonths: 12,
                pricing: {
                  pricePaise: 100000,
                  priceIncludesGst: true,
                  gstRateBps: 1800,
                  hsnCode: '847330',
                },
                stock: { status: 'in_stock', qty: 10 },
                isActive: true,
                searchKeywords: [],
                images: [],
              });
              setIsEditModalOpen(true);
            }}
            className="btn btn--primary"
            style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
          >
            <Plus size={14} />
            New Product
          </button>
        </div>
      </div>

      <div className={styles.adminContent}>
        <div className={styles.tableCard}>
          {/* Toolbar */}
          <div className={styles.cardHeader}>
            <div className={styles.tableToolbar}>
              <input type="file" accept=".csv,text/csv" style={{ display: 'none' }} id="product-csv-import" onChange={(e) => e.target.files?.[0] && handleImportCSV(e.target.files[0])} />
              <button type="button" className={styles.btnSecondary} onClick={() => document.getElementById('product-csv-import')?.click()}><Upload size={14} /> Import CSV</button>
              {selectedIds.length > 0 && <>
                <button type="button" className={styles.btnSecondary} onClick={() => handleBulk('activate')}>Activate selected</button>
                <button type="button" className={styles.btnSecondary} onClick={() => handleBulk('deactivate')}>Deactivate selected</button>
                <button type="button" className={styles.btnSecondary} onClick={() => handleBulk('delete')}>Delete selected</button>
              </>}
              <div className={styles.searchInputWrapper}>
                <Search size={14} className={styles.searchInputIcon} />
                <input
                  type="text"
                  placeholder="Search by name or SKU..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
                style={{ minWidth: '170px' }}
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedStock}
                onChange={(e) => setSelectedStock(e.target.value)}
                className={styles.filterSelect}
                style={{ minWidth: '150px' }}
              >
                <option value="all">All Stock Status</option>
                <option value="in_stock">In Stock</option>
                <option value="low">Low Stock</option>
                <option value="out_of_stock">Out of Stock</option>
              </select>
            </div>

            <span style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Showing {filteredProducts.length} of {totalProducts || products.length} products
            </span>
          </div>

          {/* Table */}
          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th><input type="checkbox" aria-label="Select all visible products" checked={paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedIds.includes(p.id))} onChange={(e) => setSelectedIds(e.target.checked ? paginatedProducts.map((p) => p.id) : [])} /></th>
                  <th>SKU</th>
                  <th>Product Name</th>
                  <th>Category</th>
                  <th>Price (₹)</th>
                  <th>Stock</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedProducts.map((p) => {
                  const isQuickEditing = quickEditId === p.id;
                  return (
                    <tr key={p.id}>
                      <td><input type="checkbox" aria-label={`Select ${p.name}`} checked={selectedIds.includes(p.id)} onChange={(e) => setSelectedIds((ids) => e.target.checked ? [...new Set([...ids, p.id])] : ids.filter((id) => id !== p.id))} /></td>
                      <td>
                        <code>{p.sku}</code>
                      </td>
                      <td>
                        <strong>{p.name}</strong>
                        <div style={{ color: '#64748b', fontSize: '0.7rem' }}>
                          Brand: {p.brandId} | {p.condition} | {p.warrantyMonths}m war.
                        </div>
                      </td>
                      <td>{p.categoryId}</td>
                      <td>
                        {isQuickEditing ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <input
                              type="number"
                              value={quickRupees}
                              onChange={(e) => setQuickRupees(e.target.value)}
                              style={{ width: '80px', padding: '2px 4px', fontSize: 'var(--text-xs)' }}
                            />
                            <button
                              type="button"
                              onClick={() => handleQuickPriceSave(p.id)}
                              style={{ color: 'green' }}
                            >
                              <Check size={14} />
                            </button>
                            <button
                              type="button"
                              onClick={() => setQuickEditId(null)}
                              style={{ color: 'red' }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        ) : (
                          <span
                            onClick={() => {
                              setQuickEditId(p.id);
                              setQuickRupees(String(p.pricing.pricePaise / 100));
                            }}
                            title="Click to quick-edit price"
                            style={{ cursor: 'pointer', borderBottom: '1px dotted #94a3b8' }}
                          >
                            <strong>{formatPaise(p.pricing.pricePaise)}</strong>
                            <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'block' }}>
                              {p.pricing.priceIncludesGst ? 'incl. GST' : '+GST'}
                            </span>
                          </span>
                        )}
                      </td>
                      <td>
                        <span
                          className={styles.statusPill}
                          style={{
                            background: p.stock.status === 'in_stock' ? '#dcfce7' : '#fee2e2',
                            color: p.stock.status === 'in_stock' ? '#166534' : '#991b1b',
                          }}
                        >
                          {p.stock.status}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleActive(p)}
                          className={`${styles.statusPill} ${
                            p.isActive ? styles.statusActive : styles.statusInactive
                          }`}
                        >
                          {p.isActive ? 'Active' : 'Inactive'}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '4px' }}>
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProduct(p);
                              setIsEditModalOpen(true);
                            }}
                            className={styles.actionBtn}
                            title="Edit"
                          >
                            <Edit2 size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDuplicate(p)}
                            className={styles.actionBtn}
                            title="Duplicate"
                          >
                            <Copy size={14} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(p.id)}
                            className={styles.actionBtn}
                            style={{ color: '#ef4444' }}
                            title="Delete"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={totalProducts || filteredProducts.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 25, 50, 100]}
            itemName="products"
          />
        </div>
      </div>

      {/* Full Edit Modal */}
      {isEditModalOpen && editingProduct && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '750px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                {editingProduct.id && products.some((p) => p.id === editingProduct.id)
                  ? 'Edit Product'
                  : 'New Hardware Product'}
              </h2>
              <button type="button" onClick={() => setIsEditModalOpen(false)}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveProduct}>
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>SKU *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.sku || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, sku: e.target.value.toUpperCase() })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Product Name *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.name || ''}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Category *</label>
                  <select
                    value={editingProduct.categoryId || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, categoryId: e.target.value })
                    }
                    className={styles.formInput}
                  >
                    {categories.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Brand *</label>
                  <select
                    value={editingProduct.brandId || ''}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, brandId: e.target.value })
                    }
                    className={styles.formInput}
                  >
                    {brands.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Price in Rupees (₹) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={
                      editingProduct.pricing?.pricePaise
                        ? (editingProduct.pricing.pricePaise / 100).toFixed(2)
                        : ''
                    }
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        pricing: {
                          ...editingProduct.pricing!,
                          pricePaise: rupeesToPaise(e.target.value || 0),
                        },
                      })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>GST Rate (BPS) *</label>
                  <select
                    value={editingProduct.pricing?.gstRateBps || 1800}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        pricing: {
                          ...editingProduct.pricing!,
                          gstRateBps: Number(e.target.value),
                        },
                      })
                    }
                    className={styles.formInput}
                  >
                    <option value={1800}>18% (Standard IT Hardware)</option>
                    <option value={1200}>12%</option>
                    <option value={2800}>28%</option>
                    <option value={500}>5%</option>
                    <option value={0}>0% (Exempt)</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>HSN Code *</label>
                  <input
                    type="text"
                    required
                    value={editingProduct.pricing?.hsnCode || '847330'}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        pricing: {
                          ...editingProduct.pricing!,
                          hsnCode: e.target.value,
                        },
                      })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Warranty (Months)</label>
                  <input
                    type="number"
                    value={editingProduct.warrantyMonths || 12}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        warrantyMonths: Number(e.target.value),
                      })
                    }
                    className={styles.formInput}
                  />
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Stock Status</label>
                  <select
                    value={editingProduct.stock?.status || 'in_stock'}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        stock: {
                          ...editingProduct.stock,
                          status: e.target.value as any,
                        },
                      })
                    }
                    className={styles.formInput}
                  >
                    <option value="in_stock">In Stock</option>
                    <option value="low">Low Stock</option>
                    <option value="out_of_stock">Out of Stock</option>
                    <option value="on_order">On Order</option>
                  </select>
                </div>

                <div className={styles.formGroup}>
                  <label className={styles.formLabel}>Condition</label>
                  <select
                    value={editingProduct.condition || 'new'}
                    onChange={(e) =>
                      setEditingProduct({
                        ...editingProduct,
                        condition: e.target.value as any,
                      })
                    }
                    className={styles.formInput}
                  >
                    <option value="new">New</option>
                    <option value="original">Original OEM</option>
                    <option value="compatible">Compatible Grade A</option>
                    <option value="refurbished">Refurbished</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Specifications for Selected Category */}
              <div style={{ marginTop: '20px', borderTop: '1px solid #e2e8f0', paddingTop: '16px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '10px' }}>
                  Specifications &amp; Compatibility Flags
                </h3>
                <div className={styles.formGrid}>
                  {attributes
                    .filter((a) => a.categoryId === editingProduct.categoryId)
                    .map((attr) => (
                      <div key={attr.id} className={styles.formGroup}>
                        <label className={styles.formLabel}>
                          {attr.label} {attr.compatKey ? '(Compat Key)' : ''}
                        </label>
                        {attr.type === 'enum' ? (
                          <select
                            value={(editingProduct.specs?.[attr.key] as string) || ''}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                specs: {
                                  ...editingProduct.specs,
                                  [attr.key]: e.target.value,
                                },
                                compat: {
                                  ...editingProduct.compat,
                                  ...(attr.compatKey ? { [attr.key]: e.target.value } : {}),
                                },
                              })
                            }
                            className={styles.formInput}
                          >
                            <option value="">Select...</option>
                            {attr.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={(editingProduct.specs?.[attr.key] as string) || ''}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                specs: {
                                  ...editingProduct.specs,
                                  [attr.key]: e.target.value,
                                },
                              })
                            }
                            className={styles.formInput}
                          />
                        )}
                      </div>
                    ))}
                </div>
              </div>

              <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setIsEditModalOpen(false)}
                  className={styles.btnCancel}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn btn--primary"
                  style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
                >
                  {saving ? 'Saving...' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
