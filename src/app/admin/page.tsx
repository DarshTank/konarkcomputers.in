import React from 'react';
import Link from 'next/link';
import { getActiveCatalog } from '@/lib/db/catalog';
import { getAdminDb } from '@/lib/firebase/admin';
import type { Quote } from '@/lib/db/types';
import { formatPaise } from '@/lib/pricing/calculator';
import {
  FileSpreadsheet,
  AlertTriangle,
  Package,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import styles from './admin.module.css';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
  const catalog = await getActiveCatalog();

  let quotes: Quote[] = [];
  try {
    const db = getAdminDb();
    if (db) {
      const snap = await db.collection('quotes').orderBy('createdAt.seconds', 'desc').limit(10).get();
      quotes = snap.docs.map((d) => d.data() as Quote);
    }
  } catch (e) {
    console.warn('Could not read quotes for dashboard:', e);
  }

  const lowStockProducts = catalog.products.filter(
    (p) => p.stock.status === 'low' || p.stock.status === 'out_of_stock'
  );

  const newQuotesCount = quotes.filter((q) => q.status === 'new').length;

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
          {quotes.length > 0 ? (
            <div style={{ overflowX: 'auto' }}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th>Quote #</th>
                    <th>Customer</th>
                    <th>Phone</th>
                    <th>State</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {quotes.map((q) => (
                    <tr key={q.id}>
                      <td>
                        <strong>{q.quoteNumber}</strong>
                      </td>
                      <td>{q.customer.name}</td>
                      <td>{q.customer.phone}</td>
                      <td>{q.customer.stateName}</td>
                      <td>{q.items.length} items</td>
                      <td>
                        <strong>{formatPaise(q.totals.grandTotalPaise)}</strong>
                      </td>
                      <td>
                        <span className={`${styles.statusPill} ${styles.statusActive}`}>
                          {q.status}
                        </span>
                      </td>
                      <td>
                        <Link
                          href={`/quote/${q.publicToken}`}
                          target="_blank"
                          className={styles.actionBtn}
                        >
                          View
                        </Link>
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
