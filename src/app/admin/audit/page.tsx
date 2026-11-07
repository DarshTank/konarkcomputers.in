"use client";

import React, { useState, useEffect, useMemo } from 'react';
import type { AdminAuditEntry } from '@/lib/db/types';
import { History, RefreshCw, Search } from 'lucide-react';
import styles from '../admin.module.css';
import Pagination from '../components/Pagination';

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AdminAuditEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(25);

  const loadAuditLogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/audit');
      const data = await res.json();
      if (data.auditLogs) setLogs(data.auditLogs);
    } catch {} finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAuditLogs();
  }, []);

  const filteredLogs = useMemo(() => {
    if (!searchTerm.trim()) return logs;
    const s = searchTerm.toLowerCase();
    return logs.filter(
      (l) =>
        l.who?.toLowerCase().includes(s) ||
        l.action?.toLowerCase().includes(s) ||
        l.collection?.toLowerCase().includes(s) ||
        l.docId?.toLowerCase().includes(s)
    );
  }, [logs, searchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const paginatedLogs = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredLogs.slice(start, start + pageSize);
  }, [filteredLogs, currentPage, pageSize]);

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>System Audit Trail</h1>
          <p className={styles.pageSubtitle}>
            Immutable change log tracking price edits, stock updates, tax adjustments, and quote status modifications.
          </p>
        </div>
        <button
          type="button"
          onClick={loadAuditLogs}
          className={styles.btnSecondary}
        >
          <RefreshCw size={14} />
          Refresh Log
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
                  placeholder="Search audit trail..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={styles.searchInput}
                />
              </div>
            </div>
            <div style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
              Total: <strong>{filteredLogs.length}</strong> events logged
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table className={styles.dataTable}>
              <thead>
                <tr>
                  <th>Timestamp</th>
                  <th>Author</th>
                  <th>Action</th>
                  <th>Collection</th>
                  <th>Doc ID</th>
                  <th>Diff Summary</th>
                </tr>
              </thead>
              <tbody>
                {paginatedLogs.length > 0 ? (
                  paginatedLogs.map((l, i) => {
                    const dateStr = l.timestamp?.seconds
                      ? new Date(l.timestamp.seconds * 1000).toLocaleString('en-IN')
                      : '-';
                    return (
                      <tr key={l.id || i}>
                        <td>
                          <code>{dateStr}</code>
                        </td>
                        <td>
                          <strong>{l.who}</strong>
                        </td>
                        <td>
                          <span
                            className={styles.statusPill}
                            style={{
                              background:
                                l.action === 'create'
                                  ? '#dcfce7'
                                  : l.action === 'delete'
                                  ? '#fee2e2'
                                  : '#e0f2fe',
                              color:
                                l.action === 'create'
                                  ? '#166534'
                                  : l.action === 'delete'
                                  ? '#991b1b'
                                  : '#0369a1',
                            }}
                          >
                            {l.action}
                          </span>
                        </td>
                        <td>{l.collection}</td>
                        <td>
                          <code>{l.docId}</code>
                        </td>
                        <td>
                          {l.after ? (
                            <pre
                              style={{
                                fontSize: '0.65rem',
                                background: '#f8fafc',
                                padding: '4px 6px',
                                borderRadius: '4px',
                                maxHeight: '60px',
                                overflowY: 'auto',
                              }}
                            >
                              {JSON.stringify(l.after, null, 1)}
                            </pre>
                          ) : (
                            <span style={{ color: '#94a3b8' }}>-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: '30px', color: '#64748b' }}>
                      {loading
                        ? 'Loading audit trail...'
                        : 'No audit records logged yet. Modifications to products, prices, and tax will appear here automatically.'}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalItems={filteredLogs.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
            onPageSizeChange={setPageSize}
            pageSizeOptions={[10, 25, 50, 100]}
            itemName="events"
          />
        </div>
      </div>
    </div>
  );
}

