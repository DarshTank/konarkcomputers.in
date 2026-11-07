"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Quote, QuoteStatus } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import { Download, ExternalLink, MessageSquare, Phone, Calendar, Search } from 'lucide-react';
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

  // Status edit modal
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [newStatus, setNewStatus] = useState<QuoteStatus>('new');
  const [internalNote, setInternalNote] = useState('');

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
      await fetch('/api/admin/quotes', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: selectedQuote.id,
          status: newStatus,
          internalNotes: internalNote,
        }),
      });
      setSelectedQuote(null);
      await loadQuotes();
    } catch {
      alert('Failed to update quote status.');
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedStatus]);

  const filtered = quotes.filter((q) => {
    if (!searchTerm.trim()) return true;
    const s = searchTerm.toLowerCase();
    return (
      q.quoteNumber.toLowerCase().includes(s) ||
      q.customer.name.toLowerCase().includes(s) ||
      q.customer.phone.toLowerCase().includes(s)
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
            Review customer estimates, download official PDFs, update lead status, and log shop notes.
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
                  placeholder="Search by quote # or customer..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
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
                  <th>Customer</th>
                  <th>Contact</th>
                  <th>State</th>
                  <th>Grand Total</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuotes.map((q) => {
                  const dateStr = new Date(q.createdAt.seconds * 1000).toLocaleDateString('en-IN');
                  return (
                    <tr key={q.id}>
                      <td>
                        <strong>{q.quoteNumber}</strong>
                      </td>
                      <td>{dateStr}</td>
                      <td>
                        <strong>{q.customer.name}</strong>
                        {q.customer.company && (
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            {q.customer.company}
                          </div>
                        )}
                      </td>
                      <td>
                        <a href={`tel:${q.customer.phone}`} style={{ color: 'var(--color-teal)' }}>
                          {q.customer.phone}
                        </a>
                      </td>
                      <td>{q.customer.stateName}</td>
                      <td>
                        <strong>{formatPaise(q.totals.grandTotalPaise)}</strong>
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
                                : '#e0f2fe',
                            color:
                              q.status === 'converted'
                                ? '#166534'
                                : q.status === 'cancelled'
                                ? '#991b1b'
                                : '#0369a1',
                            cursor: 'pointer',
                          }}
                          title="Click to change status"
                        >
                          {q.status}
                        </button>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
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
                            download
                            className={styles.actionBtn}
                            title="Download PDF"
                          >
                            <Download size={14} />
                          </a>
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
            totalItems={filtered.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 25, 50]}
            itemName="quotations"
          />
        </div>
      </div>

      {/* Status & Notes Modal */}
      {selectedQuote && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalCard} style={{ maxWidth: '480px' }}>
            <h3 style={{ marginBottom: '18px', fontWeight: 'bold', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)' }}>
              Update Quote {selectedQuote.quoteNumber}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label className={styles.formLabel}>Status</label>
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
                  rows={3}
                  value={internalNote}
                  onChange={(e) => setInternalNote(e.target.value)}
                  className={styles.formInput}
                  placeholder="e.g. Called customer on Friday, visiting shop tomorrow."
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button type="button" onClick={() => setSelectedQuote(null)} className={styles.btnCancel}>
                Cancel
              </button>
              <button type="button" onClick={handleUpdateStatus} className="btn btn--primary" style={{ minHeight: '36px', padding: '6px 14px' }}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
