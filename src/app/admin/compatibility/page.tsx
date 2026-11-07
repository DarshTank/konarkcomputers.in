"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { CompatibilityRule, Category } from '@/lib/db/types';
import { Plus, Trash2, Search } from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminCompatibilityPage() {
  const [rules, setRules] = useState<CompatibilityRule[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // New Rule Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sourceCat, setSourceCat] = useState('ram');
  const [targetCat, setTargetCat] = useState('ram');
  const [sourceField, setSourceField] = useState('specs.memoryType');
  const [targetField, setTargetField] = useState('specs.memoryType');
  const [operator, setOperator] = useState<'eq' | 'in' | 'intersects' | 'lte' | 'gte'>('eq');
  const [severity, setSeverity] = useState<'block' | 'warn'>('block');
  const [message, setMessage] = useState('Memory generations must match.');

  const loadData = async () => {
    try {
      setLoading(true);
      const [rRes, cRes] = await Promise.all([
        fetch('/api/admin/compatibility'),
        fetch('/api/admin/categories'),
      ]);
      const rData = await rRes.json();
      const cData = await cRes.json();

      if (rData.rules) setRules(rData.rules);
      if (cData.categories) setCategories(cData.categories);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleCreateRule = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      sourceCategoryId: sourceCat,
      targetCategoryId: targetCat,
      constraints: [{ sourceField, targetField, operator }],
      severity,
      message,
      isActive: true,
    };

    const res = await fetch('/api/admin/compatibility', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setIsModalOpen(false);
      await loadData();
    } else {
      alert('Failed to save compatibility rule.');
    }
  };

  const handleDeleteRule = async (id: string) => {
    if (!confirm('Delete this compatibility rule?')) return;
    await fetch(`/api/admin/compatibility?id=${id}`, { method: 'DELETE' });
    setRules((prev) => prev.filter((r) => r.id !== id));
  };

  const filteredRules = useMemo(() => {
    if (!searchTerm.trim()) return rules;
    const s = searchTerm.toLowerCase();
    return rules.filter(
      (r) =>
        r.sourceCategoryId.toLowerCase().includes(s) ||
        r.targetCategoryId.toLowerCase().includes(s) ||
        r.message.toLowerCase().includes(s) ||
        r.severity.toLowerCase().includes(s)
    );
  }, [rules, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedRules = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRules.slice(start, start + pageSize);
  }, [filteredRules, currentPage, pageSize]);

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Compatibility Engine &amp; Rules</h1>
          <p className={styles.pageSubtitle}>
            Define cross-category constraint rules for the automatic hardware compatibility engine.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        >
          <Plus size={14} />
          Add Explicit Rule
        </button>
      </div>

      <div className={styles.adminContent}>
        {/* Existing Rules Table */}
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.tableToolbar}>
              <div className={styles.searchInputWrapper}>
                <Search size={14} className={styles.searchInputIcon} />
                <input
                  type="text"
                  placeholder="Search rules..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Total: <strong>{filteredRules.length}</strong> rules
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Source Category</th>
                  <th>Target Category</th>
                  <th>Constraint Mapping</th>
                  <th>Severity</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {paginatedRules.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      {loading ? 'Loading rules...' : 'No compatibility rules found.'}
                    </td>
                  </tr>
                ) : (
                  paginatedRules.map((r) => (
                    <tr key={r.id}>
                      <td>
                        <strong>{r.sourceCategoryId}</strong>
                      </td>
                      <td>
                        <strong>{r.targetCategoryId}</strong>
                      </td>
                      <td>
                        {r.constraints.map((c, i) => (
                          <code key={i} style={{ display: 'block', fontSize: '0.7rem' }}>
                            {c.sourceField} {c.operator} {c.targetField}
                          </code>
                        ))}
                      </td>
                      <td>
                        <span
                          className={styles.statusPill}
                          style={{
                            background: r.severity === 'block' ? '#fee2e2' : '#fef3c7',
                            color: r.severity === 'block' ? '#991b1b' : '#92400e',
                          }}
                        >
                          {r.severity}
                        </span>
                      </td>
                      <td>{r.message}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleDeleteRule(r.id)}
                          className={styles.actionBtn}
                          style={{ color: '#ef4444' }}
                        >
                          <Trash2 size={14} />
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
            totalItems={filteredRules.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[5, 10, 20]}
            itemName="rules"
          />
        </div>
      </div>

      {/* Add Rule Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '580px' }}>
            <h3 style={{ marginBottom: '18px', fontWeight: 'bold', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
              New Compatibility Rule
            </h3>
            <form onSubmit={handleCreateRule}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div className={styles.ruleCategoryGrid}>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Source Category</label>
                    <select
                      value={sourceCat}
                      onChange={(e) => setSourceCat(e.target.value)}
                      className={styles.formInput}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Target Category</label>
                    <select
                      value={targetCat}
                      onChange={(e) => setTargetCat(e.target.value)}
                      className={styles.formInput}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.ruleConditionGrid}>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Source Field</label>
                    <input
                      type="text"
                      required
                      value={sourceField}
                      onChange={(e) => setSourceField(e.target.value)}
                      className={styles.formInput}
                      placeholder="specs.memoryType"
                    />
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Operator</label>
                    <select
                      value={operator}
                      onChange={(e) => setOperator(e.target.value as any)}
                      className={styles.formInput}
                    >
                      <option value="eq">== (Equal)</option>
                      <option value="in">in</option>
                      <option value="intersects">intersects</option>
                      <option value="lte">&lt;=</option>
                      <option value="gte">&gt;=</option>
                    </select>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Target Field</label>
                    <input
                      type="text"
                      required
                      value={targetField}
                      onChange={(e) => setTargetField(e.target.value)}
                      className={styles.formInput}
                      placeholder="specs.memoryType"
                    />
                  </div>
                </div>

                <div className={styles.ruleCategoryGrid}>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Severity</label>
                    <select
                      value={severity}
                      onChange={(e) => setSeverity(e.target.value as any)}
                      className={styles.formInput}
                    >
                      <option value="block">Block (Dim &amp; Incompatible)</option>
                      <option value="warn">Warn (Check flag)</option>
                    </select>
                  </div>
                  <div style={{ minWidth: 0 }}>
                    <label className={styles.formLabel}>Notice Message</label>
                    <input
                      type="text"
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={styles.formInput}
                      placeholder="e.g. Generation mismatch"
                    />
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '24px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.btnCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" style={{ minHeight: '38px', padding: '6px 18px', fontSize: 'var(--text-xs)' }}>
                  Save Rule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

