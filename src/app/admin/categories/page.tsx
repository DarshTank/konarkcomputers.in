"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { Category } from '@/lib/db/types';
import { Plus, Edit2, Check, X, Layers, Search } from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCat, setEditingCat] = useState<Partial<Category> | null>(null);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return categories;
    const s = searchTerm.toLowerCase();
    return categories.filter((c) => c.name.toLowerCase().includes(s) || c.slug.toLowerCase().includes(s));
  }, [categories, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      if (data.categories) setCategories(data.categories);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCat) return;

    const isNew = !editingCat.id || !categories.some((c) => c.id === editingCat.id);
    const method = isNew ? 'POST' : 'PUT';

    const res = await fetch('/api/admin/categories', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingCat),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingCat(null);
      await loadCategories();
    } else {
      alert('Failed to save category');
    }
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Hardware Categories</h1>
          <p className={styles.pageSubtitle}>
            Administer product categories, device scope (desktop/laptop/both), and icons.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingCat({
              name: '',
              slug: '',
              deviceScope: 'both',
              iconKey: 'Box',
              sortOrder: categories.length + 1,
              isActive: true,
            });
            setIsModalOpen(true);
          }}
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        >
          <Plus size={14} />
          Add Category
        </button>
      </div>

      <div className={styles.adminContent}>
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.tableToolbar}>
              <div className={styles.searchInputWrapper}>
                <Search size={14} className={styles.searchInputIcon} />
                <input
                  type="text"
                  placeholder="Search categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Total: <strong>{filtered.length}</strong> categories
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Sort</th>
                  <th>Category Name</th>
                  <th>Slug</th>
                  <th>Device Scope</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      {loading ? 'Loading categories...' : 'No categories found.'}
                    </td>
                  </tr>
                ) : (
                  paginated.map((c) => (
                    <tr key={c.id}>
                      <td>{c.sortOrder}</td>
                      <td>
                        <strong>{c.name}</strong>
                      </td>
                      <td>
                        <code>{c.slug}</code>
                      </td>
                      <td>
                        <span style={{ textTransform: 'capitalize' }}>{c.deviceScope}</span>
                      </td>
                      <td>
                        <span
                          className={`${styles.statusPill} ${
                            c.isActive ? styles.statusActive : styles.statusInactive
                          }`}
                        >
                          {c.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingCat(c);
                            setIsModalOpen(true);
                          }}
                          className={styles.actionBtn}
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 20, 50]}
            itemName="categories"
          />
        </div>
      </div>

      {isModalOpen && editingCat && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '480px' }}>
            <h3 style={{ marginBottom: '18px', fontWeight: 'bold', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
              {editingCat.id ? 'Edit Category' : 'New Category'}
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className={styles.formLabel}>Name</label>
                  <input
                    type="text"
                    required
                    value={editingCat.name || ''}
                    onChange={(e) =>
                      setEditingCat({
                        ...editingCat,
                        name: e.target.value,
                        slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
                      })
                    }
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>Slug</label>
                  <input
                    type="text"
                    required
                    value={editingCat.slug || ''}
                    onChange={(e) => setEditingCat({ ...editingCat, slug: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>Device Scope</label>
                  <select
                    value={editingCat.deviceScope || 'both'}
                    onChange={(e) =>
                      setEditingCat({ ...editingCat, deviceScope: e.target.value as any })
                    }
                    className={styles.formInput}
                  >
                    <option value="both">Both (Desktop &amp; Laptop)</option>
                    <option value="laptop">Laptop Only</option>
                    <option value="desktop">Desktop Only</option>
                  </select>
                </div>
                <div>
                  <label className={styles.formLabel}>Sort Order</label>
                  <input
                    type="number"
                    value={editingCat.sortOrder || 1}
                    onChange={(e) => setEditingCat({ ...editingCat, sortOrder: Number(e.target.value) })}
                    className={styles.formInput}
                  />
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.btnCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" style={{ minHeight: '36px', padding: '6px 14px' }}>
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

