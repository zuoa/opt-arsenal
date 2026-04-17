import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Layout({ children }: { children: ReactNode }) {
  const { pathname } = useLocation()
  const isHome = pathname === '/'

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <header
        style={{
          height: 56,
          borderBottom: '1px solid var(--border-primary)',
          display: 'flex',
          alignItems: 'center',
          padding: '0 24px',
          gap: 16,
          background: 'var(--bg-primary)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <Link
          to="/"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: '-0.01em',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
          Arsenal
        </Link>
        {!isHome && (
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              color: 'var(--text-secondary)',
              fontSize: 13,
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
            返回
          </Link>
        )}
      </header>
      <main style={{ flex: 1 }}>{children}</main>
    </div>
  )
}
