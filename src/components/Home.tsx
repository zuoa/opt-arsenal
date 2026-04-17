import { Link } from 'react-router-dom'
import { getToolsByCategory } from '../lib/tool-registry'
import { getIcon } from '../lib/icons'

const categoryOrder = ['商业计算']

export default function Home() {
  const grouped = getToolsByCategory()

  const categories = [
    ...categoryOrder.filter((c) => grouped[c]),
    ...Object.keys(grouped).filter((c) => !categoryOrder.includes(c)),
  ]

  return (
    <div
      style={{
        maxWidth: 960,
        margin: '0 auto',
        padding: '48px 24px 80px',
      }}
    >
      <div style={{ marginBottom: 48 }}>
        <h1
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: '-0.02em',
            color: 'var(--text-primary)',
            marginBottom: 8,
          }}
        >
          Arsenal
        </h1>
        <p
          style={{
            fontSize: 15,
            color: 'var(--text-secondary)',
          }}
        >
          一人公司工具箱
        </p>
      </div>

      {categories.map((category) => (
        <section key={category} style={{ marginBottom: 40 }}>
          <h2
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--text-tertiary)',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              marginBottom: 16,
            }}
          >
            {category}
          </h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: 12,
            }}
          >
            {grouped[category].map((tool) => {
              const Icon = getIcon(tool.icon)
              return (
                <Link
                  key={tool.id}
                  to={tool.path}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 14,
                    padding: '16px 18px',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--border-primary)',
                    background: 'var(--bg-card)',
                    textDecoration: 'none',
                    color: 'inherit',
                    transition: 'border-color 0.15s, box-shadow 0.15s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-secondary)'
                    e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-primary)'
                    e.currentTarget.style.boxShadow = 'none'
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <div>
                    <div
                      style={{
                        fontSize: 14,
                        fontWeight: 500,
                        color: 'var(--text-primary)',
                        marginBottom: 2,
                      }}
                    >
                      {tool.name}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: 'var(--text-secondary)',
                        lineHeight: 1.4,
                      }}
                    >
                      {tool.description}
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}
