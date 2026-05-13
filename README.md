# Aforro Dashboard

Sales-style dashboard built with **React** and **Vite** for the Aforro React assignment. It implements a multi-section layout (sidebar, header, stats, charts) and a **Users** table backed by the public **JSONPlaceholder** users API with search, sort, filter, and loading/error handling.

**Repository:** [github.com/Adityagandotra12/React-Assignment-Aforro](https://github.com/Adityagandotra12/React-Assignment-Aforro)

---

## Prerequisites

- **Node.js** 20+ (LTS recommended)
- **npm** 10+ (comes with Node)

---

## Project setup

Follow these steps to run the app locally.

1. **Clone the repository**

   ```bash
   git clone https://github.com/Adityagandotra12/React-Assignment-Aforro.git
   cd React-Assignment-Aforro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Open the app** in your browser using the URL Vite prints (usually **http://localhost:5173**).

5. **(Optional) Production build** — compile and preview the production bundle:

   ```bash
   npm run build
   npm run preview
   ```

### Features implemented

**Part 1 — Dashboard UI (Figma-aligned layout)**

- Sidebar with brand, navigation links, and “Dabang Pro” promo card.
- Header with dashboard title, search field, language selector, notifications, and user menu (presentational).
- **Today’s Sales** summary cards with export control (visual).
- **Visitor Insights** line chart (SVG), month axis, and legend.
- **Total Revenue** dual bar chart by weekday; **Customer Satisfaction** area chart; **Target vs Reality** bars and summary cards.
- **Sales Mapping by Country** map image; **Volume vs Service Level** stacked bars with legend and values.
- **Responsive layout:** sidebar collapses to a horizontal strip on smaller widths; wide tables scroll horizontally where needed.
- **Styling:** plain CSS only (`index.css`, `App.css`) — no Tailwind, Bootstrap, or chart libraries.

**Part 2 — Users table ([JSONPlaceholder users](https://jsonplaceholder.typicode.com/users))**

- Loads users with the **Fetch API** (`useEffect`, abort-safe cleanup on unmount).
- Table columns: **Name**, **Email**, **Company name**, **City** (from `company.name` and `address.city`).
- **Search:** filter by name or email (case-insensitive).
- **Sort:** name **A–Z** or **Z–A** via dropdown.
- **Filter by city:** dropdown populated from distinct cities in the dataset; **All cities** shows everyone.
- **Reset** clears search, city filter, and restores default sort (A–Z).
- **Loading** and **error** states with clear messaging in the users card.

---

## Scripts

| Command           | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start Vite dev server with hot reload            |
| `npm run build`   | Production build to `dist/`                      |
| `npm run preview` | Serve the production build locally               |
| `npm run lint`    | Run ESLint on the project                        |

---

## Tech stack

| Area        | Choice                                                                 |
| ----------- | ---------------------------------------------------------------------- |
| UI          | [React 19](https://react.dev/) — functional components and hooks only  |
| Bundler     | [Vite 8](https://vite.dev/) with [`@vitejs/plugin-react`](https://github.com/vitejs/vite-plugin-react) |
| Language    | JavaScript (ES modules, `.jsx`)                                        |
| Styling     | Global CSS — `src/index.css` (tokens, base), `src/App.css` (layout/UI) |
| Data        | Native [`fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) (no Axios) |
| Linting     | ESLint 9 + `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` |

No Tailwind, Bootstrap, Redux, or charting libraries.

---

## Project structure

```
React-Assignment-Aforro/
├── public/                 # Static assets (favicon, map image referenced by charts, etc.)
├── src/
│   ├── components/
│   │   ├── ChartSection.jsx    # Visitor, revenue, satisfaction, target, map, volume charts
│   │   ├── Dashboard.jsx       # Composes header + widgets + users table
│   │   ├── Header.jsx          # Title, search, language, notifications, user menu
│   │   ├── Sidebar.jsx         # Brand + nav links + “Pro” promo card
│   │   ├── StatsCards.jsx      # “Today’s Sales” summary cards
│   │   └── UsersTable.jsx      # Part 2: API table + toolbar
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
└── eslint.config.js
```

---

## Design reference

Layout and visual hierarchy follow the [Figma Sales Dashboard (Community)](https://www.figma.com/design/4uElaIOstOmgCYqGHMdX7C/Sales-Dashboard-Design--Community-?node-id=7922-16) — not a pixel-perfect copy.

---

## API

All user rows come from:

`https://jsonplaceholder.typicode.com/users`

No API keys or `.env` file are required for this public endpoint.

---

## Static assets

The **Sales mapping** widget loads a map image from the app base URL, e.g. `public/world-map-custom.png` (referenced in `ChartSection.jsx`). Ensure any custom map file you use is placed under **`public/`** so Vite serves it at the site root.

---

## Assumptions & decisions

These choices were made to match the assignment scope and keep the codebase small and maintainable.

### Design & UI

- **Figma:** The [Sales Dashboard (Community)](https://www.figma.com/design/4uElaIOstOmgCYqGHMdX7C/Sales-Dashboard-Design--Community-?node-id=7922-16) file was used as a **reference** for layout, sections, and hierarchy—not a pixel-perfect recreation.
- **Charts:** Implemented as **SVG/CSS placeholders** (static or lightly scripted shapes). No charting library (e.g. Chart.js, Recharts) was added to avoid extra dependencies and scope creep.
- **Header:** Search, language switcher, notifications, and user block are **visual / presentational** only—they are not wired to search logic, i18n, or a backend.
- **Sidebar:** Links use **`href="#…"`** in-page anchors. There is **no client-side router** (no React Router); “pages” are not separate routes.

### Data & users table

- **API:** Only **`GET https://jsonplaceholder.typicode.com/users`** is used. No authentication, pagination API, or write operations.
- **City filter:** Options are built from **distinct `address.city` values** in the fetched payload. “All cities” clears the filter. City matching is **exact string equality** (as returned by the API).
- **Search:** Applies to **name and email** only, **case-insensitive**, substring match on the client after fetch.
- **Sort:** Name sorting uses **`localeCompare`** for A–Z / Z–A on the **currently filtered** list (search + city applied first, then sort).
- **Performance:** All filtering and sorting run **in memory** after a single fetch; changing filters does **not** call the API again.

### Technical

- **Stack:** **React 19 + Vite 8**, JavaScript (not TypeScript), and **global CSS** (`index.css`, `App.css`) instead of CSS-in-JS, Tailwind, or Bootstrap.
- **Data fetching:** **Native `fetch`** only (assignment allows Fetch or Axios; Axios was not added).
- **Map asset:** Sales map expects **`public/world-map-custom.png`** (or equivalent under `public/`) so `ChartSection` can load it via the Vite base URL.

### What was intentionally out of scope

- No automated tests (e.g. Vitest/RTL) in this repo.
- No CI/CD or deployment configuration beyond what Vite provides locally (`build` / `preview`).
- No environment variables file for the public JSONPlaceholder endpoint.

---

## License

Private / assignment use unless you add your own license.
