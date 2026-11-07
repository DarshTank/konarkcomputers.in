"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Layers,
  Tag,
  Sliders,
  Cpu,
  Wrench,
  Settings,
  FileSpreadsheet,
  History,
  LogOut,
  ExternalLink,
  Menu,
  X,
} from 'lucide-react';
import styles from './admin.module.css';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/products', label: 'Products', icon: Package },
  { href: '/admin/categories', label: 'Categories', icon: Layers },
  { href: '/admin/brands', label: 'Brands', icon: Tag },
  { href: '/admin/attributes', label: 'Attributes', icon: Sliders },
  { href: '/admin/compatibility', label: 'Compatibility Rules', icon: Cpu },
  { href: '/admin/services', label: 'Services', icon: Wrench },
  { href: '/admin/quotes', label: 'Quotes', icon: FileSpreadsheet },
  { href: '/admin/settings', label: 'Tax & Company', icon: Settings },
  { href: '/admin/audit', label: 'Audit Log', icon: History },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  // Close mobile drawer on route transition
  useEffect(() => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  // Don't show sidebar on login page
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/session', { method: 'DELETE' });
    } catch {}
    router.push('/admin/login');
  };

  return (
    <div className={styles.adminLayout}>
      {/* Mobile Top Header (Phones & Tablets < 992px) */}
      <header className={styles.mobileAdminHeader}>
        <button
          type="button"
          onClick={() => setIsMobileNavOpen((prev) => !prev)}
          className={styles.hamburgerBtn}
          aria-label="Toggle navigation menu"
        >
          {isMobileNavOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <span className={styles.mobileBrandTitle}>Konark Admin</span>
        <Link href="/quote" target="_blank" className={styles.mobileQuotePill} title="Open Live Quote">
          /quote
        </Link>
      </header>

      {/* Mobile Backdrop */}
      {isMobileNavOpen && (
        <div
          className={styles.mobileBackdrop}
          onClick={() => setIsMobileNavOpen(false)}
        />
      )}

      {/* Sidebar (Desktop sticky + Mobile slide-out drawer) */}
      <aside className={`${styles.sidebar} ${isMobileNavOpen ? styles.sidebarOpen : ''}`}>
        <div className={styles.mobileDrawerHeader}>
          <span style={{ fontWeight: 700, fontSize: 'var(--text-sm)', color: '#ffffff' }}>
            Store Navigation
          </span>
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(false)}
            className={styles.hamburgerBtn}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className={styles.navSection}>
          <span className={styles.navLabel}>Store Operations</span>
          {navItems.slice(0, 8).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <span className={styles.navLabel} style={{ marginTop: '16px' }}>
            System &amp; Audit
          </span>
          {navItems.slice(8).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navItem} ${isActive ? styles.navItemActive : ''}`}
                onClick={() => setIsMobileNavOpen(false)}
              >
                <Icon size={16} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <Link
            href="/quote"
            target="_blank"
            className={styles.navItem}
            style={{ marginBottom: '8px' }}
          >
            <ExternalLink size={14} />
            <span>View Live /quote</span>
          </Link>
          <button type="button" onClick={handleLogout} className={styles.logoutBtn}>
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Wrapper */}
      <div className={styles.mainWrapper}>{children}</div>
    </div>
  );
}

