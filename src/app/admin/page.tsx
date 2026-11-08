import React from 'react';
import Link from 'next/link';
import { getActiveCatalog } from '@/lib/db/catalog';
import { listQuotes } from '@/lib/db/quotes';
import type { Quote } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import {
  FileSpreadsheet,
  AlertTriangle,
  Package,
  Clock,
} from 'lucide-react';
import styles from './admin.module.css';
import { QuoteVisibilityToggle } from './components/QuoteVisibilityToggle';

export const dynamic = 'force-dynamic';

function formatDateShort(seconds?: number): string {
  if (!seconds) return '-';
  const d = new Date(seconds * 1000);
  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

export default async function AdminDashboardPage() {
  const catalog = await getActiveCatalog();

  // Fetch quotes from all storage layers (Firestore + disk + memory)
  let quotes: Quote[] = [];
  try {
    quotes = await listQuotes(50);
  } catch (e) {
    console.warn('Could not read quotes for dashboard:', e);
  }

  const lowStockProducts = catalog.products.filter(
    (p) => p.stock.status === 'low' || p.stock.status === 'out_of_stock'
  );

  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;
  const recentQuotes = quotes.slice(0, 10);

  return (
    <div>
      <div className={styles.topBar}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>
            Live summary of quotations, stock alerts, and catalog status.
          </p>
        </div>
        <Link
          href="/admin/products"
          className="btn btn--primary"
          style={{ minHeight: '38px', padding: '6px 14px', fontSize: 'var(--text-xs)' }}
        >
          Add New Product
        </Link>
      </div>

      <div className={styles.adminContent}>
        {/* Public Quotation System Visibility Controller */}
        <QuoteVisibilityToggle initialEnabled={catalog.quoteSettings?.enabled !== false} />

        {/* KPI Stats Grid */}
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#e0f2fe', color: '#0284c7' }}>
              <FileSpreadsheet size={24} />
            </div>
            <div>
              <div className={styles.statValue}>{quotes.length}</div>
              <div className={styles.statLabel}>Total Quotations</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fef3c7', color: '#d97706' }}>
              <Clock size={24} />
            </div>
            <div>
              <div className={styles.statValue}>{newQuotesCount}</div>
              <div className={styles.statLabel}>New / Pending Follow-up</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#fee2e2', color: '#dc2626' }}>
              <AlertTriangle size={24} />
            </div>
            <div>
              <div className={styles.statValue}>{lowStockProducts.length}</div>
              <div className={styles.statLabel}>Low Stock Alerts</div>
            </div>
          </div>

          <div className={styles.statCard}>
            <div className={styles.statIcon} style={{ background: '#dcfce7', color: '#16a34a' }}>
              <Package size={24} />
            </div>
            <div>
              <div className={styles.statValue}>{catalog.products.length}</div>
              <div className={styles.statLabel}>Active Hardware Products</div>
            </div>
          </div>
        </div>

        {/* Low Stock Alerts */}
        {lowStockProducts.length > 0 && (
          <div className={styles.tableCard}>
            <div className={styles.cardHeader}>
              <span className={styles.cardHeaderTitle}>Low / Out of Stock Warnings</span>
              <Link href="/admin/products" className={styles.actionBtn}>
                Manage Stock
              </Link>
            </div>
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Product Name</th>
                    <th>SKU</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {lowStockProducts.map((p) => (
                    <tr key={p.id}>
                      <td>
                        <strong>{p.name}</strong>
                      </td>
                      <td>{p.sku}</td>
                      <td>{p.categoryId}</td>
                      <td>
                        <span
                          className={styles.statusPill}
                          style={{
                            background: p.stock.status === 'out_of_stock' ? '#fee2e2' : '#fef3c7',
                            color: p.stock.status === 'out_of_stock' ? '#991b1b' : '#92400e',
                          }}
                        >
                          {p.stock.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td>
                        <Link href={`/admin/products`} className={styles.actionBtn}>
                          Edit Stock
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Recent Quotes */}
        <div className={styles.tableCard}>
          <div className={styles.cardHeader}>
            <span className={styles.cardHeaderTitle}>Recent Quotations</span>
            <Link href="/admin/quotes" className={styles.actionBtn}>
              View All Quotes
            </Link>
          </div>
          {recentQuotes.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Quote #</th>
                    <th>Date</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>Items</th>
                    <th>Grand Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentQuotes.map((q) => (
                    <tr key={q.id}>
                      <td>
                        <strong style={{ color: '#0055ff', fontSize: '0.82rem' }}>
                          {q.quoteNumber}
                        </strong>
                      </td>
                      <td style={{ fontSize: '0.8rem', whiteSpace: 'nowrap' }}>
                        {formatDateShort(q.createdAt?.seconds)}
                      </td>
                      <td>
                        <strong>{q.customer?.name}</strong>
                        {q.customer?.company && (
                          <div style={{ fontSize: '0.7rem', color: '#64748b' }}>
                            {q.customer.company}
                          </div>
                        )}
                      </td>
                      <td>
                        <a
                          href={`tel:${q.customer?.phone}`}
                          style={{ color: 'var(--color-teal)', fontSize: '0.82rem' }}
                        >
                          {q.customer?.phone}
                        </a>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.78rem' }}>
                          {q.items?.length || 0} items
                          <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '2px' }}>
                            {q.items
                              ?.slice(0, 2)
                              .map((it) => it.name)
                              .join(', ')}
                            {(q.items?.length || 0) > 2 && '...'}
                          </div>
                        </div>
                      </td>
                      <td>
                        <strong>{formatPaise(q.totals?.grandTotalPaise || 0)}</strong>
                      </td>
                      <td>
                        <span
                          className={styles.statusPill}
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
                          }}
                        >
                          {q.status}
                        </span>
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '6px' }}>
                          <Link
                            href={`/quote/${q.publicToken}`}
                            target="_blank"
                            className={styles.actionBtn}
                            title="View Quotation"
                          >
                            View
                          </Link>
                          <a
                            href={`/api/quotes/${q.publicToken}/pdf`}
                            download
                            className={styles.actionBtn}
                            title="Download PDF"
                          >
                            PDF
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div style={{ padding: '30px', textAlign: 'center', color: '#64748b' }}>
              No quotes submitted yet. Use the public{' '}
              <Link href="/quote" target="_blank" style={{ color: 'var(--color-teal)', textDecoration: 'underline' }}>
                /quote builder
              </Link>{' '}
              to generate your first quotation estimate!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
