const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
  { id: 'leaderboard', label: 'Leaderboard', icon: 'leaderboard' },
  { id: 'order', label: 'order', icon: 'order' },
  { id: 'top-products', label: 'Top Products', icon: 'products' },
  { id: 'sales-report', label: 'Sales Report', icon: 'sales-report' },
  { id: 'messages', label: 'Messages', icon: 'messages' },
  { id: 'settings', label: 'Settings', icon: 'settings' },
  { id: 'sign-out', label: 'Sign Out', icon: 'sign-out' },
]

function NavIcon({ name }) {
  const s = {
    stroke: 'currentColor',
    strokeWidth: 1.75,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    fill: 'none',
  }

  switch (name) {
    case 'dashboard':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7" {...s} />
          <path d="M12 12V5" {...s} />
          <path d="M12 12L18.2 9.2" {...s} />
          <path d="M12 12L16.4 17.8" {...s} />
        </svg>
      )
    case 'leaderboard':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 20V12M9 20V7M13 20V14M17 20V4" {...s} />
        </svg>
      )
    case 'order':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M6 6h15l-1.2 8.4a1.5 1.5 0 0 1-1.48 1.29H8.68a1.5 1.5 0 0 1-1.48-1.29L6 6z" {...s} />
          <path d="M6 6L5 3H3" {...s} />
          <circle cx="9.5" cy="19.5" r="1.25" stroke="currentColor" strokeWidth="1.75" fill="none" />
          <circle cx="17.5" cy="19.5" r="1.25" stroke="currentColor" strokeWidth="1.75" fill="none" />
        </svg>
      )
    case 'products':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 7V5a4 4 0 0 1 8 0v2" {...s} />
          <path d="M6 7h12v11a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7z" {...s} />
          <path d="M9 11h6" {...s} />
        </svg>
      )
    case 'sales-report':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M3 19h18" {...s} />
          <path d="M4 16l4-5 4 4 4-7 5 6" {...s} />
        </svg>
      )
    case 'messages':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M5 6.5h14a2 2 0 0 1 2 2v5.5a2 2 0 0 1-2 2h-3.5l-4.2 3.2a.6.6 0 0 1-.98-.47V15.5H5a2 2 0 0 1-2-2V8.5a2 2 0 0 1 2-2z"
            {...s}
          />
          <circle cx="9" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="12" cy="11" r="1" fill="currentColor" stroke="none" />
          <circle cx="15" cy="11" r="1" fill="currentColor" stroke="none" />
        </svg>
      )
    case 'settings':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"
            stroke="currentColor"
            strokeWidth="1.65"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.65" fill="none" />
        </svg>
      )
    case 'sign-out':
      return (
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M10 5H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h4" {...s} />
          <path d="M14 17l5-5-5-5" {...s} />
          <path d="M19 12H9" {...s} />
        </svg>
      )
    default:
      return null
  }
}

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <div className="sidebar__top">
        <div className="sidebar__brand">
          <span className="sidebar__logo" aria-hidden="true">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9.2 7.2 5.9 10.5a2 2 0 0 0 0 2.83l3.3 3.3"
                stroke="white"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M14.8 7.2 18.1 10.5a2 2 0 0 1 0 2.83l-3.3 3.3"
                stroke="white"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
          <span className="sidebar__name">Dabang</span>
        </div>
        <nav className="sidebar__nav">
          <ul className="sidebar__list">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`sidebar__link${item.id === 'dashboard' ? ' sidebar__link--active' : ''}`}
                  aria-current={item.id === 'dashboard' ? 'page' : undefined}
                >
                  <span className="sidebar__icon" aria-hidden="true">
                    <NavIcon name={item.icon} />
                  </span>
                  <span className="sidebar__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sidebar__pro">
        <span className="sidebar__pro-icon" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.3 8.7 7 11l2.3 2.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M14.7 8.7 17 11l-2.3 2.3" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <p className="sidebar__pro-title">Dabang Pro</p>
        <p className="sidebar__pro-text">Get access to all features on tetumbas</p>
        <button type="button" className="sidebar__pro-btn">
          Get Pro
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
