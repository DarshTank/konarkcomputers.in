"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Quote, QuoteStatus } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import {
  Download,
  ExternalLink,
  Search,
  Eye,
  User,
  Phone,
  Mail,
  MapPin,
  FileSpreadsheet,
  Package,
  X,
} from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminQuotesPage() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [loading, setLoading] = useState(true);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  // Status edit modal & Details inspector
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [newStatus, setNewStatus] = useState<QuoteStatus>('new');
  const [internalNote, setInternalNote] = useState('');
  const [savingStatus, setSavingStatus] = useState(false);

  const loadQuotes = React.useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/admin/quotes?status=${selectedStatus}`);
      const data = await res.json();
      if (data.quotes) setQuotes(data.quotes);
    } catch {} finally {
      setLoading(false);
    }
  }, [selectedStatus]);

  useEffect(() => {
    loadQuotes();
  }, [loadQuotes]);

  const handleUpdateStatus = async () => {
    if (!selectedQuote) return;
    try {
      setSavingStatus(true);
      const res = await fetch('/api/admin/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedQuote.id,
          status: newStatus,
          internalNotes: internalNote,
        }),
      });
      if (res.ok) {
        setSelectedQuote(null);
        await loadQuotes();
      } else {
        alert('Failed to update quote status.');
      }
    } catch {
      alert('Failed to update quote status.');
    } finally {
      setSavingStatus(false);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  const filtered = quotes.filter((q) => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      q.quoteNumber?.toLowerCase().includes(s) ||
      q.customer?.name?.toLowerCase().includes(s) ||
      q.customer?.phone?.toLowerCase().includes(s) ||
      q.customer?.city?.toLowerCase().includes(s) ||
      q.items?.some((it) => it.name.toLowerCase().includes(s))
    );
  });

  const paginatedQuotes = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Quotation Orders &amp; Leads</h1>
          <p className={styles.pageSubtitle}>
            Structured database records of customer estimates, products requested, contact information, and follow-up status.
          </p>
        </div>
      </div>

      <div className={styles.adminContent}>
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <div className={styles.tableToolbar}>
              <div className={styles.searchInputWrapper}>
                <Search size={14} className={styles.searchInputIcon} />
                <input
                  type="text"
                  placeholder="Search by quote #, customer, phone, or product..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                  style={{ minWidth: '280px' }}
                />
              </div>

              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className={styles.filterSelect}
                style={{ minWidth: '160px' }}
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="converted">Converted (Sold)</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            <span style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              {filtered.length} quotations found
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Quote #</th>
                  <th>Date</th>
                  <th>Customer Details</th>
                  <th>Products / Items</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuotes.length > 0 ? (
                  paginatedQuotes.map((q) => {
                    const dateStr = q.createdAt?.seconds
                      ? new Date(q.createdAt.seconds * 1000).toLocaleDateString('en-IN')
                      : '-';

                    return (
                      <tr key={q.id}>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedQuote(q);
                              setNewStatus(q.status);
                              setInternalNote(q.internalNotes || '');
                            }}
                            style={{
                              background: 'none',
                              border: 'none',
                              padding: 0,
                              cursor: 'pointer',
                              color: '#0055ff',
                              fontWeight: 800,
                              fontSize: '0.82rem',
                              textAlign: 'left',
                            }}
                            title="Click to view full structured details"
                          >
                            {q.quoteNumber}
                          </button>
                        </td>
                        <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                          {dateStr}
                        </td>
                        <td>
                          <div>
                            <strong>{q.customer?.name}</strong>
                            {q.customer?.company && (
                              <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                                {q.customer.company}
                              </div>
                            )}
                            <div style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>
                              <a href={`tel:${q.customer?.phone}`} style={{ color: 'var(--color-teal)' }}>
                                {q.customer?.phone}
                              </a>
                              {q.customer?.city && ` • ${q.customer.city}`}
                            </div>
                          </div>
                        </td>
                        <td>
                          <div style={{ maxWidth: '320px' }}>
                            <div style={{ fontWeight: 700, fontSize: '0.78rem', color: '#0f172a' }}>
                              {q.items?.length || 0} {q.items?.length === 1 ? 'item' : 'items'}
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '3px' }}>
                              {q.items?.slice(0, 3).map((it, idx) => (
                                <div
                                  key={idx}
                                  style={{
                                    fontSize: '0.72rem',
                                    color: '#475569',
                                    lineHeight: 1.3,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                  }}
                                >
                                  • {it.name} {it.qty > 1 && <strong>(x{it.qty})</strong>} —{' '}
                                  {formatPaise(it.lineTotalPaise || it.unitPricePaise * it.qty)}
                                </div>
                              ))}
                              {(q.items?.length || 0) > 3 && (
                                <div style={{ fontSize: '0.7rem', color: '#0055ff', fontWeight: 600 }}>
                                  +{(q.items?.length || 0) - 3} more items...
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td>
                          <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>
                            {formatPaise(q.totals?.grandTotalPaise || 0)}
                          </strong>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedQuote(q);
                              setNewStatus(q.status);
                              setInternalNote(q.internalNotes || '');
                            }}
                            className={`${styles.statusPill} ${styles.statusActive}`}
                            style={{
                              background:
                                q.status === 'converted'
                                  ? '#dcfce7'
                                  : q.status === 'cancelled'
                                  ? '#fee2e2'
                                  : q.status === 'new'
                                  ? '#e0f2fe'
                                  : '#fef3c7',
                              color:
                                q.status === 'converted'
                                  ? '#166534'
                                  : q.status === 'cancelled'
                                  ? '#991b1b'
                                  : q.status === 'new'
                                  ? '#0369a1'
                                  : '#92400e',
                              cursor: 'pointer',
                            }}
                            title="Click to view details or update status"
                          >
                            {q.status}
                          </button>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedQuote(q);
                                setNewStatus(q.status);
                                setInternalNote(q.internalNotes || '');
                              }}
                              className={styles.actionBtn}
                              title="Inspect Full Details"
                            >
                              <Eye size={14} />
                            </button>
                            <Link
                              href={`/quote/${q.publicToken}`}
                              target="_blank"
                              className={styles.actionBtn}
                              title="Open Customer Page"
                            >
                              <ExternalLink size={14} />
                            </Link>
                            <a
                              href={`/api/quotes/${q.publicToken}/pdf`}
                              download={`${q.quoteNumber}.pdf`}
                              className={styles.actionBtn}
                              title="Download PDF"
                            >
                              <Download size={14} />
                            </a>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: '36px', color: '#64748b' }}>
                      {loading ? 'Loading quotations...' : 'No quotations matching criteria found.'}
                    </td>
                  </tr>
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
            itemName="quotations"
          />
        </div>
      </div>

      {/* Structured Quotation Details & Status Inspector Modal */}
      {selectedQuote && (
        <div className={styles.modalOverlay}>
          <div
            className={styles.modalCard}
            style={{ maxWidth: '780px', width: '92%', maxHeight: '90vh', overflowY: 'auto' }}
          >
            {/* Modal Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingBottom: '14px',
                borderBottom: '1px solid #e2e8f0',
                marginBottom: '16px',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <h3
                    style={{
                      margin: 0,
                      fontWeight: 800,
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      color: '#0f172a',
                    }}
                  >
                    Quotation {selectedQuote.quoteNumber}
                  </h3>
                  <span
                    className={styles.statusPill}
                    style={{
                      background:
                        selectedQuote.status === 'converted'
                          ? '#dcfce7'
                          : selectedQuote.status === 'cancelled'
                          ? '#fee2e2'
                          : '#e0f2fe',
                      color:
                        selectedQuote.status === 'converted'
                          ? '#166534'
                          : selectedQuote.status === 'cancelled'
                          ? '#991b1b'
                          : '#0369a1',
                      textTransform: 'uppercase',
                      fontSize: '0.7rem',
                    }}
                  >
                    {selectedQuote.status}
                  </span>
                </div>
                <div style={{ fontSize: '0.78rem', color: '#64748b', marginTop: '3px' }}>
                  Issued on{' '}
                  {selectedQuote.createdAt?.seconds
                    ? new Date(selectedQuote.createdAt.seconds * 1000).toLocaleString('en-IN')
                    : '-'}{' '}
                  • Token: <code style={{ fontSize: '0.75rem' }}>{selectedQuote.publicToken.slice(0, 12)}...</code>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedQuote(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#64748b',
                  padding: '4px',
                }}
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            {/* Customer Details Box */}
            <div
              style={{
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '12px 16px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748b',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <User size={14} /> Customer Profile
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                  gap: '10px',
                  fontSize: '0.82rem',
                }}
              >
                <div>
                  <span style={{ color: '#64748b' }}>Name:</span>{' '}
                  <strong>{selectedQuote.customer?.name}</strong>
                  {selectedQuote.customer?.company && (
                    <div style={{ color: '#0f172a' }}>Co: {selectedQuote.customer.company}</div>
                  )}
                </div>

                <div>
                  <span style={{ color: '#64748b' }}>Phone:</span>{' '}
                  <a
                    href={`tel:${selectedQuote.customer?.phone}`}
                    style={{ color: 'var(--color-teal)', fontWeight: 700 }}
                  >
                    {selectedQuote.customer?.phone}
                  </a>
                </div>

                {selectedQuote.customer?.email && (
                  <div>
                    <span style={{ color: '#64748b' }}>Email:</span>{' '}
                    <a
                      href={`mailto:${selectedQuote.customer.email}`}
                      style={{ color: 'var(--color-teal)' }}
                    >
                      {selectedQuote.customer.email}
                    </a>
                  </div>
                )}

                <div>
                  <span style={{ color: '#64748b' }}>Location:</span>{' '}
                  <span>
                    {selectedQuote.customer?.city ? `${selectedQuote.customer.city}, ` : ''}
                    {selectedQuote.customer?.stateName} (State Code: {selectedQuote.customer?.stateCode})
                  </span>
                </div>

                {selectedQuote.customer?.gstin && (
                  <div>
                    <span style={{ color: '#64748b' }}>Customer GSTIN:</span>{' '}
                    <strong>{selectedQuote.customer.gstin}</strong>
                  </div>
                )}
              </div>
            </div>

            {/* Structured Items Table */}
            <div style={{ marginBottom: '16px' }}>
              <div
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: '#64748b',
                  marginBottom: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Package size={14} /> Requested Products &amp; Pricing Breakdown
              </div>

              <div style={{ border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem' }}>
                  <thead style={{ background: '#f1f5f9' }}>
                    <tr style={{ borderBottom: '1px solid #e2e8f0', textAlign: 'left' }}>
                      <th style={{ padding: '8px 12px' }}>Product</th>
                      <th style={{ padding: '8px 12px', textAlign: 'center' }}>Qty</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right' }}>Unit Rate</th>
                      <th style={{ padding: '8px 12px', textAlign: 'right' }}>Total Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedQuote.items?.map((it, idx) => (
                      <tr
                        key={idx}
                        style={{
                          borderBottom: '1px solid #f1f5f9',
                          background: idx % 2 === 0 ? '#ffffff' : '#fafafa',
                        }}
                      >
                        <td style={{ padding: '10px 12px' }}>
                          <div style={{ fontWeight: 700, color: '#0f172a' }}>{it.name}</div>
                          <div style={{ fontSize: '0.7rem', color: '#64748b', marginTop: '2px' }}>
                            SKU: {it.sku} • {it.categoryName} • Warranty: {it.warrantyMonths}m
                            {it.specsSummary ? ` • ${it.specsSummary}` : ''}
                          </div>
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'center', fontWeight: 700 }}>
                          {it.qty}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', color: '#475569' }}>
                          {formatPaise(it.unitPricePaise)}
                        </td>
                        <td style={{ padding: '10px 12px', textAlign: 'right', fontWeight: 700 }}>
                          {formatPaise(it.lineTotalPaise || it.unitPricePaise * it.qty)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Totals Summary */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  minWidth: '260px',
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  fontSize: '0.8rem',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ color: '#64748b' }}>Taxable Value:</span>
                  <span>{formatPaise(selectedQuote.totals?.taxablePaise || 0)}</span>
                </div>
                {selectedQuote.totals?.cgstPaise > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b' }}>CGST:</span>
                    <span>{formatPaise(selectedQuote.totals.cgstPaise)}</span>
                  </div>
                )}
                {selectedQuote.totals?.sgstPaise > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b' }}>SGST:</span>
                    <span>{formatPaise(selectedQuote.totals.sgstPaise)}</span>
                  </div>
                )}
                {selectedQuote.totals?.igstPaise > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ color: '#64748b' }}>IGST:</span>
                    <span>{formatPaise(selectedQuote.totals.igstPaise)}</span>
                  </div>
                )}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '6px',
                    paddingTop: '6px',
                    borderTop: '1px solid #cbd5e1',
                    fontWeight: 800,
                    fontSize: '0.92rem',
                    color: '#0f172a',
                  }}
                >
                  <span>Grand Total (With GST):</span>
                  <span>{formatPaise(selectedQuote.totals?.grandTotalPaise || 0)}</span>
                </div>
              </div>
            </div>

            {/* Status & Notes Form */}
            <div
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '14px',
                marginBottom: '16px',
              }}
            >
              <h4 style={{ margin: '0 0 10px', fontSize: '0.85rem', fontWeight: 700, color: '#0f172a' }}>
                Update Lead Status &amp; Shop Notes
              </h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '12px' }}>
                <div>
                  <label className={styles.formLabel}>Lead Status</label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as any)}
                    className={styles.formInput}
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="converted">Converted (Invoice Issued / Sold)</option>
                    <option value="expired">Expired</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label className={styles.formLabel}>Internal Notes (Shop Only)</label>
                  <textarea
                    rows={2}
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    className={styles.formInput}
                    placeholder="e.g. Spoke with customer, agreed on pricing. Ready for pickup."
                  />
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '10px',
                paddingTop: '10px',
                borderTop: '1px solid #e2e8f0',
              }}
            >
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/quote/${selectedQuote.publicToken}`}
                  target="_blank"
                  className="btn btn--secondary"
                  style={{ minHeight: '36px', padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}
                >
                  <ExternalLink size={14} /> Open Customer View
                </Link>

                <a
                  href={`/api/quotes/${selectedQuote.publicToken}/pdf`}
                  download={`${selectedQuote.quoteNumber}.pdf`}
                  className="btn btn--secondary"
                  style={{ minHeight: '36px', padding: '6px 14px', fontSize: '0.78rem', gap: '6px' }}
                >
                  <Download size={14} /> Download PDF
                </a>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedQuote(null)}
                  className={styles.btnCancel}
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={handleUpdateStatus}
                  disabled={savingStatus}
                  className="btn btn--primary"
                  style={{ minHeight: '36px', padding: '6px 18px', fontSize: '0.78rem' }}
                >
                  {savingStatus ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
