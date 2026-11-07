"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { ServiceItem } from '@/lib/db/types';
import { formatPaise, rupeesToPaise } from '@/lib/pricing/calculator';
import { Plus, Wrench, Edit2, Search } from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminServicesPage() {
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSrv, setEditingSrv] = useState<Partial<ServiceItem> | null>(null);

  const loadServices = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/services');
      const data = await res.json();
      if (data.services) setServices(data.services);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadServices();
  }, []);

  const filteredServices = useMemo(() => {
    if (!searchTerm.trim()) return services;
    const s = searchTerm.toLowerCase();
    return services.filter(
      (srv) => srv.name.toLowerCase().includes(s) || srv.sacCode.toLowerCase().includes(s)
    );
  }, [services, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedServices = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredServices.slice(start, start + pageSize);
  }, [filteredServices, currentPage, pageSize]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSrv) return;

    const res = await fetch('/api/admin/services', {
      method: editingSrv.id && services.some((s) => s.id === editingSrv.id) ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingSrv),
    });

    if (res.ok) {
      setIsModalOpen(false);
      setEditingSrv(null);
      await loadServices();
    }
  };

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Services &amp; Labour Charges</h1>
          <p className={styles.pageSubtitle}>
            Installation, diagnostic visit, and maintenance services with editable SAC codes and GST rates.
          </p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingSrv({
              name: '',
              sacCode: '998713',
              pricePaise: 50000,
              priceIncludesGst: true,
              gstRateBps: 1800,
              isActive: true,
            });
            setIsModalOpen(true);
          }}
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        >
          <Plus size={14} />
          Add Service
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
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Total: <strong>{filteredServices.length}</strong> services
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Service Name</th>
                  <th>SAC Code</th>
                  <th>Rate (₹)</th>
                  <th>GST Rate</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedServices.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '32px', color: '#94a3b8' }}>
                      {loading ? 'Loading services...' : 'No services found.'}
                    </td>
                  </tr>
                ) : (
                  paginatedServices.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <strong>{s.name}</strong>
                      </td>
                      <td>
                        <code>{s.sacCode}</code>
                      </td>
                      <td>
                        <strong>{formatPaise(s.pricePaise)}</strong>
                        <span style={{ fontSize: '0.65rem', color: '#64748b', display: 'block' }}>
                          {s.priceIncludesGst ? 'incl. GST' : '+GST'}
                        </span>
                      </td>
                      <td>{s.gstRateBps / 100}%</td>
                      <td>
                        <span className={`${styles.statusPill} ${s.isActive ? styles.statusActive : styles.statusInactive}`}>
                          {s.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingSrv(s);
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
            totalItems={filteredServices.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[5, 10, 20]}
            itemName="services"
          />
        </div>
      </div>

      {isModalOpen && editingSrv && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '480px' }}>
            <h3 style={{ marginBottom: '18px', fontWeight: 'bold', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
              {editingSrv.id ? 'Edit Service' : 'Add Labour/Service Charge'}
            </h3>
            <form onSubmit={handleSave}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label className={styles.formLabel}>Service Name</label>
                  <input
                    type="text"
                    required
                    value={editingSrv.name || ''}
                    onChange={(e) => setEditingSrv({ ...editingSrv, name: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>SAC Code (e.g. 998713 for Maintenance)</label>
                  <input
                    type="text"
                    required
                    value={editingSrv.sacCode || '998713'}
                    onChange={(e) => setEditingSrv({ ...editingSrv, sacCode: e.target.value })}
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>Price (Rupees)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={
                      editingSrv.pricePaise !== undefined
                        ? (editingSrv.pricePaise / 100).toFixed(2)
                        : ''
                    }
                    onChange={(e) =>
                      setEditingSrv({
                        ...editingSrv,
                        pricePaise: rupeesToPaise(e.target.value || 0),
                      })
                    }
                    className={styles.formInput}
                  />
                </div>
                <div>
                  <label className={styles.formLabel}>GST Rate (BPS)</label>
                  <select
                    value={editingSrv.gstRateBps || 1800}
                    onChange={(e) =>
                      setEditingSrv({ ...editingSrv, gstRateBps: Number(e.target.value) })
                    }
                    className={styles.formInput}
                  >
                    <option value={1800}>18% (Standard Service GST)</option>
                    <option value={1200}>12%</option>
                    <option value={500}>5%</option>
                    <option value={0}>0%</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
                <button type="button" onClick={() => setIsModalOpen(false)} className={styles.btnCancel}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary" style={{ minHeight: '36px', padding: '6px 14px' }}>
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

