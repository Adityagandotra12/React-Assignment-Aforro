const todayStats = [
  {
    id: 'sales',
    tone: 'pink',
    label: 'Total Sales',
    value: '$1k',
    hint: '+8%',
    hintLabel: 'from yesterday',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="4.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 15v-4M12 15V8M16 15v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'orders',
    tone: 'yellow',
    label: 'Total Order',
    value: '300',
    hint: '+5%',
    hintLabel: 'from yesterday',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="6" y="4" width="12" height="16" rx="2.5" stroke="currentColor" strokeWidth="1.8" />
        <path d="M9 9h6M9 12h6M9 15h3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="15.5" cy="6.5" r="1.3" fill="currentColor" />
      </svg>
    ),
  },
  {
    id: 'products',
    tone: 'green',
    label: 'Product Sold',
    value: '5',
    hint: '+1.2%',
    hintLabel: 'from yesterday',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <g transform="rotate(-42 12 12)">
          <path
            fill="currentColor"
            d="M12 2H2v10l9.29 9.29c.39.39 1.02.39 1.41 0l6.58-6.58c.39-.39.39-1.02 0-1.41L12 2z"
          />
          <circle cx="7" cy="7" r="1.65" fill="#22c55e" />
        </g>
      </svg>
    ),
  },
  {
    id: 'customers',
    tone: 'purple',
    label: 'New Customers',
    value: '8',
    hint: '+0.5%',
    hintLabel: 'from yesterday',
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="9" cy="9" r="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M4.5 17.5c.9-2 2.7-3 4.5-3s3.6 1 4.5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="16.8" cy="8.4" r="1.8" fill="currentColor" />
      </svg>
    ),
  },
]

function StatsCards() {
  return (
    <section className="today-sales widget-today" aria-labelledby="today-sales-heading">
      <div className="today-sales__head">
        <div>
          <h2 id="today-sales-heading" className="today-sales__title">
            Today&apos;s Sales
          </h2>
          <p className="today-sales__subtitle">Sales Summary</p>
        </div>
        <button type="button" className="today-sales__export">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 16V7" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
            <path d="M8.5 10.5 12 7l3.5 3.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="4" y="14.5" width="16" height="5.5" rx="2" stroke="currentColor" strokeWidth="1.7" />
          </svg>
          <span>Export</span>
        </button>
      </div>
      <ul className="today-sales__grid">
        {todayStats.map((card) => (
          <li
            key={card.id}
            className={`today-sales__mini today-sales__mini--${card.tone}`}
          >
            <span className="today-sales__mini-icon" aria-hidden="true">
              {card.icon}
            </span>
            <p className="today-sales__mini-value">{card.value}</p>
            <p className="today-sales__mini-label">{card.label}</p>
            <p className="today-sales__mini-hint">
              <span className="today-sales__mini-change">{card.hint}</span>{' '}
              {card.hintLabel}
            </p>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default StatsCards
