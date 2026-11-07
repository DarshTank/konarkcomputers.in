"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { Brand } from '@/lib/db/types';
import { Plus, Edit2, Tag, Search } from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminBrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBrand, setEditingBrand] = useState<Partial<Brand> | null>(null);

  const loadBrands = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/brands');
      const data = await res.json();
      if (data.brands) setBrands(data.brands);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBrands();
  }, []);

  const filtered = useMemo(() => {
    if (!searchTerm.trim()) return brands;
    const s = searchTerm.toLowerCase();
    return brands.filter((b) => b.name.toLowerCase().includes(s) || b.slug.toLowerCase().includes(s));
  }, [brands, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage, pageSize]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBrand) return;

    const res = await fetch('/api/admin/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingBrand),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingBrand(null);
      await loadBrands();
    }
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Hardware Brands</h1>
          <p className={styles.pageSubtitle}>OEMs and peripheral manufacturers catalog.</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingBrand({ name: '', slug: '', isActive: true });
            setIsModalOpen(true);
          }}
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        >
          <Plus size={14} />
          Add Brand
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
                  placeholder="Search brands..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Total: <strong>{filtered.length}</strong> brands
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Brand Name</th>
                  <th>Slug</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {paginated.length === 0 ? (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      {loading ? 'Loading brands...' : 'No brands found.'}
                    </td>
                  </tr>
                ) : (
                  paginated.map((b) => (
                    <tr key={b.id}>
                      <td>
                        <strong>{b.name}</strong>
                      </td>
                      <td>
                        <code>{b.slug}</code>
                      </td>
                      <td>
                        <span className={`${styles.statusPill} ${b.isActive ? styles.statusActive : styles.statusInactive}`}>
                          {b.isActive ? 'Active' : 'Inactive'}
                        </span>
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
            pageSizeOptions={[10, 25, 50]}
            itemName="brands"
          />
        </div>
      </div>

      {isModalOpen && editingBrand && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '440px' }}>
            <h3 style={{ marginBottom: '18px', fontWeight: 'bold', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
              Add Brand
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className={styles.formLabel}>Brand Name</label>
                  <input
                    type="text"
                    required
                    value={editingBrand.name || ''}
                    onChange={(e) =>
                      setEditingBrand({
                        ...editingBrand,
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
                    value={editingBrand.slug || ''}
                    onChange={(e) => setEditingBrand({ ...editingBrand, slug: e.target.value })}
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

