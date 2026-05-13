function Header() {
  return (
    <header className="header">
      <h1 className="header__title">Dashboard</h1>
      <div className="header__search-wrap">
        <label htmlFor="header-search" className="visually-hidden">
          Search
        </label>
        <span className="header__search-icon" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path d="M21 21L16.65 16.65" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </span>
        <input
          id="header-search"
          type="search"
          className="header__search"
          placeholder="Search here..."
          autoComplete="off"
        />
      </div>
      <div className="header__actions">
        <button type="button" className="header__lang" aria-label="Language English US">
          <span className="header__flag" aria-hidden="true">
            🇺🇸
          </span>
          <span>Eng (US)</span>
          <span className="header__chevron" aria-hidden="true">
            ▾
          </span>
        </button>
        <button type="button" className="header__icon-btn" aria-label="Notifications">
          <span className="header__bell-wrap" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M18 8C18 6.4087 17.3679 4.88258 16.2426 3.75736C15.1174 2.63214 13.5913 2 12 2C10.4087 2 8.88258 2.63214 7.75736 3.75736C6.63214 4.88258 6 6.4087 6 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path d="M13.73 21C13.5542 21.3031 13.3019 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="header__notif-dot" />
          </span>
        </button>
        <button type="button" className="header__user" aria-label="Account menu">
          <span className="header__avatar" aria-hidden="true">
            AG
          </span>
          <span className="header__user-text">
            <span className="header__user-name">Musfiq</span>
            <span className="header__user-role">Admin</span>
          </span>
          <span className="header__chevron" aria-hidden="true">
            ▾
          </span>
        </button>
      </div>
    </header>
  )
}

export default Header
