import { useEffect, useMemo, useState } from 'react'

const USERS_API = 'https://jsonplaceholder.typicode.com/users'

function UsersTable() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [city, setCity] = useState('')
  const [nameSort, setNameSort] = useState('asc')

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(USERS_API)
        if (!res.ok) {
          throw new Error(`Could not load users (${res.status})`)
        }
        const data = await res.json()
        if (!cancelled) {
          setUsers(Array.isArray(data) ? data : [])
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Something went wrong while loading users.')
          setUsers([])
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()
    return () => {
      cancelled = true
    }
  }, [])

  const cityOptions = useMemo(() => {
    const set = new Set()
    for (const u of users) {
      const c = u.address?.city?.trim()
      if (c) set.add(c)
    }
    return [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
  }, [users])

  const filteredRows = useMemo(() => {
    const q = search.trim().toLowerCase()
    let list = users

    if (q) {
      list = list.filter((u) => {
        const name = (u.name ?? '').toLowerCase()
        const email = (u.email ?? '').toLowerCase()
        return name.includes(q) || email.includes(q)
      })
    }

    if (city) {
      list = list.filter((u) => (u.address?.city ?? '') === city)
    }

    const sorted = [...list].sort((a, b) => {
      const an = (a.name ?? '').toLowerCase()
      const bn = (b.name ?? '').toLowerCase()
      const cmp = an.localeCompare(bn, undefined, { sensitivity: 'base' })
      return nameSort === 'asc' ? cmp : -cmp
    })

    return sorted
  }, [users, search, city, nameSort])

  function handleReset() {
    setSearch('')
    setCity('')
    setNameSort('asc')
  }

  return (
    <section className="users-section widget-users" aria-labelledby="users-table-heading">
      <div className="users-section__head">
        <div>
          <h2 id="users-table-heading" className="users-section__title">
            Users
          </h2>
        </div>
        <div className="users-section__toolbar">
          <label htmlFor="users-search" className="visually-hidden">
            Search by name or email
          </label>
          <input
            id="users-search"
            type="search"
            className="users-section__input"
            placeholder="Search name or email…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoComplete="off"
          />
          <label htmlFor="users-city" className="visually-hidden">
            Filter by city
          </label>
          <select
            id="users-city"
            className="users-section__select"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          >
            <option value="">All cities</option>
            {cityOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <label htmlFor="users-sort" className="visually-hidden">
            Sort by name
          </label>
          <select
            id="users-sort"
            className="users-section__select"
            value={nameSort}
            onChange={(e) => setNameSort(e.target.value)}
          >
            <option value="asc">Name A–Z</option>
            <option value="desc">Name Z–A</option>
          </select>
          <button type="button" className="users-section__reset" onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>

      <div className="users-section__table-wrap">
        {loading ? (
          <p className="users-section__state users-section__state--loading" role="status">
            Loading users…
          </p>
        ) : null}

        {!loading && error ? (
          <p className="users-section__state users-section__state--error" role="alert">
            {error}
          </p>
        ) : null}

        {!loading && !error ? (
          <table className="users-table users-table--data">
            <thead>
              <tr>
                <th scope="col" className="users-table__col-name">
                  Name
                </th>
                <th scope="col" className="users-table__col-email">
                  Email
                </th>
                <th scope="col" className="users-table__col-company">
                  Company name
                </th>
                <th scope="col" className="users-table__col-city">
                  City
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.length === 0 ? (
                <tr>
                  <td colSpan={4} className="users-table__empty">
                    No users match your filters.
                  </td>
                </tr>
              ) : (
                filteredRows.map((u) => (
                  <tr key={u.id}>
                    <td className="users-table__col-name users-table__cell-text">
                      <span className="users-table__strong">{u.name}</span>
                    </td>
                    <td className="users-table__col-email users-table__cell-text">{u.email}</td>
                    <td className="users-table__col-company users-table__cell-text">
                      {u.company?.name ?? '—'}
                    </td>
                    <td className="users-table__col-city users-table__cell-text">
                      {u.address?.city ?? '—'}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        ) : null}
      </div>
    </section>
  )
}

export default UsersTable
