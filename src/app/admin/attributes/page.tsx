"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { AttributeDefinition, Category } from '@/lib/db/types';
import { Plus, Sliders, Check, X, Search } from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminAttributesPage() {
  const [attributes, setAttributes] = useState<AttributeDefinition[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAttr, setEditingAttr] = useState<Partial<AttributeDefinition> | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      const [attrRes, catRes] = await Promise.all([
        fetch('/api/admin/attributes'),
        fetch('/api/admin/categories'),
      ]);
      const attrData = await attrRes.json();
      const catData = await catRes.json();
      if (attrData.attributes) setAttributes(attrData.attributes);
      if (catData.categories) {
        setCategories(catData.categories);
      }
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredAttrs = useMemo(() => {
    let result = attributes;
    if (selectedCategory !== 'all') {
      result = result.filter((a) => a.categoryId === selectedCategory);
    }
    if (searchTerm.trim()) {
      const s = searchTerm.toLowerCase();
      result = result.filter(
        (a) =>
          a.key.toLowerCase().includes(s) ||
          a.label.toLowerCase().includes(s) ||
          a.categoryId.toLowerCase().includes(s) ||
          a.options?.some((opt) => opt.toLowerCase().includes(s))
      );
    }
    return result;
  }, [attributes, selectedCategory, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory, searchTerm]);

  const paginatedAttrs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredAttrs.slice(start, start + pageSize);
  }, [filteredAttrs, currentPage, pageSize]);

  const handleToggleCompat = async (attr: AttributeDefinition) => {
    const nextVal = !attr.compatKey;
    try {
      await fetch('/api/admin/attributes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: attr.id, compatKey: nextVal }),
      });
      setAttributes((prev) =>
        prev.map((a) => (a.id === attr.id ? { ...a, compatKey: nextVal } : a))
      );
    } catch {}
  };

  const handleToggleFilterable = async (attr: AttributeDefinition) => {
    const nextVal = !attr.filterable;
    try {
      await fetch('/api/admin/attributes', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: attr.id, filterable: nextVal }),
      });
      setAttributes((prev) =>
        prev.map((a) => (a.id === attr.id ? { ...a, filterable: nextVal } : a))
      );
    } catch {}
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingAttr) return;

    const res = await fetch('/api/admin/attributes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingAttr),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingAttr(null);
      await loadData();
    }
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Specification Attributes</h1>
          <p className={styles.pageSubtitle}>
            Configure technical specs and toggle <strong>compatKey</strong> flags for automatic hardware compatibility.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingAttr({
              categoryId: selectedCategory === 'all' ? (categories[0]?.id || 'ram') : selectedCategory,
              key: '',
              label: '',
              type: 'enum',
              options: [],
              filterable: true,
              compatKey: false,
              required: false,
              displayOrder: filteredAttrs.length + 1,
            });
            setIsModalOpen(true);
          }}
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        >
          <Plus size={14} />
          Add Attribute
        </button>
      </div>

      <div className={styles.adminContent}>
        <div className={styles.tableCard}>
          {/* Card Header & Toolbar */}
          <div className={styles.cardHeader}>
            <div className={styles.tableToolbar}>
              <div className={styles.searchInputWrapper}>
                <Search size={14} className={styles.searchInputIcon} />
                <input
                  type="text"
                  placeholder="Search attributes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className={styles.filterSelect}
                style={{ minWidth: '180px' }}
              >
                <option value="all">All Categories ({categories.length})</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Total: <strong>{filteredAttrs.length}</strong> attributes
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Attribute Key</th>
                  <th>Label</th>
                  <th>Type</th>
                  <th>Options</th>
                  <th>Filterable</th>
                  <th>Compat Engine Key</th>
                </tr>
              </thead>
              <tbody>
                {paginatedAttrs.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      {loading ? 'Loading attributes...' : 'No attributes found matching filters.'}
                    </td>
                  </tr>
                ) : (
                  paginatedAttrs.map((a) => (
                    <tr key={a.id}>
                      <td>
                        <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0f766e', textTransform: 'capitalize' }}>
                          {categories.find((c) => c.id === a.categoryId)?.name || a.categoryId}
                        </span>
                      </td>
                      <td>
                        <code>{a.key}</code>
                      </td>
                      <td>
                        <strong>{a.label}</strong>
                      </td>
                      <td>{a.type}</td>
                      <td>
                        <span style={{ fontSize: '0.7rem', color: '#64748b' }}>
                          {a.options.join(', ') || '-'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleFilterable(a)}
                          className={`${styles.statusPill} ${
                            a.filterable ? styles.statusActive : styles.statusInactive
                          }`}
                        >
                          {a.filterable ? 'Yes' : 'No'}
                        </button>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleToggleCompat(a)}
                          className={`${styles.statusPill} ${
                            a.compatKey ? styles.statusActive : styles.statusInactive
                          }`}
                          style={{
                            background: a.compatKey ? '#dcfce7' : '#f1f5f9',
                            color: a.compatKey ? '#166534' : '#64748b',
                            fontWeight: a.compatKey ? 'bold' : 'normal',
                          }}
                          title="Click to toggle compatibility check on this key"
                        >
                          {a.compatKey ? 'Active Compat Key' : 'Standard Spec'}
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
            totalItems={filteredAttrs.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 15, 25, 50]}
            itemName="attributes"
          />
        </div>
      </div>

      {isModalOpen && editingAttr && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '480px' }}>
            <h3 style={{ marginBottom: '18px', fontWeight: 'bold', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
              Add Spec Attribute
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className={styles.formLabel}>Key (camelCase or alphanumeric)</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. memoryType, wattage, pinCount"
                    value={editingAttr.key || ''}
                    onChange={(e) => setEditingAttr({ ...editingAttr, key: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>Label</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Memory Generation, Adapter Wattage"
                    value={editingAttr.label || ''}
                    onChange={(e) => setEditingAttr({ ...editingAttr, label: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>Options (comma separated)</label>
                  <input
                    type="text"
                    placeholder="DDR3, DDR4, DDR5"
                    value={editingAttr.options?.join(', ') || ''}
                    onChange={(e) =>
                      setEditingAttr({
                        ...editingAttr,
                        options: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                      })
                    }
                    className={styles.formInput}
                  />
                </div>
                <div style={{ display: 'flex', gap: '20px', marginTop: '4px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)' }}>
                    <input
                      type="checkbox"
                      checked={editingAttr.filterable ?? true}
                      onChange={(e) =>
                        setEditingAttr({ ...editingAttr, filterable: e.target.checked })
                      }
                    />
                    <span>Filterable in Sidebar</span>
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: 'var(--text-xs)' }}>
                    <input
                      type="checkbox"
                      checked={editingAttr.compatKey ?? false}
                      onChange={(e) =>
                        setEditingAttr({ ...editingAttr, compatKey: e.target.checked })
                      }
                    />
                    <span>Use as Compat Key</span>
                  </label>
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

