'use client';

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ClipboardList, Code2, Layers3, LogOut, Menu, Search, Trophy, type LucideIcon } from 'lucide-react';
import { logoutRequest } from '@/features/auth/api';
import { clearSession } from '@/features/auth/session';
import styles from '@/components/admin/AdminShell.module.css';

const MOBILE_QUERY = '(max-width: 1023px)';

interface LearnerNavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  match: string[];
  ready: boolean;
}

const SECTIONS: { title: string; items: LearnerNavItem[] }[] = [
  {
    title: 'Learn',
    items: [
      { label: 'Practice', href: '/dashboard', icon: Code2, match: ['/dashboard', '/practice'], ready: true },
      { label: 'Targeted Stack', href: '/stacks', icon: Layers3, match: ['/stacks'], ready: true },
      { label: 'Assignments', href: '/assignments', icon: ClipboardList, match: ['/assignments'], ready: true },
    ],
  },
  {
    title: 'Compete',
    items: [{ label: 'Real-Time Challenges', href: '/challenges', icon: Trophy, match: [], ready: false }],
  },
];

function cx(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function initialsOf(email: string) {
  const name = email.split('@')[0] ?? '';
  const parts = name.split(/[._-]+/).filter(Boolean);
  return ((parts[0]?.[0] ?? 'L') + (parts[1]?.[0] ?? '')).toUpperCase();
}

export function LearnerShell({ email, children }: { email: string; children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!drawerOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen]);

  const toggleNav = useCallback(() => {
    if (window.matchMedia(MOBILE_QUERY).matches) setDrawerOpen((open) => !open);
    else setCollapsed((value) => !value);
  }, []);

  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const sections = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return SECTIONS;
    return SECTIONS.map((section) => ({ ...section, items: section.items.filter((item) => item.label.toLowerCase().includes(term)) })).filter(
      (section) => section.items.length > 0,
    );
  }, [query]);

  const logout = async () => {
    await logoutRequest().catch(() => undefined);
    clearSession();
    router.replace('/login');
  };

  return (
    <div className={styles.shell} data-collapsed={collapsed} data-drawer={drawerOpen}>
      <aside className={styles.sidebar} aria-label="Learner navigation">
        <Link href="/dashboard" className={styles.brand} onClick={closeDrawer}>
          <span className={styles.brandMark} aria-hidden="true">
            eL
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>eLab</span>
            <span className={styles.brandRole}>Learner</span>
          </span>
        </Link>

        <nav className={styles.nav}>
          {sections.length === 0 && <p className={styles.empty}>No matches for “{query.trim()}”</p>}
          {sections.map((section) => (
            <div key={section.title} className={styles.section}>
              <p className={styles.sectionTitle}>{section.title}</p>
              <ul className={styles.list}>
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = item.match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));
                  const content = (
                    <>
                      <Icon className={styles.itemIcon} aria-hidden="true" />
                      <span className={styles.itemLabel}>{item.label}</span>
                    </>
                  );
                  return (
                    <li key={item.href}>
                      {item.ready ? (
                        <Link
                          href={item.href}
                          className={cx(styles.item, active && styles.itemActive)}
                          aria-current={active ? 'page' : undefined}
                          title={collapsed ? item.label : undefined}
                          onClick={closeDrawer}
                        >
                          {content}
                        </Link>
                      ) : (
                        <span className={cx(styles.item, styles.itemDisabled)} aria-disabled="true" title={`${item.label} — coming soon`}>
                          {content}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      {drawerOpen && <button type="button" className={styles.scrim} aria-label="Close navigation" onClick={closeDrawer} />}

      <div className={styles.main}>
        <header className={styles.topbar}>
          <button
            type="button"
            className={styles.iconButton}
            aria-label={drawerOpen || !collapsed ? 'Collapse navigation' : 'Expand navigation'}
            aria-expanded={drawerOpen || !collapsed}
            onClick={toggleNav}
          >
            <Menu width={20} height={20} aria-hidden="true" />
          </button>

          <div className={styles.search} role="search">
            <Search className={styles.searchIcon} aria-hidden="true" />
            <label htmlFor="learner-nav-search" className={styles.visuallyHidden}>
              Search navigation
            </label>
            <input
              id="learner-nav-search"
              type="search"
              className={styles.searchInput}
              placeholder="Search navigation"
              autoComplete="off"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
          </div>

          <div className={styles.topbarEnd}>
            <span className={styles.roleChip}>Learner</span>
            <span className={styles.avatar} aria-label={email || 'Learner'} title={email || 'Learner'} role="img">
              {initialsOf(email)}
            </span>
            <button type="button" className={styles.iconButton} aria-label="Log out" title="Log out" onClick={logout}>
              <LogOut width={18} height={18} aria-hidden="true" />
            </button>
          </div>
        </header>

        <main id="learner-content" className={styles.content}>
          {children}
        </main>
      </div>
    </div>
  );
}
